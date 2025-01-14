import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [
    {
      typeName: "DataFetcherResultCompletableFutureType",
      classMethods: "COMPLETABLE_FUTURE",
      dataFetcherResult: true,
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
