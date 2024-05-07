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

import { buildTypeMetadata, TypeMetadata } from "./build-type-metadata";
import {
  FieldDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  isInterfaceType,
} from "graphql";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildAnnotations } from "./build-annotations";
import { findTypeInResolverClassesConfig } from "./findTypeInResolverClassesConfig";

export function buildFieldDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
  typeMetadata: TypeMetadata,
  shouldGenerateFunctions?: boolean,
) {
  const modifier = buildFieldModifier(node, fieldNode, schema, config);
  const fieldArguments = buildFieldArguments(node, fieldNode, schema, config);
  const fieldDefinition = `${modifier} ${fieldNode.name.value}${fieldArguments}`;
  const annotations = buildAnnotations({
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });
  if (node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    return buildInterfaceFieldDefinition(
      fieldDefinition,
      typeMetadata,
      annotations,
    );
  }

  const notImplementedError = ` = throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`;
  const defaultFunctionValue = `${typeMetadata.isNullable ? "?" : ""}${notImplementedError}`;
  const defaultValue = shouldGenerateFunctions
    ? defaultFunctionValue
    : typeMetadata.defaultValue;
  const defaultDefinition = `${typeMetadata.typeName}${defaultValue}`;
  const typeInResolverClassesConfig = findTypeInResolverClassesConfig(
    node,
    config,
  );
  const isCompletableFuture =
    typeInResolverClassesConfig?.classMethods === "COMPLETABLE_FUTURE";
  const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>${notImplementedError}`;
  const field = indent(
    `${fieldDefinition}: ${isCompletableFuture ? completableFutureDefinition : defaultDefinition}`,
    2,
  );
  return `${annotations}${field}`;
}

function buildFieldModifier(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  const typeInResolverClassesConfig = findTypeInResolverClassesConfig(
    node,
    config,
  );
  const shouldOverrideField = shouldModifyFieldWithOverride(
    node,
    fieldNode,
    schema,
  );
  if (!typeInResolverClassesConfig && !fieldNode.arguments?.length) {
    return shouldOverrideField ? "override val" : "val";
  }
  const functionModifier =
    typeInResolverClassesConfig?.classMethods === "SUSPEND" ? "suspend " : "";
  if (node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    return `${functionModifier}fun`;
  }
  const isCompletableFuture =
    typeInResolverClassesConfig?.classMethods === "COMPLETABLE_FUTURE";
  if (shouldOverrideField && !isCompletableFuture) {
    return "override fun";
  }
  return `open ${functionModifier}fun`;
}

function buildFieldArguments(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  const typeIsInResolverClasses = findTypeInResolverClassesConfig(node, config);
  if (!typeIsInResolverClasses && !fieldNode.arguments?.length) {
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

function buildInterfaceFieldDefinition(
  fieldDefinition: string,
  typeMetadata: TypeMetadata,
  annotations: string,
) {
  const fieldText = indent(
    `${fieldDefinition}: ${typeMetadata.typeName}${
      typeMetadata.isNullable ? "?" : ""
    }`,
    2,
  );
  return `${annotations}${fieldText}`;
}
