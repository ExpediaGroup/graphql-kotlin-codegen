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
import { shouldIncludeTypeDefinition } from "../config/should-include-type-definition";
import {
  getDependentInterfaceNames,
  getDependentUnionsForType,
} from "../utils/dependent-type-utils";
import {
  buildConstructorFieldDefinition,
  buildObjectFieldDefinition,
} from "./field";
import { CodegenConfigWithDefaults } from "../config/build-config-with-defaults";
import { shouldConsolidateTypes } from "../utils/should-consolidate-types";
import { findTypeInResolverInterfacesConfig } from "../config/find-type-in-resolver-interfaces-config";
import { sanitizeName } from "../utils/sanitize-name";
import { titleCase } from "../utils/title-case";

export function buildObjectTypeDefinition(
  node: ObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
) {
  if (!shouldIncludeTypeDefinition(node.name.value, config)) {
    return "";
  }

  const annotations = buildAnnotations({
    schema,
    config,
    definitionNode: node,
  });
  const dependentInterfaces = getDependentInterfaceNames(node, config);
  const dependentUnions = getDependentUnionsForType(schema, node, config);
  const interfacesToInherit =
    config.unionGeneration === "MARKER_INTERFACE"
      ? dependentInterfaces.concat(dependentUnions)
      : dependentInterfaces;
  const sanitizedInterfaceNames = interfacesToInherit.map((_interface) =>
    sanitizeName(_interface),
  );
  const interfaceInheritance = `${interfacesToInherit.length ? ` : ${sanitizedInterfaceNames.join(", ")}` : ""}`;

  const name = sanitizeName(node.name.value);
  const potentialMatchingInputType = schema.getType(`${name}Input`);
  const typeWillBeConsolidated =
    isInputObjectType(potentialMatchingInputType) &&
    potentialMatchingInputType.astNode &&
    shouldConsolidateTypes(potentialMatchingInputType.astNode, schema, config);
  const outputRestrictionAnnotation = typeWillBeConsolidated
    ? ""
    : "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])\n";

  const typeInResolverInterfacesConfig = findTypeInResolverInterfacesConfig(
    node,
    config,
  );
  const resolverFields = typeInResolverInterfacesConfig?.fields;
  const fieldsWithArguments = node.fields?.filter(
    (fieldNode) => fieldNode.arguments?.length,
  );
  const fieldNodes = !typeInResolverInterfacesConfig
    ? fieldsWithArguments
    : resolverFields
      ? node.fields?.filter((f) => resolverFields.includes(f.name.value))
      : node.fields;

  const isTopLevelType =
    node.name.value === "Query" || node.name.value === "Mutation";
  if (isTopLevelType) {
    const individualQueryClasses = node.fields?.map((fieldNode) => {
      const className = `${titleCase(fieldNode.name.value)}${node.name.value}Interface`;
      return `${annotations}${outputRestrictionAnnotation}open class ${className}${interfaceInheritance} {
${getClassMembers({ node, fieldNodes: [fieldNode], schema, config })}
}`;
    });
    const consolidatedQueryClass = `${annotations}${outputRestrictionAnnotation}open class ${name}${interfaceInheritance} {
${getClassMembers({ node, fieldNodes, schema, config })}
}`;
    return [consolidatedQueryClass, ...(individualQueryClasses ?? [])].join(
      "\n\n",
    );
  }

  const shouldGenerateFunctions = shouldGenerateFunctionsInClass(
    node,
    typeInResolverInterfacesConfig,
  );
  if (shouldGenerateFunctions) {
    const constructor = buildConstructor(
      node,
      typeInResolverInterfacesConfig,
      schema,
      config,
    );
    return `${annotations}${outputRestrictionAnnotation}open class ${name}${constructor}${interfaceInheritance} {
${getClassMembers({ node, fieldNodes, schema, config })}
}`;
  }

  return `${annotations}${outputRestrictionAnnotation}data class ${name}(
${getClassMembers({ node, schema, config })}
)${interfaceInheritance}`;
}

function buildConstructor(
  node: ObjectTypeDefinitionNode,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
  schema: GraphQLSchema,
  config: CodegenConfigWithDefaults,
): string {
  const resolverFields = typeInResolverInterfacesConfig?.fields;

  if (resolverFields) {
    const nonResolverFields = node.fields?.filter(
      (f) => !resolverFields.includes(f.name.value),
    );
    if (!nonResolverFields?.length) return "";
    return `(\n${nonResolverFields
      .map((fieldNode) =>
        buildConstructorFieldDefinition({
          node,
          fieldNode,
          schema,
          config,
          typeInResolverInterfacesConfigOverride: null,
        }).replace(/,$/, ""),
      )
      .join(",\n")}\n)`;
  }

  if (typeInResolverInterfacesConfig) return "";

  const fieldsForConstructor = node.fields?.filter((f) => !f.arguments?.length);
  if (!fieldsForConstructor?.length) return "";
  return `(\n${node.fields
    ?.map((fieldNode) =>
      buildConstructorFieldDefinition({
        node,
        fieldNode,
        schema,
        config,
      }),
    )
    .join(",\n")}\n)`;
}

function getClassMembers({
  node,
  fieldNodes,
  schema,
  config,
}: {
  node: ObjectTypeDefinitionNode;
  fieldNodes?: readonly FieldDefinitionNode[];
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
}) {
  return (fieldNodes ?? node.fields)
    ?.map((fieldNode) => {
      return buildObjectFieldDefinition({
        node,
        fieldNode,
        schema,
        config,
      });
    })
    .join("\n");
}

export function shouldGenerateFunctionsInClass(
  node: ObjectTypeDefinitionNode,
  typeInResolverInterfacesConfig: ReturnType<
    typeof findTypeInResolverInterfacesConfig
  >,
) {
  return Boolean(
    typeInResolverInterfacesConfig ||
    node.fields?.some((fieldNode) => fieldNode.arguments?.length),
  );
}
