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

import { DirectiveDefinitionNode } from "graphql";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { titleCase } from "../utils/title-case";

export function buildDirectiveDefinition(
  node: DirectiveDefinitionNode,
  config: CodegenConfigWithDefaults,
): string {
  const directiveName = node.name.value;
  const isCustomDirective = config.customDirectives?.includes(directiveName);
  if (!isCustomDirective) {
    return "";
  }
  return `@GraphQLDirective(
    name = "${titleCase(directiveName)}",
    description = "${node.description?.value ?? ""}",
    locations = [${node.locations.map((location) => `graphql.introspection.Introspection.DirectiveLocation.${location.value}`).join(", ")}]
)
annotation class ${titleCase(directiveName)}`;
}
