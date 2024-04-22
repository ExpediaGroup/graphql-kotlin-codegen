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

import { CodegenConfigWithDefaults } from "../config";
import { getDependentTypeNames } from "./get-dependent-type-names";
import { dependentTypeIsInScope } from "./dependent-type-is-in-scope";
import { GraphQLSchema } from "graphql";

export function addDependentTypes(
  config: CodegenConfigWithDefaults,
  schema: GraphQLSchema,
) {
  if (!config.onlyTypes) {
    throw new Error(`config.onlyTypes is required to add dependent types`);
  }
  const onlyTypesNodes = config.onlyTypes
    .map((typeName) => schema.getType(typeName)?.astNode)
    .filter(Boolean);
  const dependentTypeNames = onlyTypesNodes.flatMap((node) =>
    getDependentTypeNames(schema, node, config),
  );
  const dependentTypesInScope = dependentTypeNames.filter((typeName) =>
    dependentTypeIsInScope(typeName, config),
  );
  config.onlyTypes.push(...dependentTypesInScope);
}
