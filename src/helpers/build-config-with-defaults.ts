import { GraphQLKotlinCodegenConfig } from "../plugin";
import { buildPackageNameFromPath } from "@graphql-codegen/java-common";
import { dirname, normalize } from "path";

export function buildConfigWithDefaults(
  config: GraphQLKotlinCodegenConfig,
  outputFile: string,
) {
  return {
    packageName: buildPackageNameFromPath(dirname(normalize(outputFile))),
    includeDependentTypes: true,
    unionGeneration: "MARKER_INTERFACE",
    ...config,
    extraImports: [
      "com.expediagroup.graphql.generator.annotations.*",
      ...(config.extraImports ?? ([] satisfies string[])),
    ],
  } as const;
}
