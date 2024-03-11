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

import { CodegenConfig } from "../plugin";
import { DefinitionNode, isDeprecatedDescription } from "./build-annotations";
import { getFederationDirectiveReplacement } from "./get-federation-directive-replacement";

export function buildDirectiveAnnotations(
  incomingNode: DefinitionNode,
  config: CodegenConfig,
  description?: string,
) {
  const kind = incomingNode.kind;
  const directives = incomingNode.directives ?? [];

  return directives
    .map((directive) => {
      const directiveName = directive.name.value;
      if (
        directiveName === "deprecated" &&
        !isDeprecatedDescription(description)
      ) {
        const deprecatedReason = directive.arguments?.find(
          (arg) => arg.name.value === "reason",
        )?.value;
        return `@Deprecated("${
          deprecatedReason?.kind === "StringValue" ? deprecatedReason.value : ""
        }")\n`;
      }
      const federationReplacement =
        getFederationDirectiveReplacement(directive);
      if (federationReplacement) return federationReplacement + "\n";

      const directiveReplacementFromConfig = config.directiveReplacements?.find(
        ({ directive, definitionType }) =>
          directive === directiveName &&
          (!definitionType || definitionType === kind),
      );
      if (!directiveReplacementFromConfig) return "";
      return directiveReplacementFromConfig.kotlinAnnotations.join("\n") + "\n";
    })
    .join("");
}
