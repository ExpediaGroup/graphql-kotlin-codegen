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
import { GraphQLSchema, TypeDefinitionNode } from "graphql";
import {
  getDependentFieldTypeNames,
  getDependentInterfaceNames,
  getDependentUnionNames,
} from "../utils/dependent-type-utils";

export function addDependentTypesToOnlyTypes(
  config: CodegenConfigWithDefaults,
  schema: GraphQLSchema,
) {
  if (!config.onlyTypes) {
    throw new Error(`onlyTypes config is required to add dependent types`);
  }
  const onlyTypesNodes = config.onlyTypes
    .map((typeName) => schema.getType(typeName)?.astNode)
    .filter(Boolean);
  const dependentTypeNames = onlyTypesNodes.flatMap((node) =>
    getDependentTypeNames(schema, node, config),
  );
  const typesInScope = config.dependentTypesInScope;
  const dependentTypesInScope = typesInScope
    ? dependentTypeNames.filter((typeName) => typesInScope.includes(typeName))
    : dependentTypeNames;
  config.onlyTypes.push(...dependentTypesInScope);
}

function getDependentTypeNames(
  schema: GraphQLSchema,
  node: TypeDefinitionNode,
  config: CodegenConfigWithDefaults,
): string[] {
  const namedTypes = getDependentFieldTypeNames(node, config)
    .concat(getDependentUnionNames(node))
    .concat(getDependentInterfaceNames(node, config));
  const recursivelyFoundTypes = namedTypes
    .map((typeName) => schema.getType(typeName)?.astNode)
    .filter(Boolean)
    .flatMap((node) => getDependentTypeNames(schema, node, config));
  return namedTypes.concat(recursivelyFoundTypes);
}
