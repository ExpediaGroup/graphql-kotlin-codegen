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
import { TypeMetadata } from "./build-type-metadata";

export function buildDirectiveAnnotations(
  incomingNode: DefinitionNode,
  config: CodegenConfig,
  description?: string,
  resolvedType?: TypeMetadata,
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
        const deprecatedReasonNode = directive.arguments?.find(
          (arg) => arg.name.value === "reason",
        )?.value;
        const deprecatedReason =
          deprecatedReasonNode?.kind === "StringValue"
            ? deprecatedReasonNode.value
            : "";
        if (incomingNode.description?.value && resolvedType?.unionAnnotation) {
          return "";
        }
        const descriptionAnnotator = resolvedType?.unionAnnotation
          ? "@GraphQLDescription"
          : "@Deprecated";
        return `${descriptionAnnotator}("${deprecatedReason}")\n`;
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
      const kotlinAnnotations =
        directiveReplacementFromConfig.kotlinAnnotations.map((item) => {
          if (typeof item === "string") return item;
          const directiveArguments = item.retainArguments
            ?.map((argumentToRetain) => {
              const argumentValueNode = directive.arguments?.find(
                (argument) => argument.name.value === argumentToRetain,
              )?.value;
              if (!argumentValueNode) throw new Error();
              if (!("value" in argumentValueNode)) throw new Error();
              const argumentValue =
                argumentValueNode.kind === "StringValue"
                  ? `"${argumentValueNode.value}"`
                  : argumentValueNode.value;
              return `${argumentToRetain}: ${argumentValue}`;
            })
            .join(", ");
          return `@${item.annotationName}(${directiveArguments})`;
        });
      return kotlinAnnotations.join("\n") + "\n";
    })
    .join("");
}
