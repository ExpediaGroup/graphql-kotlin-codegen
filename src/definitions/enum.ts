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

import { EnumTypeDefinitionNode, EnumValueDefinitionNode } from "graphql";
import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import { buildAnnotations } from "../helpers/build-annotations";
import { KotlinResolversVisitor } from "../visitor";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { GraphQLKotlinCodegenConfig } from "../plugin";

export function buildEnumTypeDefinition(
  node: EnumTypeDefinitionNode,
  config: GraphQLKotlinCodegenConfig,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const enumName = node.name.value;
  const enumValues = indentMultiline((node.values ?? []).join(",\n") + ";", 2);

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  return `${annotations}enum class ${enumName}(val label: String) {
${enumValues}

    companion object {
        @JvmStatic
        fun valueOfLabel(label: String): ${enumName}? {
            return values().find { it.label == label }
        }
    }
}`;
}

export function buildEnumValueDefinition(
  this: KotlinResolversVisitor,
  node: EnumValueDefinitionNode,
) {
  const annotations = buildAnnotations({
    config: this.config,
    definitionNode: node,
  });
  return `${annotations}${this.convertName(node, {
    useTypesPrefix: false,
    transformUnderscore: true,
  })}("${node.name.value}")`;
}
