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
import { buildAnnotations } from "../annotations/build-annotations";
import { buildTypeMetadata } from "../utils/build-type-metadata";
import { shouldExcludeTypeDefinition } from "../config/should-exclude-type-definition";
import {
  getDependentInterfaceNames,
  getDependentUnionsForType,
} from "../utils/dependent-type-utils";
import { buildObjectFieldDefinition } from "./field";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { inputTypeHasMatchingOutputType } from "../utils/input-type-has-matching-output-type";
import { findTypeInResolverInterfacesConfig } from "../config/find-type-in-resolver-interfaces-config";

export function buildObjectTypeDefinition(
  node: ObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (shouldExcludeTypeDefinition(node, config)) {
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
  const fieldsWithArguments = node.fields?.filter(
    (fieldNode) => fieldNode.arguments?.length,
  );
  const fieldNodes = typeInResolverInterfacesConfig
    ? node.fields
    : fieldsWithArguments;
  const shouldGenerateFunctions = Boolean(
    typeInResolverInterfacesConfig ||
      node.fields?.some((fieldNode) => fieldNode.arguments?.length),
  );

  if (node.name.value === "Query" || node.name.value === "Mutation") {
    const individualQueryClasses = node.fields?.map((fieldNode) => {
      const className = `${titleCase(fieldNode.name.value)}${node.name.value}`;
      return `${annotations}${outputRestrictionAnnotation}open class ${className}${interfaceInheritance} {
${getDataClassMembers({ node, fieldNodes: [fieldNode], schema, config, shouldGenerateFunctions })}
}`;
    });
    const consolidatedQueryClass = `${annotations}${outputRestrictionAnnotation}open class ${name}${interfaceInheritance} {
${getDataClassMembers({ node, fieldNodes, schema, config, shouldGenerateFunctions })}
}`;
    return [consolidatedQueryClass, ...(individualQueryClasses ?? [])].join(
      "\n\n",
    );
  }

  if (shouldGenerateFunctions) {
    const atLeastOneFieldHasNoArguments = node.fields?.some(
      (fieldNode) => !fieldNode.arguments?.length,
    );
    const constructor =
      !typeInResolverInterfacesConfig && atLeastOneFieldHasNoArguments
        ? `(\n${node.fields
            ?.map((fieldNode) => {
              const typeMetadata = buildTypeMetadata(
                fieldNode.type,
                schema,
                config,
              );
              return buildObjectFieldDefinition({
                node,
                fieldNode,
                schema,
                config,
                typeMetadata,
                shouldGenerateFunctions,
                isConstructorField: true,
              });
            })
            .join(",\n")}\n)`
        : "";

    return `${annotations}${outputRestrictionAnnotation}open class ${name}${constructor}${interfaceInheritance} {
${getDataClassMembers({ node, fieldNodes, schema, config, shouldGenerateFunctions })}
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
}: {
  node: ObjectTypeDefinitionNode;
  fieldNodes?: readonly FieldDefinitionNode[];
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  shouldGenerateFunctions?: boolean;
}) {
  return (fieldNodes ?? node.fields)
    ?.map((fieldNode) => {
      const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
      return buildObjectFieldDefinition({
        node,
        fieldNode,
        schema,
        config,
        typeMetadata,
        shouldGenerateFunctions,
      });
    })
    .join(`${shouldGenerateFunctions ? "" : ","}\n`);
}

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
