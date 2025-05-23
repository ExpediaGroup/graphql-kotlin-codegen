import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";
import { Kind } from "graphql";

export default {
  extraImports: ["should_honor_directiveReplacements_config.*"],
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation2"],
      definitionType: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    },
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1"],
    },
    {
      directive: "directive2",
      kotlinAnnotations: ["@CommonAnnotation"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
