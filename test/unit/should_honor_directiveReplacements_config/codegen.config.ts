import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  extraImports: ["should_honor_directiveReplacements_config.*"],
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1", "@SomeAnnotation2"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
