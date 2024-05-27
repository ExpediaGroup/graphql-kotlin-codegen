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
  } as const satisfies GraphQLKotlinCodegenConfig;

  return merge(defaultConfig, config) as GraphQLKotlinCodegenConfig &
    typeof defaultConfig;
}

export type CodegenConfigWithDefaults = ReturnType<
  typeof buildConfigWithDefaults
>;
