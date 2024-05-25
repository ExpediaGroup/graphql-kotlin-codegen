import { CodegenConfig } from "@graphql-codegen/cli";

export default {
  overwrite: true,
  schema: "test/**/*.graphql",
  config: {
    namingConvention: "keep",
  },
  generates: {
    "test/integration/Types.kt": {
      plugins: ["dist/plugin.cjs"],
    },
  },
} satisfies CodegenConfig;
