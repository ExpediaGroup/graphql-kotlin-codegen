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
  GraphQLUnionType,
  Kind,
  TypeDefinitionNode,
  TypeNode,
} from "graphql";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";
import { getBaseTypeNode } from "@graphql-codegen/visitor-plugin-common";

export function getDependentFieldTypeNames(
  node: TypeDefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  return "fields" in node && node.fields
    ? node.fields
        .map((field) => getFieldTypeName(field.type))
        .filter(
          (typeName) =>
            !config.dependentTypesInScope ||
            config.dependentTypesInScope.includes(typeName),
        )
    : [];
}

function getFieldTypeName(fieldType: TypeNode) {
  return getBaseTypeNode(fieldType).name.value;
}

export function getDependentInterfaceNames(node: TypeDefinitionNode) {
  return node.kind === Kind.OBJECT_TYPE_DEFINITION
    ? node.interfaces?.map((i) => i.name.value) ?? []
    : [];
}

export function getDependentUnionNames(node: TypeDefinitionNode) {
  return node.kind === Kind.UNION_TYPE_DEFINITION
    ? node.types?.map((type) => type.name.value) ?? []
    : [];
}

export function getDependentUnionsForType(
  schema: GraphQLSchema,
  node: TypeDefinitionNode,
) {
  const typeMap = schema.getTypeMap();
  const unions = Object.keys(typeMap)
    .filter(
      (type) => typeMap[type]?.astNode?.kind === Kind.UNION_TYPE_DEFINITION,
    )
    .map((type) => typeMap[type] as GraphQLUnionType);
  return unions
    .filter((union) =>
      union.getTypes().some((type) => type.name === node.name.value),
    )
    .map((union) => union.name);
}
