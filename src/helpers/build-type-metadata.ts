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
  isScalarType,
  isUnionType,
  Kind,
  NamedTypeNode,
  TypeNode,
} from "graphql";
import { getBaseTypeNode } from "@graphql-codegen/visitor-plugin-common";
import { wrapTypeWithModifiers } from "@graphql-codegen/java-common";
import { CodegenConfig } from "../plugin";

export interface TypeMetadata {
  typeName: string;
  unionAnnotation?: string;
  defaultValue: string;
  isNullable: boolean;
}

export function buildTypeMetadata(
  typeNode: TypeNode,
  schema: GraphQLSchema,
  config: CodegenConfig,
): TypeMetadata {
  const innerType = getBaseTypeNode(typeNode);
  const schemaType = schema.getType(innerType.name.value);
  if (!schemaType) {
    throw new Error(`Unable to find type ${innerType.name.value}`);
  }

  const defaultValue = getDefaultValue(typeNode, innerType);
  const isNullable = typeNode.kind !== Kind.NON_NULL_TYPE;
  const commonMetadata = {
    defaultValue,
    isNullable,
  };

  if (isScalarType(schemaType)) {
    const scalars = [...KOTLIN_SCALARS, ...(config.extraScalars ?? [])];
    const scalarToUse = scalars.find(
      ({ scalarName }) => scalarName === schemaType.name,
    );
    const scalarTypeName = scalarToUse?.kotlinType ?? "String";
    return {
      ...commonMetadata,
      typeName: buildListType(typeNode, scalarTypeName),
    };
  } else if (isUnionType(schemaType)) {
    const shouldTreatUnionAsInterface =
      config.useMarkerInterfaces ||
      config.externalUnionsAsInterfaces?.includes(schemaType.name);
    return {
      ...commonMetadata,
      unionAnnotation: shouldTreatUnionAsInterface
        ? undefined
        : schemaType.name,
      typeName: buildListType(
        typeNode,
        shouldTreatUnionAsInterface ? schemaType.name : "Any",
      ),
    };
  } else {
    return {
      ...commonMetadata,
      typeName: buildListType(typeNode, schemaType.name),
    };
  }
}

export function buildListType(typeNode: TypeNode, typeName: string) {
  const isNullable = typeNode.kind !== Kind.NON_NULL_TYPE;
  const listTypeNullableWithNullableMember =
    typeNode.kind == Kind.LIST_TYPE &&
    typeNode.type.kind !== Kind.NON_NULL_TYPE;
  const listTypeNonNullableWithNullableMember =
    !isNullable &&
    typeNode.type.kind === Kind.LIST_TYPE &&
    typeNode.type.type.kind !== Kind.NON_NULL_TYPE;
  const listMemberNullable =
    listTypeNullableWithNullableMember || listTypeNonNullableWithNullableMember;
  return wrapTypeWithModifiers(
    `${typeName}${listMemberNullable ? "?" : ""}`,
    typeNode,
    "List",
  );
}

export const KOTLIN_SCALARS = [
  {
    scalarName: "ID",
    kotlinType: "com.expediagroup.graphql.generator.scalars.ID",
  },
  {
    scalarName: "String",
    kotlinType: "String",
  },
  {
    scalarName: "Boolean",
    kotlinType: "Boolean",
  },
  {
    scalarName: "Int",
    kotlinType: "Int",
  },
  {
    scalarName: "Float",
    kotlinType: "Double",
  },
];

function getDefaultValue(typeNode: TypeNode, innerType: NamedTypeNode) {
  const isArray =
    typeNode.kind === Kind.LIST_TYPE ||
    (typeNode.kind === Kind.NON_NULL_TYPE &&
      typeNode.type.kind === Kind.LIST_TYPE);
  const isBoolean = innerType.name.value === "Boolean";
  const isNullable = typeNode.kind !== Kind.NON_NULL_TYPE;
  return isNullable
    ? "? = null"
    : isArray
      ? " = emptyList()"
      : isBoolean
        ? " = false"
        : "";
}
