import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [{ typeName: "Mutation", classMethods: "SUSPEND" }],
} satisfies GraphQLKotlinCodegenConfig;
