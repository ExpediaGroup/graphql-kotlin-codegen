import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: [
    "MyIncludedType",
    "MyIncludedInterfaceInOnlyTypes",
    "MyIncludedType2",
    "MyIncludedUnion",
  ],
  includeDependentTypes: false,
} satisfies GraphQLKotlinCodegenConfig;
