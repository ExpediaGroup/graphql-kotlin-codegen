import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraImports: [
    "com.some.import.TypeOutOfScope",
    "com.some.import.UnionOutOfScope",
    "com.some.import.ExternalUnionAsInterface",
  ],
  onlyTypes: ["MyTypeInOnlyTypes"],
  dependentTypesInScope: ["TypeInScope", "UnionInScope", "Type1"],
  externalUnionsAsInterfaces: ["ExternalUnionAsInterface"],
} satisfies GraphQLKotlinCodegenConfig;
