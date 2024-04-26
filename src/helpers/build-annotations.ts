/*
Copyright 2024 Expedia, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { indent } from "@graphql-codegen/visitor-plugin-common";
import {
  EnumValueDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  TypeDefinitionNode,
} from "graphql";
import { buildDescriptionAnnotation } from "./build-description-annotation";
import { buildDirectiveAnnotations } from "./build-directive-annotations";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";
import { TypeMetadata } from "./build-type-metadata";

export type DefinitionNode =
  | TypeDefinitionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode;

export function buildAnnotations({
  config,
  definitionNode,
  typeMetadata,
}: {
  config: CodegenConfigWithDefaults;
  definitionNode: DefinitionNode;
  typeMetadata?: TypeMetadata;
}) {
  const description = definitionNode?.description?.value ?? "";
  const descriptionAnnotation = buildDescriptionAnnotation(
    description,
    definitionNode,
    config,
    typeMetadata,
  );
  const directiveAnnotations = buildDirectiveAnnotations(
    definitionNode,
    config,
  );
  const unionAnnotation = typeMetadata?.unionAnnotation
    ? `@${typeMetadata.unionAnnotation}\n`
    : "";

  const annotations = [
    unionAnnotation,
    descriptionAnnotation,
    directiveAnnotations,
  ];

  const shouldIndent =
    definitionNode?.kind === "FieldDefinition" ||
    definitionNode?.kind === "InputValueDefinition";
  return (
    annotations
      .map((annotation) =>
        annotation ? (shouldIndent ? indent(annotation, 2) : annotation) : "",
      )
      .filter(Boolean)
      .join("") + "\n".trim()
  );
}

export function trimDescription(description?: string) {
  return (
    description
      ?.split("\n")
      .map((str) => str.trim().replaceAll('"', "").replaceAll("\\", ""))
      .find((str) => str.match(/^[a-zA-Z]/)) ?? ""
  );
}
