import { GraphQLKotlinCodegenConfig } from "./src/plugin";
import { CodegenConfig } from "@graphql-codegen/cli";

export default {
  overwrite: true,
  schema: "test/**/*.graphql",
  config: {
    namingConvention: "keep",
  },
  generates: {
    "test/integration/Types.kt": {
      plugins: [
        {
          "dist/plugin.cjs": {
            resolverInterfaces: [
              {
                typeName: "Query",
              },
            ],
          } satisfies GraphQLKotlinCodegenConfig,
        },
      ],
    },
  },
} satisfies CodegenConfig;
