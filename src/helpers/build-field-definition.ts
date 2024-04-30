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

export function buildFieldDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
  typeMetadata: TypeMetadata,
  shouldUseFunction?: boolean,
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

  const defaultFunctionValue = `${typeMetadata.isNullable ? "?" : ""} = throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`;
  const defaultValue = shouldUseFunction
    ? defaultFunctionValue
    : typeMetadata.defaultValue;
  const defaultDefinition = `${typeMetadata.typeName}${defaultValue}`;
  const completableFuture = false;
  const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>`;
  const field = indent(
    `${fieldDefinition}: ${completableFuture ? completableFutureDefinition : defaultDefinition}`,
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
  const resolverClassesContainsType = config.resolverClasses?.includes(
    node.name.value,
  );
  const completableFuture = false;
  const shouldOverrideField =
    !completableFuture &&
    shouldModifyFieldWithOverride(node, fieldNode, schema);
  if (!resolverClassesContainsType && !fieldNode.arguments?.length) {
    return shouldOverrideField ? "override val" : "val";
  }
  if (completableFuture || node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    return "fun";
  }
  if (shouldOverrideField) {
    return "override fun";
  }
  return "open fun";
}

function buildFieldArguments(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  const resolverClassesContainsType = config.resolverClasses?.includes(
    node.name.value,
  );
  if (!resolverClassesContainsType && !fieldNode.arguments?.length) {
    return "";
  }
  const existingFieldArguments = fieldNode.arguments?.map((arg) => {
    const argMetadata = buildTypeMetadata(arg.type, schema, config);
    return `${arg.name.value}: ${argMetadata.typeName}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : "?"}`;
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
