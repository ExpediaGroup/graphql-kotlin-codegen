import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverTypes: [
    {
      typeName: "MyResolverType",
      methodType: "DEFAULT",
    },
    {
      typeName: "MyResolverType",
      methodType: "SUSPEND",
    },
    {
      typeName: "MyResolverType",
      methodType: "COMPLETABLE_FUTURE",
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
