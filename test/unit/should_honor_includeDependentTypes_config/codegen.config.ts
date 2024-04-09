import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  onlyTypes: ["TypeHonoringIncludeDependentTypesConfig"],
  includeDependentTypes: false,
} satisfies GraphQLKotlinCodegenConfig;
