import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [
    {
      typeName: "MyCompletableFutureFieldsType",
      classMethods: "COMPLETABLE_FUTURE",
      fields: ["completableFutureField", "nullableCompletableFutureField"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
