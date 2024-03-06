import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["MyType"],
  includeDependentTypes: false,
} satisfies GraphQLKotlinCodegenConfig;
