import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1", "@SomeAnnotation2"],
    },
    {
      directive: "directiveWithArgs",
      kotlinAnnotations: [
        {
          annotationName: "SomeAnnotation3",
          argumentsToRetain: ["arg1", "arg2"],
        },
      ],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
