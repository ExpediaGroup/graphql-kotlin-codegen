import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverTypes: ["MyIncludedExtraFieldArgsType"],
  extraResolverArguments: [
    {
      argumentName: "dataFetchingEnvironment",
      argumentType: "graphql.schema.DataFetchingEnvironment",
      typeNames: ["MyExtraFieldArgsType", "MyIncludedExtraFieldArgsType"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
