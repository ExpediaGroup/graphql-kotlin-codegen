import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  // @ts-expect-error - invalid config
  onlyTypes: 2,
  expectedErrorMessage: "Invalid type: Expected Array but received 2",
} satisfies GraphQLKotlinCodegenConfig;
