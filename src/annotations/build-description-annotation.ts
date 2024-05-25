import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { TypeMetadata } from "../utils/build-type-metadata";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { Kind } from "graphql/index";
import { DefinitionNode, trimDescription } from "./build-annotations";

export function buildDescriptionAnnotation(
  description: string,
  definitionNode: DefinitionNode,
  config: CodegenConfigWithDefaults,
  typeMetadata?: TypeMetadata,
) {
  const trimmedDescription = trimDescription(description);
  const isDeprecatedDescription = trimmedDescription.startsWith(
    deprecatedDescriptionPrefix,
  );
  if (isDeprecatedDescription && typeMetadata?.unionAnnotation) {
    return `@GraphQLDescription("${trimmedDescription}")\n`;
  } else if (isDeprecatedDescription) {
    const descriptionValue = description.replace(
      deprecatedDescriptionPrefix,
      "",
    );
    return `@Deprecated("${trimDescription(descriptionValue)}")\n`;
  }

  const deprecatedDirective = definitionNode.directives?.find(
    (directive) => directive.name.value === "deprecated",
  );
  const deprecatedReasonNode = deprecatedDirective?.arguments?.find(
    (arg) => arg.name.value === "reason",
  )?.value;
  const deprecatedReason =
    deprecatedReasonNode?.kind === Kind.STRING
      ? deprecatedReasonNode.value
      : "";
  const trimmedDeprecatedReason = trimDescription(deprecatedReason);

  if (deprecatedDirective && typeMetadata?.unionAnnotation) {
    return `@GraphQLDescription("${trimmedDeprecatedReason}")\n`;
  } else if (deprecatedDirective) {
    const graphqlDescription = trimmedDescription
      ? `@GraphQLDescription("${trimmedDescription}")\n`
      : "";
    const deprecatedDescription = `@Deprecated("${trimmedDeprecatedReason}")\n`;
    return `${graphqlDescription}${graphqlDescription ? indent(deprecatedDescription, 2) : deprecatedDescription}`;
  }

  if (
    trimmedDescription &&
    (config.unionGeneration === "MARKER_INTERFACE" ||
      definitionNode?.kind !== Kind.UNION_TYPE_DEFINITION)
  ) {
    return `@GraphQLDescription("${trimmedDescription}")\n`;
  }

  return "";
}

const deprecatedDescriptionPrefix = "DEPRECATED: ";
