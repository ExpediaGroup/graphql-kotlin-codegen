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
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import {
  buildFieldDefinition,
  buildFunctionFieldDefinition,
} from "../helpers/build-field-definition";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";
import { shouldGenerateResolverClass } from "../helpers/should-generate-resolver-class";

export function buildInterfaceDefinition(
  node: InterfaceTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }
  const shouldGenerateFunctions = shouldGenerateResolverClass(node, config);

  const classMembers = node.fields
    ?.map((fieldNode) => {
      const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);

      const fieldDefinition =
        shouldGenerateFunctions && fieldNode.arguments?.length
          ? buildFunctionFieldDefinition(
              node,
              fieldNode,
              schema,
              config,
              typeMetadata,
            )
          : buildFieldDefinition(node, fieldNode, schema, config, typeMetadata);
      return fieldDefinition;
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
