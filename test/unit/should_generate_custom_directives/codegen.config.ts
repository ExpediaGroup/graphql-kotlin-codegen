import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";

export default {
  customDirectives: ["myCustomDirective", "myCustomDirectiveWithArgs"],
  extraImports: ["should_honor_directiveReplacements_config.*"],
  directiveReplacements: [
    {
      directive: "someDirective1",
      kotlinAnnotations: ["@SomeAnnotation1"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
