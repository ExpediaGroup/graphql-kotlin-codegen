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
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { CodegenConfig } from "../plugin";

export function buildEnumTypeDefinition(
  node: EnumTypeDefinitionNode,
  config: CodegenConfig,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const enumName = node.name.value;
  const enumValues =
    node.values?.map((valueNode) => {
      return buildEnumValueDefinition(valueNode, config);
    }) ?? [];

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  return `${annotations}enum class ${enumName}(val value: String) {
${indentMultiline(enumValues.join(",\n") + ";", 2)}

    companion object {
        fun findByName(name: String): ${enumName}? = values().find { it.name == name }
        fun findByValue(value: String): ${enumName}? = values().find { it.value == value }
    }
}`;
}

function buildEnumValueDefinition(
  node: EnumValueDefinitionNode,
  config: CodegenConfig,
) {
  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  return `${annotations}${config.convert(node)}("${node.name.value}")`;
}
