import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1"],
    },
    {
      directive: "directive2",
      kotlinAnnotations: ["@SomeAnnotation2"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
