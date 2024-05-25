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

import { buildTypeMetadata } from "../utils/build-type-metadata";
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

export function buildObjectFieldDefinition({
  node,
  fieldNode,
  schema,
  config,
  isConstructorField,
}: {
  node: ObjectTypeDefinitionNode;
  fieldNode: FieldDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  isConstructorField?: boolean;
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
    isConstructorField,
  );
  const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
  const annotations = buildAnnotations({
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });

  const notImplementedError = `throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`;
  const atLeastOneFieldHasNoArguments = node.fields?.some(
    (fieldNode) => !fieldNode.arguments?.length,
  );
  const defaultImplementation =
    !typeInResolverInterfacesConfig && atLeastOneFieldHasNoArguments
      ? fieldNode.name.value
      : notImplementedError;
  const defaultFunctionValue = `${typeMetadata.isNullable ? "?" : ""} = ${defaultImplementation}`;
  const shouldGenerateFunctions = Boolean(
    typeInResolverInterfacesConfig ||
      node.fields?.some((fieldNode) => fieldNode.arguments?.length),
  );
  const defaultValue =
    shouldGenerateFunctions && !isConstructorField
      ? defaultFunctionValue
      : typeMetadata.defaultValue;
  const defaultDefinition = `${typeMetadata.typeName}${defaultValue}`;

  const isCompletableFuture =
    typeInResolverInterfacesConfig?.classMethods === "COMPLETABLE_FUTURE";
  const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}> = ${defaultImplementation}`;
  const field = indent(
    `${functionDefinition}: ${isCompletableFuture ? completableFutureDefinition : defaultDefinition}`,
    2,
  );
  const fieldIndex = node.fields?.findIndex(
    (field) => field.name.value === fieldNode.name.value,
  );
  const isLastFieldInType =
    node.fields && fieldIndex === node.fields.length - 1;
  return `${annotations}${field}${shouldGenerateFunctions || isLastFieldInType ? "" : ","}`;
}

function buildFunctionDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  config: CodegenConfigWithDefaults,
  isConstructorField?: boolean,
) {
  const modifier = buildFieldModifier(
    node,
    fieldNode,
    schema,
    typeInResolverInterfacesConfig,
    isConstructorField,
  );
  const fieldArguments = isConstructorField
    ? ""
    : buildFieldArguments(
        node,
        fieldNode,
        schema,
        typeInResolverInterfacesConfig,
        config,
      );
  return `${modifier} ${fieldNode.name.value}${fieldArguments}`;
}

function buildFieldModifier(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  isConstructorField?: boolean,
) {
  const shouldOverrideField = shouldModifyFieldWithOverride(
    node,
    fieldNode,
    schema,
  );

  if (isConstructorField && fieldNode.arguments?.length) {
    return "private val";
  }
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
    return `${arg.name.value}: ${argMetadata.typeName}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : nullableSuffix}`;
  });
  const dataFetchingEnvironmentArgument =
    "dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment";
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

export function buildInterfaceFieldDefinition({
  node,
  fieldNode,
  schema,
  config,
  isConstructorField,
}: {
  node: InterfaceTypeDefinitionNode;
  fieldNode: FieldDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  isConstructorField?: boolean;
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
    isConstructorField,
  );
  const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
  const fieldText = indent(
    `${functionDefinition}: ${typeMetadata.typeName}${
      typeMetadata.isNullable ? "?" : ""
    }`,
    2,
  );
  const annotations = buildAnnotations({
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });
  return `${annotations}${fieldText}`;
}
