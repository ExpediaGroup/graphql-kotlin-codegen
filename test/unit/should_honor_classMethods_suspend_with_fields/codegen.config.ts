import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  resolverInterfaces: [
    {
      typeName: "MySuspendFieldsType",
      classMethods: "SUSPEND",
      fields: ["suspendField"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
