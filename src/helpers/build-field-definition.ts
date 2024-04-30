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
import { isExternalField } from "./is-external-field";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildAnnotations } from "./build-annotations";

export function buildFieldDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
  typeMetadata: TypeMetadata,
) {
  const modifier = "val";
  const existingFieldArguments = fieldNode.arguments?.map((arg) => {
    const typeMetadata = buildTypeMetadata(arg.type, schema, config);
    return `${arg.name.value}: ${typeMetadata.typeName}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : "?"}`;
  });
  const extraFieldArguments = [] satisfies string[];
  const allFieldArguments = existingFieldArguments?.concat(extraFieldArguments);
  const fieldArguments = allFieldArguments?.length
    ? `(${allFieldArguments?.join(", ")})`
    : "";
  const fieldDefinition = `${modifier} ${fieldNode.name.value}${fieldArguments}`;
  const annotations = buildAnnotations({
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });
  if (node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    const fieldText = indent(
      `${fieldDefinition}: ${typeMetadata.typeName}${
        typeMetadata.isNullable ? "?" : ""
      }`,
      2,
    );
    return `${annotations}${fieldText}`;
  }
  // const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>`;
  const defaultValue = typeMetadata.defaultValue;
  const defaultDefinition = `${typeMetadata.typeName}${isExternalField(fieldNode) ? (typeMetadata.isNullable ? "?" : "") : defaultValue}`;
  const shouldOverrideField = node.interfaces?.some((interfaceNode) => {
    const typeNode = schema.getType(interfaceNode.name.value);
    return (
      isInterfaceType(typeNode) &&
      typeNode.astNode?.fields?.some(
        (field) => field.name.value === fieldNode.name.value,
      )
    );
  });
  const field = indent(
    `${shouldOverrideField ? "override " : ""}${fieldDefinition}: ${defaultDefinition}`,
    2,
  );
  return `${annotations}${field}`;
}

export function buildFunctionFieldDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
  typeMetadata: TypeMetadata,
  completableFuture?: boolean,
) {
  const shouldOverrideField =
    !completableFuture &&
    node.interfaces?.some((interfaceNode) => {
      const typeNode = schema.getType(interfaceNode.name.value);
      return (
        isInterfaceType(typeNode) &&
        typeNode.astNode?.fields?.some(
          (field) => field.name.value === fieldNode.name.value,
        )
      );
    });
  const modifier =
    completableFuture ||
    node.kind === Kind.INTERFACE_TYPE_DEFINITION ||
    shouldOverrideField
      ? "fun"
      : "open fun";
  const existingFieldArguments = fieldNode.arguments?.map((arg) => {
    const typeMetadata = buildTypeMetadata(arg.type, schema, config);
    return `${arg.name.value}: ${typeMetadata.typeName}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : "?"}`;
  });
  const dataFetchingEnvironmentArgument =
    "dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment";
  const extraFieldArguments = [dataFetchingEnvironmentArgument];
  const allFieldArguments = existingFieldArguments?.concat(extraFieldArguments);
  const fieldArguments = allFieldArguments?.length
    ? `(${allFieldArguments?.join(", ")})`
    : "()";
  const fieldDefinition = `${modifier} ${fieldNode.name.value}${fieldArguments}`;
  const annotations = buildAnnotations({
    config,
    definitionNode: fieldNode,
    typeMetadata,
  });
  if (node.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    const fieldText = indent(
      `${fieldDefinition}: ${typeMetadata.typeName}${
        typeMetadata.isNullable ? "?" : ""
      }`,
      2,
    );
    return `${annotations}${fieldText}`;
  }

  const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>`;
  const defaultValue = `${typeMetadata.isNullable ? "?" : ""} = throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`;
  const defaultDefinition = `${typeMetadata.typeName}${isExternalField(fieldNode) ? (typeMetadata.isNullable ? "?" : "") : defaultValue}`;
  const field = indent(
    `${shouldOverrideField ? "override " : ""}${fieldDefinition}: ${completableFuture ? completableFutureDefinition : defaultDefinition}`,
    2,
  );
  return `${annotations}${field}`;
}
