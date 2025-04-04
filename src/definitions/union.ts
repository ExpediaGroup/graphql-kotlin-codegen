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

import { GraphQLSchema, UnionTypeDefinitionNode } from "graphql";
import { shouldIncludeTypeDefinition } from "../config/should-include-type-definition";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import {
  buildAnnotations,
  trimDescription,
} from "../annotations/build-annotations";
import { sanitizeName } from "../utils/sanitize-name";

export function buildUnionTypeDefinition(
  node: UnionTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node.name.value, config)) {
    return "";
  }
  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: node,
  });
  if (config.unionGeneration === "MARKER_INTERFACE") {
    return `${annotations}interface ${sanitizeName(node.name.value)}`;
  }

  const possibleTypes =
    node.types
      ?.map((type) => `${sanitizeName(type.name.value)}::class`)
      .join(", ") || "";
  return `${annotations}@GraphQLUnion(
    name = "${node.name.value}",
    possibleTypes = [${possibleTypes}],
    description = "${trimDescription(node.description?.value)}"
)
annotation class ${sanitizeName(node.name.value)}`;
}
