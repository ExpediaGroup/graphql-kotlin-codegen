import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";
import { Kind } from "graphql/index";

export default {
  extraImports: ["should_honor_directiveReplacements_config.*"],
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation1"],
      definitionType: Kind.OBJECT_TYPE_DEFINITION,
    },
    {
      directive: "directive2",
      kotlinAnnotations: ["@SomeAnnotation2"],
      definitionType: Kind.ENUM_TYPE_DEFINITION,
    },
  ],
  classConsolidationEnabled: true,
} satisfies GraphQLKotlinCodegenConfig;
