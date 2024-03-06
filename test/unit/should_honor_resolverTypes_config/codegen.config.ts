import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverTypes: ["MyIncludedResolverType", "MyIncludedInterface"],
} satisfies GraphQLKotlinCodegenConfig;
