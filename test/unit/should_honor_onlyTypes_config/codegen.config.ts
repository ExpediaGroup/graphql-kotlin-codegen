import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["MyType", "MyEnum"],
} satisfies GraphQLKotlinCodegenConfig;
