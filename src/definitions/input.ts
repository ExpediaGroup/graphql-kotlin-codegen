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

import {
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  Kind,
  TypeNode,
} from "graphql";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { buildAnnotations } from "../helpers/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";

export function buildInputObjectDefinition(
  node: InputObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const typeNameWithoutInput = getTypeNameWithoutInput(node.name.value);
  const matchingType = schema.getType(typeNameWithoutInput)?.astNode;
  const matchingTypeFields =
    matchingType?.kind === Kind.OBJECT_TYPE_DEFINITION
      ? matchingType.fields
      : [];
  const inputFields = node.fields;
  const fieldsMatch = matchingTypeFields?.every((field) => {
    const matchingInputField = inputFields?.find(
      (inputField) => inputField.name.value === field.name.value,
    );
    if (!matchingInputField) return false;
    return fieldsAreEquivalent(field.type, matchingInputField.type);
  });
  if (matchingTypeFields?.length && fieldsMatch) {
    return "";
  }

  const classMembers = (node.fields ?? [])
    .map((arg) => {
      const typeToUse = buildTypeMetadata(arg.type, schema, config);
      const initial = typeToUse.isNullable ? " = null" : "";

      const annotations = buildAnnotations({
        config,
        definitionNode: arg,
      });
      return `${annotations}${indent(
        `val ${arg.name.value}: ${typeToUse.typeName}${
          typeToUse.isNullable ? "?" : ""
        }${initial}`,
        2,
      )}`;
    })
    .join(",\n");

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });

  return `${annotations}data class ${node.name.value}(
${classMembers}
)`;
}

function getTypeNameWithoutInput(name: string) {
  return name.endsWith("Input") ? name.replace("Input", "") : name;
}

function fieldsAreEquivalent(
  typeField: TypeNode,
  inputField: TypeNode,
): boolean {
  switch (typeField.kind) {
    case Kind.NAMED_TYPE:
      return (
        inputField.kind === Kind.NAMED_TYPE &&
        typeField.name.value === getTypeNameWithoutInput(inputField.name.value)
      );
    case Kind.LIST_TYPE:
      return (
        inputField.kind === Kind.LIST_TYPE &&
        fieldsAreEquivalent(typeField.type, inputField.type)
      );
    case Kind.NON_NULL_TYPE:
      return (
        inputField.kind === Kind.NON_NULL_TYPE &&
        fieldsAreEquivalent(typeField.type, inputField.type)
      );
  }
}
