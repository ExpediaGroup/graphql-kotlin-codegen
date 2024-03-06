import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["MyType", "MyInput", "MyStandaloneUnion"],
} satisfies GraphQLKotlinCodegenConfig;
