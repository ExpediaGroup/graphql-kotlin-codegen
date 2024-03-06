import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1", "@SomeAnnotation2"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
