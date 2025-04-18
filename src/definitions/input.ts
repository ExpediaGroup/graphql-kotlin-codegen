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
import { shouldIncludeTypeDefinition } from "../config/should-include-type-definition";
import { buildTypeMetadata } from "../utils/build-type-metadata";
import { buildAnnotations } from "../annotations/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { shouldConsolidateTypes } from "../utils/should-consolidate-types";
import { sanitizeName } from "../utils/sanitize-name";

export function buildInputObjectDefinition(
  node: InputObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node.name.value, config)) {
    return "";
  }

  const typeWillBeConsolidated = shouldConsolidateTypes(node, schema, config);
  if (typeWillBeConsolidated) {
    return "";
  }

  const classMembers = (node.fields ?? [])
    .map((field) => {
      const typeToUse = buildTypeMetadata(field.type, schema, config);
      const initial = typeToUse.isNullable ? " = null" : "";

      const annotations = buildAnnotations({
        schema,
        config,
        definitionNode: field,
      });
      return `${annotations}${indent(
        `val ${sanitizeName(field.name.value)}: ${typeToUse.typeName}${
          typeToUse.isNullable ? "?" : ""
        }${initial}`,
        2,
      )}`;
    })
    .join(",\n");

  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: node,
  });

  const inputRestrictionAnnotation =
    "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])\n";
  return `${annotations}${inputRestrictionAnnotation}data class ${sanitizeName(node.name.value)}(
${classMembers}
)`;
}
