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

import { CodegenConfigWithDefaults } from "./build-config-with-defaults";
import { DefinitionNode } from "./build-annotations";
import { getFederationDirectiveReplacement } from "./get-federation-directive-replacement";
import { ConstDirectiveNode } from "graphql/language";

export function buildDirectiveAnnotations(
  definitionNode: DefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  const directives = definitionNode.directives ?? [];
  return directives
    .map((directive) => {
      const directiveName = directive.name.value;
      const federationReplacement =
        getFederationDirectiveReplacement(directive);
      if (federationReplacement) return federationReplacement + "\n";

      const directiveReplacementFromConfig = config.directiveReplacements?.find(
        ({ directive, definitionType }) =>
          directive === directiveName &&
          (!definitionType || definitionType === definitionNode.kind),
      );
      if (!directiveReplacementFromConfig) return "";
      const kotlinAnnotations = buildKotlinAnnotations(
        directive,
        directiveReplacementFromConfig.kotlinAnnotations,
      );
      return kotlinAnnotations.join("\n") + "\n";
    })
    .join("");
}

function buildKotlinAnnotations(
  directive: ConstDirectiveNode,
  kotlinAnnotations: NonNullable<
    CodegenConfigWithDefaults["directiveReplacements"]
  >[number]["kotlinAnnotations"],
) {
  return kotlinAnnotations.map((kotlinAnnotation) => {
    if (typeof kotlinAnnotation === "string") return kotlinAnnotation;
    const directiveArguments = kotlinAnnotation.argumentsToRetain
      ?.map((argumentToRetain) => {
        const argumentValueNode = directive.arguments?.find(
          (argument) => argument.name.value === argumentToRetain,
        )?.value;
        if (!argumentValueNode)
          throw new Error(
            `Argument ${argumentToRetain} was provided in argumentsToRetain config but was not found in directive ${directive.name.value}`,
          );
        if (!("value" in argumentValueNode))
          throw new Error(
            `Directive argument ${argumentToRetain} in directive ${directive.name.value} has an unsupported type. Only INT, FLOAT, STRING, BOOLEAN, and ENUM are supported.`,
          );
        const argumentValue =
          argumentValueNode.kind === "StringValue"
            ? `"${argumentValueNode.value}"`
            : argumentValueNode.value;
        return `${argumentToRetain} = ${argumentValue}`;
      })
      .join(", ");
    return `@${kotlinAnnotation.annotationName}(${directiveArguments})`;
  });
}
