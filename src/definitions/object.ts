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

import {
  FieldDefinitionNode,
  GraphQLSchema,
  isInputObjectType,
  ObjectTypeDefinitionNode,
} from "graphql";
import { buildAnnotations } from "../helpers/build-annotations";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import {
  getDependentInterfaceNames,
  getDependentUnionsForType,
} from "../helpers/dependent-type-utils";
import { buildFieldDefinition } from "../helpers/build-field-definition";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";
import { inputTypeHasMatchingOutputType } from "../helpers/input-type-has-matching-output-type";
import { findTypeInResolverInterfacesConfig } from "../helpers/findTypeInResolverInterfacesConfig";

export function buildObjectTypeDefinition(
  node: ObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  const name = node.name.value;
  const dependentInterfaces = getDependentInterfaceNames(node);
  const dependentUnions = getDependentUnionsForType(schema, node);
  const interfacesToInherit =
    config.unionGeneration === "MARKER_INTERFACE"
      ? dependentInterfaces.concat(dependentUnions)
      : dependentInterfaces;
  const interfaceInheritance = `${interfacesToInherit.length ? ` : ${interfacesToInherit.join(", ")}` : ""}`;

  const potentialMatchingInputType = schema.getType(`${name}Input`);
  const typeWillBeConsolidated =
    isInputObjectType(potentialMatchingInputType) &&
    potentialMatchingInputType.astNode &&
    inputTypeHasMatchingOutputType(potentialMatchingInputType.astNode, schema);
  const outputRestrictionAnnotation = typeWillBeConsolidated
    ? ""
    : "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])\n";

  const typeInResolverInterfacesConfig = findTypeInResolverInterfacesConfig(
    node,
    config,
  );
  const shouldGenerateFunctions = Boolean(
    typeInResolverInterfacesConfig ||
      node.fields?.some((fieldNode) => fieldNode.arguments?.length),
  );
  if (shouldGenerateFunctions) {
    const fieldsWithNoArguments = node.fields?.filter(
      (fieldNode) => !fieldNode.arguments?.length,
    );
    const constructor =
      !typeInResolverInterfacesConfig && fieldsWithNoArguments?.length
        ? `(\n${fieldsWithNoArguments
            .map((fieldNode) => {
              const typeMetadata = buildTypeMetadata(
                fieldNode.type,
                schema,
                config,
              );
              return buildFieldDefinition(
                node,
                fieldNode,
                schema,
                config,
                typeMetadata,
              );
            })
            .join(",\n")}\n)`
        : "";

    const fieldsWithArguments = node.fields?.filter(
      (fieldNode) => fieldNode.arguments?.length,
    );
    const fieldNodes = typeInResolverInterfacesConfig
      ? node.fields
      : fieldsWithArguments;
    const hasConstructor = Boolean(constructor);
    const keyWord = constructor ? "abstract class" : "interface";
    return `${annotations}${outputRestrictionAnnotation}${keyWord} ${name}${constructor}${interfaceInheritance} {
${getDataClassMembers({ node, fieldNodes, schema, config, shouldGenerateFunctions, hasConstructor })}
}`;
  }

  return `${annotations}${outputRestrictionAnnotation}data class ${name}(
${getDataClassMembers({ node, schema, config })}
)${interfaceInheritance}`;
}

function getDataClassMembers({
  node,
  fieldNodes,
  schema,
  config,
  shouldGenerateFunctions,
  hasConstructor,
}: {
  node: ObjectTypeDefinitionNode;
  fieldNodes?: readonly FieldDefinitionNode[];
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  shouldGenerateFunctions?: boolean;
  hasConstructor?: boolean;
}) {
  return (fieldNodes ?? node.fields)
    ?.map((fieldNode) => {
      const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
      return buildFieldDefinition(
        node,
        fieldNode,
        schema,
        config,
        typeMetadata,
        shouldGenerateFunctions,
        hasConstructor,
      );
    })
    .join(`${shouldGenerateFunctions ? "" : ","}\n`);
}
