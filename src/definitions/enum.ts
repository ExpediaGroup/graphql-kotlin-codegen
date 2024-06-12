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
import { buildAnnotations } from "../annotations/build-annotations";
import { shouldExcludeTypeDefinition } from "../config/should-exclude-type-definition";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { sanitizeFieldName } from "../utils/sanitize-field-name";

export function buildEnumTypeDefinition(
  node: EnumTypeDefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  if (shouldExcludeTypeDefinition(node, config)) {
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
  return `${annotations}enum class ${enumName} {
${indentMultiline(enumValues.join(",\n") + ";", 2)}

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): ${enumName}? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}`;
}

function buildEnumValueDefinition(
  node: EnumValueDefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  if (!config.convert) {
    throw new Error("Convert function was somehow not found in the config.");
  }
  const fieldName = sanitizeFieldName(config.convert(node));
  return `${annotations}${fieldName}`;
}
