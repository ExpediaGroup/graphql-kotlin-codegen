import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  // @ts-expect-error - invalid config
  onlyTypes: 2,
  expectedErrorMessage: "onlyTypes must be Array (2 was provided)",
} satisfies GraphQLKotlinCodegenConfig;
