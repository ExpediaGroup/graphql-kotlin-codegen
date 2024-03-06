import { GraphQLKotlinCodegenConfig } from "../../../src/plugin";
import { Kind } from "graphql/index";

export default {
  directiveReplacements: [
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeInputAnnotation"],
      definitionType: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    },
    {
      directive: "directive1",
      kotlinAnnotations: ["@SomeAnnotation"],
    },
    {
      directive: "directive2",
      kotlinAnnotations: ["@CommonAnnotation"],
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
