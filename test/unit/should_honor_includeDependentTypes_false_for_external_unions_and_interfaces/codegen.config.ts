import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["MyIncludedType", "MyIncludedInterfaceInOnlyTypes"],
  includeDependentTypes: false,
} satisfies GraphQLKotlinCodegenConfig;
