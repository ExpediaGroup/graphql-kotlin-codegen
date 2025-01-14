import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [
    {
      typeName: "MyIncludedResolverType",
    },
    {
      typeName: "MyIncludedResolverTypeWithNoFieldArgs",
    },
    {
      typeName: "MySuspendResolverType",
      classMethods: "SUSPEND",
    },
    {
      typeName: "MyCompletableFutureResolverType",
      classMethods: "COMPLETABLE_FUTURE",
    },
    {
      typeName: "MyIncludedInterface",
    },
    {
      typeName: "MyIncludedInterfaceSuspend",
      classMethods: "SUSPEND",
    },
    {
      typeName: "MyIncludedResolverTypeWithNullDataFetchingEnvironment",
      nullableDataFetchingEnvironment: true,
    },
    {
      typeName: "MyTypeWithPartialData",
      dataFetcherResult: true,
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
