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

import { GraphQLSchema, Kind, ObjectTypeDefinitionNode } from "graphql";
import { buildAnnotations } from "../helpers/build-annotations";
import { indent } from "@graphql-codegen/visitor-plugin-common";
import { buildTypeMetadata } from "../helpers/build-type-metadata";
import { shouldIncludeTypeDefinition } from "../helpers/should-include-type-definition";
import { getDependentInterfaceNames } from "../helpers/dependent-type-utils";
import { isResolverType } from "../helpers/is-resolver-type";
import { buildFieldDefinition } from "../helpers/build-field-definition";
import { isExternalField } from "../helpers/is-external-field";
import { CodegenConfig } from "../plugin";

export function buildObjectTypeDefinition(
  node: ObjectTypeDefinitionNode,
  schema: GraphQLSchema,
  config: CodegenConfig,
) {
  if (!shouldIncludeTypeDefinition(node, config)) {
    return "";
  }

  const annotations = buildAnnotations({
    config,
    definitionNode: node,
  });
  const name = node.name.value;
  const interfacesToInherit = getDependentInterfaceNames(node);
  const interfaceInheritance = `${interfacesToInherit.length ? ` : ${interfacesToInherit.join(", ")}` : ""}`;

  if (isResolverType(node, config)) {
    return `${annotations}@GraphQLIgnore\ninterface ${name}${interfaceInheritance} {
${getClassMembers({ node, schema, config })}
}

${annotations}@GraphQLIgnore\ninterface ${name}CompletableFuture {
${getClassMembers({ node, schema, config, completableFuture: true })}
}`;
  }

  return `${annotations}data class ${name}(
${getClassMembers({ node, schema, config })}
)${interfaceInheritance}`;
}

function getClassMembers({
  node,
  schema,
  config,
  completableFuture,
}: {
  node: ObjectTypeDefinitionNode;
  schema: GraphQLSchema;
  config: CodegenConfig;
  completableFuture?: boolean;
}) {
  const resolverType = isResolverType(node, config);

  return node.fields
    ?.map((fieldNode) => {
      const typeToUse = buildTypeMetadata(fieldNode.type, schema, config);
      const shouldOverrideField =
        !completableFuture &&
        node.interfaces?.some((i) => {
          const typeNode = schema.getType(i.name.value)?.astNode;
          return (
            typeNode?.kind === Kind.INTERFACE_TYPE_DEFINITION &&
            typeNode.fields?.some((f) => f.name.value === fieldNode.name.value)
          );
        });
      const fieldDefinition = buildFieldDefinition(
        fieldNode,
        node,
        config,
        completableFuture,
      );
      const completableFutureDefinition = `java.util.concurrent.CompletableFuture<${typeToUse.typeName}${typeToUse.isNullable ? "?" : ""}>`;
      const defaultDefinition = `${typeToUse.typeName}${isExternalField(fieldNode) ? (typeToUse.isNullable ? "?" : "") : typeToUse.defaultValue}`;
      const field = indent(
        `${shouldOverrideField ? "override " : ""}${fieldDefinition}: ${completableFuture ? completableFutureDefinition : defaultDefinition}`,
        2,
      );
      const annotations = buildAnnotations({
        config,
        definitionNode: fieldNode,
        resolvedType: typeToUse,
      });
      return `${annotations}${field}`;
    })
    .join(`${resolverType ? "" : ","}\n`);
}
