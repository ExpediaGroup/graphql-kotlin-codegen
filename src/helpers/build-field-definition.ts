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

import { buildTypeMetadata } from "./build-type-metadata";
import {
  FieldDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
} from "graphql";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";

export function buildFieldDefinition(
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
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
  return `${modifier} ${fieldNode.name.value}${fieldArguments}`;
}

export function buildFunctionFieldDefinition(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  fieldNode: FieldDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
  completableFuture?: boolean,
  shouldOverrideField?: boolean,
) {
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
  return `${modifier} ${fieldNode.name.value}${fieldArguments}`;
}
