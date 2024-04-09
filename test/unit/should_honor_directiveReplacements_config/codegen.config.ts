import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1", "@SomeAnnotation2"],
    },
    {
      directive: "directive2",
      kotlinAnnotations: [
        {
          annotationName: "SomeAnnotation3",
          retainArguments: ["arg1", "arg2"],
        },
      ],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
