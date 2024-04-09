import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraScalars: [
    {
      scalarName: "URL",
      kotlinType: "java.net.URL",
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
