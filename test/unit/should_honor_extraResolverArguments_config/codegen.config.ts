import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverTypes: ["MyIncludedExtraFieldArgsType"],
  extraResolverArguments: [
    {
      argumentName: "myExtraFieldArg",
      argumentType: "String",
      typeNames: ["MyExtraFieldArgsType", "MyIncludedExtraFieldArgsType"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
