import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraScalars: [
    {
      scalarName: "URL",
      kotlinType: "URL",
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
