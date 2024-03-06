import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraImports: [
    "com.some.import.TypeOutOfScope",
    "com.some.import.UnionOutOfScope",
  ],
  onlyTypes: ["MyTypeInOnlyTypes"],
  dependentTypesInScope: ["TypeInScope", "UnionInScope", "Type1"],
} satisfies GraphQLKotlinCodegenConfig;
