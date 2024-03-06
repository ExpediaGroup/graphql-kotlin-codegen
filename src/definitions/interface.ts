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

import { GraphQLSchema, InterfaceTypeDefinitionNode } from "graphql";
import { buildAnnotations } from "../helpers/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { buildFieldDefinition } from "../helpers/build-field-definition";
import { GraphQLKotlinCodegenConfig } from "../plugin";

export function buildInterfaceDefinition(
  node: InterfaceTypeDefinitionNode,
  schema: GraphQLSchema,
  config: GraphQLKotlinCodegenConfig,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const classMembers = node.fields
    ?.map((fieldNode) => {
      const typeToUse = buildTypeMetadata(fieldNode.type, schema, config);

      const annotations = buildAnnotations({
        config,
        definitionNode: fieldNode,
      });
      const fieldDefinition = buildFieldDefinition(fieldNode, node, config);
      const fieldText = indent(
        `${fieldDefinition}: ${typeToUse.typeName}${
          typeToUse.isNullable ? "?" : ""
        }`,
        2,
      );
      return `${annotations}${fieldText}`;
    })
    .join("\n");

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  return `${annotations}interface ${node.name.value} {
${classMembers}
}`;
}
