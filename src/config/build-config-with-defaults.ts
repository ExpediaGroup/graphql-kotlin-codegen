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

import { GraphQLKotlinCodegenConfig } from "../plugin";
import { buildPackageNameFromPath } from "@graphql-codegen/java-common";
import { dirname, normalize } from "path";
import { merge } from "ts-deepmerge";

export function buildConfigWithDefaults(
  config: GraphQLKotlinCodegenConfig,
  outputFile: string,
) {
  const defaultConfig = {
    packageName: buildPackageNameFromPath(dirname(normalize(outputFile))),
    includeDependentTypes: true,
    unionGeneration: "MARKER_INTERFACE",
    extraImports: ["com.expediagroup.graphql.generator.annotations.*"],
    resolverInterfaces: [{ typeName: "Query" }, { typeName: "Mutation" }],
    classConsolidationEnabled: true,
  } as const satisfies GraphQLKotlinCodegenConfig;

  return merge(defaultConfig, config) as GraphQLKotlinCodegenConfig &
    typeof defaultConfig;
}

export type CodegenConfigWithDefaults = ReturnType<
  typeof buildConfigWithDefaults
>;
