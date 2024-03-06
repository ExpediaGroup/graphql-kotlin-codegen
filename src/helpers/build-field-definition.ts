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

import { buildListType } from "./build-type-metadata";
import { getFieldTypeName } from "./dependent-type-utils";
import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
} from "graphql";
import { isResolverType } from "./is-resolver-type";
import { isExternalField } from "./is-external-field";
import { GraphQLKotlinCodegenConfig } from "../plugin";

export function buildFieldDefinition(
  fieldNode: FieldDefinitionNode,
  definitionNode: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  config: GraphQLKotlinCodegenConfig,
  completableFuture?: boolean,
) {
  const shouldUseFunction =
    isResolverType(definitionNode, config) && !isExternalField(fieldNode);
  const modifier = shouldUseFunction
    ? completableFuture
      ? "fun"
      : "suspend fun"
    : "val";
  const existingFieldArguments = fieldNode.arguments?.map(
    (arg) =>
      `${arg.name.value}: ${buildListType(arg.type, getFieldTypeName(arg.type))}${arg.type.kind === Kind.NON_NULL_TYPE ? "" : "?"}`,
  );
  const additionalFieldArguments = config.extraResolverArguments
    ?.map(({ typeNames, argumentType, argumentName }) => {
      const shouldIncludeArg =
        !typeNames ||
        typeNames.some((typeName) => typeName === definitionNode.name.value);
      return shouldIncludeArg ? `${argumentName}: ${argumentType}` : undefined;
    })
    .filter(Boolean);
  const allFieldArguments = existingFieldArguments?.concat(
    additionalFieldArguments ?? [],
  );
  const fieldArguments = allFieldArguments?.length
    ? `(${allFieldArguments?.join(", ")})`
    : shouldUseFunction
      ? "()"
      : "";
  return `${modifier} ${fieldNode.name.value}${fieldArguments}`;
}
