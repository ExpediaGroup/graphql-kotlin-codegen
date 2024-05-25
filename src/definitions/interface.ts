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
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { shouldExcludeTypeDefinition } from "../helpers/should-exclude-type-definition";
import { buildFieldDefinition } from "../helpers/build-field-definition";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";
import { getDependentInterfaceNames } from "../helpers/dependent-type-utils";

export function buildInterfaceDefinition(
  node: InterfaceTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (shouldExcludeTypeDefinition(node, config)) {
    return "";
  }

  const classMembers = node.fields
    ?.map((fieldNode) => {
      const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
      return buildFieldDefinition(
        node,
        fieldNode,
        schema,
        config,
        typeMetadata,
        Boolean(fieldNode.arguments?.length),
      );
    })
    .join("\n");

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });

  const interfacesToInherit = getDependentInterfaceNames(node);
  const interfaceInheritance = `${interfacesToInherit.length ? ` : ${interfacesToInherit.join(", ")}` : ""}`;

  return `${annotations}interface ${node.name.value}${interfaceInheritance} {
${classMembers}
}`;
}
