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
  GraphQLSchema,
  isInputObjectType,
  isInterfaceType,
  ObjectTypeDefinitionNode,
} from "graphql";
import { buildAnnotations } from "../helpers/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import {
  getDependentInterfaceNames,
  getDependentUnionsForType,
} from "../helpers/dependent-type-utils";
import { shouldGenerateResolverClass } from "../helpers/should-generate-resolver-class";
import { buildFieldDefinition } from "../helpers/build-field-definition";
import { isExternalField } from "../helpers/is-external-field";
import { CodegenConfigWithDefaults } from "../helpers/build-config-with-defaults";
import { inputTypeHasMatchingOutputType } from "../helpers/input-type-has-matching-output-type";

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

  if (shouldGenerateResolverClass(node, config)) {
    return `${annotations}@GraphQLIgnore\ninterface ${name}${interfaceInheritance} {
${getDataClassMembers({ node, schema, config })}
}

${annotations}@GraphQLIgnore\ninterface ${name}CompletableFuture {
${getDataClassMembers({ node, schema, config, completableFuture: true })}
}`;
  }

  const potentialMatchingInputType = schema.getType(`${name}Input`);
  const typeWillBeConsolidated =
    isInputObjectType(potentialMatchingInputType) &&
    potentialMatchingInputType.astNode &&
    inputTypeHasMatchingOutputType(potentialMatchingInputType.astNode, schema);
  const outputRestrictionAnnotation = typeWillBeConsolidated
    ? ""
    : "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])\n";
  return `${annotations}${outputRestrictionAnnotation}data class ${name}(
${getDataClassMembers({ node, schema, config })}
)${interfaceInheritance}`;
}

function getDataClassMembers({
  node,
  schema,
  config,
  completableFuture,
}: {
  node: ObjectTypeDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  completableFuture?: boolean;
}) {
  const resolverType = shouldGenerateResolverClass(node, config);

  return node.fields
    ?.map((fieldNode) => {
      const typeMetadata = buildTypeMetadata(fieldNode.type, schema, config);
      const shouldOverrideField =
        !completableFuture &&
        node.interfaces?.some((interfaceNode) => {
          const typeNode = schema.getType(interfaceNode.name.value);
          return (
            isInterfaceType(typeNode) &&
            typeNode.astNode?.fields?.some(
              (field) => field.name.value === fieldNode.name.value,
            )
          );
        });
      const fieldDefinition = buildFieldDefinition(
        fieldNode,
        node,
        schema,
        config,
        completableFuture,
      );
      const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>`;
      const defaultDefinition = `${typeMetadata.typeName}${isExternalField(fieldNode) ? (typeMetadata.isNullable ? "?" : "") : typeMetadata.defaultValue}`;
      const field = indent(
        `${shouldOverrideField ? "override " : ""}${fieldDefinition}: ${completableFuture ? completableFutureDefinition : defaultDefinition}`,
        2,
      );
      const annotations = buildAnnotations({
        config,
        definitionNode: fieldNode,
        typeMetadata,
      });
      return `${annotations}${field}`;
    })
    .join(`${resolverType ? "" : ","}\n`);
}
