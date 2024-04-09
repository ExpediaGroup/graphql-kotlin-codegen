import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraImports: ["should_honor_dependentTypesInScope_config.*"],
  onlyTypes: ["MyTypeInOnlyTypes"],
  dependentTypesInScope: ["TypeInScope", "UnionInScope", "Type1"],
  externalUnionsAsInterfaces: ["ExternalUnionAsInterface"],
} satisfies GraphQLKotlinCodegenConfig;
