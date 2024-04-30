import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverClasses: [
    "MyResolverType",
    {
      typeName: "MySuspendResolverType",
      classMethods: "SUSPEND",
    },
    {
      typeName: "MyCompletableFutureResolverType",
      classMethods: "COMPLETABLE_FUTURE",
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
