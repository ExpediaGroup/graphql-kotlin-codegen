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
import {
  buildFieldDefinition,
  buildFunctionFieldDefinition,
} from "../helpers/build-field-definition";
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

  const potentialMatchingInputType = schema.getType(`${name}Input`);
  const typeWillBeConsolidated =
    isInputObjectType(potentialMatchingInputType) &&
    potentialMatchingInputType.astNode &&
    inputTypeHasMatchingOutputType(potentialMatchingInputType.astNode, schema);
  const outputRestrictionAnnotation = typeWillBeConsolidated
    ? ""
    : "@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])\n";

  const shouldGenerateFunctions = shouldGenerateResolverClass(node, config);
  if (shouldGenerateFunctions) {
    const fieldsWithNoArguments = node.fields?.filter(
      (fieldNode) => !fieldNode.arguments?.length,
    );
    const constructor = fieldsWithNoArguments?.length
      ? `(\n${fieldsWithNoArguments
          .map((fieldNode) => {
            const fieldDefinition = buildFieldDefinition(
              fieldNode,
              schema,
              config,
            );
            const typeMetadata = buildTypeMetadata(
              fieldNode.type,
              schema,
              config,
            );
            const shouldOverrideField = node.interfaces?.some(
              (interfaceNode) => {
                const typeNode = schema.getType(interfaceNode.name.value);
                return (
                  isInterfaceType(typeNode) &&
                  typeNode.astNode?.fields?.some(
                    (field) => field.name.value === fieldNode.name.value,
                  )
                );
              },
            );

            return indent(
              `${shouldOverrideField ? "override " : ""}${fieldDefinition}: ${typeMetadata.typeName}${typeMetadata.defaultValue}`,
              2,
            );
          })
          .join(",\n")}\n)`
      : "";

    return `${annotations}${outputRestrictionAnnotation}open class ${name}${constructor}${interfaceInheritance} {
${getDataClassMembers({ node, schema, config, shouldGenerateFunctions })}
}`;
  }

  return `${annotations}${outputRestrictionAnnotation}data class ${name}(
${getDataClassMembers({ node, schema, config })}
)${interfaceInheritance}`;
}

function getDataClassMembers({
  node,
  schema,
  config,
  shouldGenerateFunctions,
  completableFuture,
}: {
  node: ObjectTypeDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfigWithDefaults;
  shouldGenerateFunctions?: boolean;
  completableFuture?: boolean;
}) {
  return node.fields
    ?.filter(
      (fieldNode) => !shouldGenerateFunctions || fieldNode.arguments?.length,
    )
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
      const fieldDefinition = shouldGenerateFunctions
        ? buildFunctionFieldDefinition(
            node,
            fieldNode,
            schema,
            config,
            completableFuture,
            shouldOverrideField,
          )
        : buildFieldDefinition(fieldNode, schema, config);
      const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeMetadata.typeName}${typeMetadata.isNullable ? "?" : ""}>`;
      const defaultValue = shouldGenerateFunctions
        ? `${typeMetadata.isNullable ? "?" : ""} = throw NotImplementedError("${node.name.value}.${fieldNode.name.value} must be implemented.")`
        : typeMetadata.defaultValue;
      const defaultDefinition = `${typeMetadata.typeName}${isExternalField(fieldNode) ? (typeMetadata.isNullable ? "?" : "") : defaultValue}`;
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
    .join(`${shouldGenerateFunctions ? "" : ","}\n`);
}
