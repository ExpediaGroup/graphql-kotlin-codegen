import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [
    {
      typeName: "DataFetcherResultSuspendType",
      classMethods: "SUSPEND",
      dataFetcherResult: true,
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
