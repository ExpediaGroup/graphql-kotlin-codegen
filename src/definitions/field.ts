/*
Copyright 2024 Expedia, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { buildTypeMetadata, TypeMetadata } from "../utils/build-type-metadata";
import {
  FieldDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  isInterfaceType,
} from "graphql";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildAnnotations } from "../annotations/build-annotations";
import { findTypeInResolverInterfacesConfig } from "../config/find-type-in-resolver-interfaces-config";
import { shouldGenerateFunctionsInClass } from "./object";
import { sanitizeName } from "../utils/sanitize-name";

export function buildObjectFieldDefinition({
  node,
  fieldNode,
  schema,
  config,
}: {
  node: ObjectTypeDefinitionNode;
  fieldNode: FieldDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
}) {
  const typeInResolverInterfacesConfig = findTypeInResolverInterfacesConfig(
    node,
    config,
  );
  const functionDefinition = buildFunctionDefinition(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
    config,
  );
  const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
  const defaultImplementation = getDefaultImplementation(
    node,
    fieldNode,
    typeInResolverInterfacesConfig,
  );
  const defaultFunctionValue = `${typeMetadata.isNullable ? "?" : ""} = ${defaultImplementation}`;
  const shouldGenerateFunctions = shouldGenerateFunctionsInClass(
    node,
    typeInResolverInterfacesConfig,
  );
  const defaultValue = shouldGenerateFunctions
    ? defaultFunctionValue
    : typeMetadata.defaultValue;
  const field = buildField(
    node,
    fieldNode,
    functionDefinition,
    defaultValue,
    typeInResolverInterfacesConfig,
    typeMetadata,
  );
  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: fieldNode,
    typeMetadata,
    isDataClassParameter: !shouldGenerateFunctions,
  });
  return `${annotations}${field}${shouldGenerateFunctions || isLastFieldInType(node, fieldNode) ? "" : ","}`;
}

export function buildConstructorFieldDefinition({
  node,
  fieldNode,
  schema,
  config,
}: {
  node: ObjectTypeDefinitionNode;
  fieldNode: FieldDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
}) {
  const typeInResolverInterfacesConfig = findTypeInResolverInterfacesConfig(
    node,
    config,
  );
  const functionDefinition = buildConstructorFunctionDefinition(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
  );
  const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
  const defaultDefinitionValue = typeMetadata.defaultValue;

  const field = buildField(
    node,
    fieldNode,
    functionDefinition,
    defaultDefinitionValue,
    typeInResolverInterfacesConfig,
    typeMetadata,
  );
  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: fieldNode,
    typeMetadata,
    isDataClassParameter: true, // Constructor parameters (both data class and regular class) need @param:
  });
  const shouldGenerateFunctions = shouldGenerateFunctionsInClass(
    node,
    typeInResolverInterfacesConfig,
  );
  return `${annotations}${field}${shouldGenerateFunctions || isLastFieldInType(node, fieldNode) ? "" : ","}`;
}

export function buildInterfaceFieldDefinition({
  node,
  fieldNode,
  schema,
  config,
}: {
  node: InterfaceTypeDefinitionNode;
  fieldNode: FieldDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
}) {
  const typeInResolverInterfacesConfig = findTypeInResolverInterfacesConfig(
    node,
    config,
  );
  const functionDefinition = buildFunctionDefinition(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
    config,
  );
  const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
  const defaultDefinitionValue = typeMetadata.isNullable ? "?" : "";
  const field = buildField(
    node,
    fieldNode,
    functionDefinition,
    defaultDefinitionValue,
    typeInResolverInterfacesConfig,
    typeMetadata,
  );
  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });
  return `${annotations}${field}`;
}

function buildField(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  functionDefinition: string,
  defaultDefinitionValue: string,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  typeMetadata: TypeMetadata,
) {
  const defaultImplementation = getDefaultImplementation(
    node,
    fieldNode,
    typeInResolverInterfacesConfig,
  );
  const isCompletableFuture =
    typeInResolverInterfacesConfig?.classMethods === "COMPLETABLE_FUTURE";
  let typeDefinition = `${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}`;
  let defaultDefinition = `${typeMetadata.typeName}${defaultDefinitionValue}`;
  if (typeInResolverInterfacesConfig?.dataFetcherResult) {
    typeDefinition = `graphql.execution.DataFetcherResult<${typeDefinition}>`;
    defaultDefinition = `${typeDefinition} = ${defaultImplementation}`;
  }
  const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeDefinition}> = ${defaultImplementation}`;
  return indent(
    `${functionDefinition}: ${isCompletableFuture ? completableFutureDefinition : defaultDefinition}`,
    2,
  );
}

function buildFunctionDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  config: CodegenConfigWithDefaults,
) {
  const modifier = buildFieldModifier(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
  );
  const fieldArguments = buildFieldArguments(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
    config,
  );
  return `${modifier} ${sanitizeName(fieldNode.name.value)}${fieldArguments}`;
}

function buildConstructorFunctionDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
) {
  const modifier = fieldNode.arguments?.length
    ? "private val"
    : buildFieldModifier(
        node,
        fieldNode,
        schema,
        typeInResolverInterfacesConfig,
      );
  const fieldArguments = "";
  return `${modifier} ${sanitizeName(fieldNode.name.value)}${fieldArguments}`;
}

function buildFieldModifier(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
) {
  const shouldOverrideField = shouldModifyFieldWithOverride(
    node,
    fieldNode,
    schema,
  );

  if (!typeInResolverInterfacesConfig && !fieldNode.arguments?.length) {
    return shouldOverrideField ? "override val" : "val";
  }
  const functionModifier =
    typeInResolverInterfacesConfig?.classMethods === "SUSPEND"
      ? "suspend "
      : "";
  if (node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    return `${functionModifier}fun`;
  }
  const isCompletableFuture =
    typeInResolverInterfacesConfig?.classMethods === "COMPLETABLE_FUTURE";
  if (shouldOverrideField && !isCompletableFuture) {
    return "override fun";
  }
  return `open ${functionModifier}fun`;
}

function buildFieldArguments(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  config: CodegenConfigWithDefaults,
) {
  if (!typeInResolverInterfacesConfig && !fieldNode.arguments?.length) {
    return "";
  }
  const isOverrideFunction = shouldModifyFieldWithOverride(
    node,
    fieldNode,
    schema,
  );
  const nullableSuffix = isOverrideFunction ? "?" : "? = null";
  const existingFieldArguments = fieldNode.arguments?.map((arg) => {
    const argMetadata = buildTypeMetadata(arg.type, schema, config);
    return `${sanitizeName(arg.name.value)}: ${argMetadata.typeName}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : nullableSuffix}`;
  });
  const dataFetchingEnvironmentArgument = `dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment${typeInResolverInterfacesConfig?.nullableDataFetchingEnvironment ? "? = null" : ""}`;
  const extraFieldArguments = [dataFetchingEnvironmentArgument];
  const allFieldArguments = existingFieldArguments?.concat(extraFieldArguments);
  return allFieldArguments?.length
    ? `(${allFieldArguments?.join(", ")})`
    : "()";
}

function shouldModifyFieldWithOverride(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
) {
  return node.interfaces?.some((interfaceNode) => {
    const typeNode = schema.getType(interfaceNode.name.value);
    return (
      isInterfaceType(typeNode) &&
      typeNode.astNode?.fields?.some(
        (field) => field.name.value === fieldNode.name.value,
      )
    );
  });
}

function getDefaultImplementation(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
) {
  const notImplementedError = `throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`;
  const atLeastOneFieldHasNoArguments = node.fields?.some(
    (fieldNode) => !fieldNode.arguments?.length,
  );
  return !typeInResolverInterfacesConfig && atLeastOneFieldHasNoArguments
    ? sanitizeName(fieldNode.name.value)
    : notImplementedError;
}

function isLastFieldInType(
  node: ObjectTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
) {
  const fieldIndex = node.fields?.findIndex(
    (field) => field.name.value === fieldNode.name.value,
  );
  return node.fields && fieldIndex === node.fields.length - 1;
}
