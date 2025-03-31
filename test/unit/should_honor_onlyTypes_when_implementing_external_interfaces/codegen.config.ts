import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["MyIncludedType", "MyIncludedInterfaceInOnlyTypes"],
} satisfies GraphQLKotlinCodegenConfig;
