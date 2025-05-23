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

import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { DefinitionNode } from "./build-annotations";
import { ConstDirectiveNode } from "graphql/language";
import { GraphQLSchema, isInputObjectType, Kind } from "graphql";
import { shouldConsolidateTypes } from "../utils/should-consolidate-types";
import { sanitizeName } from "../utils/sanitize-name";
import { titleCase } from "../utils/title-case";

export function buildDirectiveAnnotations(
  definitionNode: DefinitionNode,
  config: CodegenConfigWithDefaults,
  schema: GraphQLSchema,
) {
  const name = sanitizeName(definitionNode.name.value);
  const potentialMatchingInputType = schema.getType(`${name}Input`);
  const typeWillBeConsolidated =
    isInputObjectType(potentialMatchingInputType) &&
    potentialMatchingInputType.astNode &&
    shouldConsolidateTypes(potentialMatchingInputType.astNode, schema, config);
  const directives = definitionNode.directives ?? [];
  return directives
    .map((directive) => {
      const directiveName = directive.name.value;
      const federationReplacement =
        getFederationDirectiveReplacement(directive);
      if (federationReplacement) return federationReplacement + "\n";

      const directiveReplacementFromConfig = config.directiveReplacements?.find(
        ({ directive, definitionType }) => {
          if (directive !== directiveName) return false;
          if (!definitionType) return true;
          if (definitionType !== definitionNode.kind) return false;
          if (
            definitionType !== Kind.INPUT_OBJECT_TYPE_DEFINITION &&
            definitionType !== Kind.OBJECT_TYPE_DEFINITION
          )
            return true;
          return !typeWillBeConsolidated;
        },
      );

      if (directiveReplacementFromConfig) {
        return (
          buildKotlinAnnotationsFromConfig(
            directive,
            directiveReplacementFromConfig.kotlinAnnotations,
          ).join("\n") + "\n"
        );
      }
      if (config.customDirectives) {
        return buildCustomDirectives(directive);
      }
      return "";
    })
    .join("");
}

function buildCustomDirectives(directive: ConstDirectiveNode) {
  const directiveName = directive.name.value;
  return `@${titleCase(directiveName)}\n`;
}

function buildDirectiveArguments(
  directive: ConstDirectiveNode,
  argumentsToRetain: string[],
) {
  return argumentsToRetain
    .map((argumentToRetain) => {
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
        argumentValueNode.kind === Kind.STRING
          ? `"${argumentValueNode.value}"`
          : argumentValueNode.value;
      return `${argumentToRetain} = ${argumentValue}`;
    })
    .join(", ");
}

function buildKotlinAnnotationsFromConfig(
  directive: ConstDirectiveNode,
  kotlinAnnotations: NonNullable<
    CodegenConfigWithDefaults["directiveReplacements"]
  >[number]["kotlinAnnotations"],
) {
  return kotlinAnnotations.map((kotlinAnnotation) => {
    if (typeof kotlinAnnotation === "string") return kotlinAnnotation;
    const directiveArguments = buildDirectiveArguments(
      directive,
      kotlinAnnotation.argumentsToRetain,
    );
    return `@${kotlinAnnotation.annotationName}(${directiveArguments})`;
  });
}

function getFederationDirectiveReplacement(directive: ConstDirectiveNode) {
  const federationDirectivePrefix =
    "com.expediagroup.graphql.generator.federation.directives.";
  switch (directive.name.value) {
    case FEDERATION_DIRECTIVES.key:
      if (
        directive.arguments?.[0] &&
        directive.arguments[0].value.kind === Kind.STRING
      ) {
        const fieldArg = directive.arguments[0]?.value.value;
        return `@${federationDirectivePrefix}KeyDirective(${federationDirectivePrefix}FieldSet("${fieldArg}"))`;
      }
      return undefined;
    case FEDERATION_DIRECTIVES.extends:
      return `@${federationDirectivePrefix}ExtendsDirective`;
    case FEDERATION_DIRECTIVES.external:
      return `@${federationDirectivePrefix}ExternalDirective`;
  }
}

export const FEDERATION_DIRECTIVES = {
  extends: "extends",
  external: "external",
  key: "key",
} as const;
