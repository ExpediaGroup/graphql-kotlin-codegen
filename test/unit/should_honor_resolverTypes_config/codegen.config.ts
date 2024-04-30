import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverClasses: [
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
