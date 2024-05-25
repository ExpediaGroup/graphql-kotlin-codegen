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

import { GraphQLSchema, InputObjectTypeDefinitionNode } from "graphql";
import { shouldExcludeTypeDefinition } from "../helpers/should-exclude-type-definition";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { buildAnnotations } from "../helpers/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";
import { inputTypeHasMatchingOutputType } from "../helpers/input-type-has-matching-output-type";

export function buildInputObjectDefinition(
  node: InputObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (shouldExcludeTypeDefinition(node, config)) {
    return "";
  }

  const typeWillBeConsolidated = inputTypeHasMatchingOutputType(node, schema);
  if (typeWillBeConsolidated) {
    return "";
  }

  const classMembers = (node.fields ?? [])
    .map((arg) => {
      const typeToUse = buildTypeMetadata(arg.type, schema, config);
      const initial = typeToUse.isNullable ? " = null" : "";

      const annotations = buildAnnotations({
        config,
        definitionNode: arg,
      });
      return `${annotations}${indent(
        `val ${arg.name.value}: ${typeToUse.typeName}${
          typeToUse.isNullable ? "?" : ""
        }${initial}`,
        2,
      )}`;
    })
    .join(",\n");

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });

  const inputRestrictionAnnotation =
    "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])\n";
  return `${annotations}${inputRestrictionAnnotation}data class ${node.name.value}(
${classMembers}
)`;
}
