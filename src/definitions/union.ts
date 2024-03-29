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

import { UnionTypeDefinitionNode } from "graphql";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { buildDirectiveAnnotations } from "../helpers/build-directive-annotations";
import { CodegenConfig } from "../plugin";

export function buildUnionTypeDefinition(
  node: UnionTypeDefinitionNode,
  config: CodegenConfig,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const directiveAnnotations = buildDirectiveAnnotations(node, config);
  const possibleTypes =
    node.types?.map((type) => `${type.name.value}::class`).join(", ") || "";
  return `${directiveAnnotations}@GraphQLUnion(
    name = "${node.name.value}",
    possibleTypes = [${possibleTypes}],
    description = "${node.description?.value ?? ""}"
)
annotation class ${node.name.value}`;
}
