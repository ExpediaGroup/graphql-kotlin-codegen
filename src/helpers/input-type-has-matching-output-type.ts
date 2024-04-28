import {
  GraphQLSchema,
  InputObjectTypeDefinitionNode,
  isInputObjectType,
  isObjectType,
} from "graphql";
import { getBaseTypeNode } from "@graphql-codegen/visitor-plugin-common";

export function inputTypeHasMatchingOutputType(
  inputNode: InputObjectTypeDefinitionNode,
  schema: GraphQLSchema,
) {
  const inputName = inputNode.name.value;
  const typeNameWithoutInput = getTypeNameWithoutInput(inputName);
  const matchingTypeName =
    schema.getType(typeNameWithoutInput)?.astNode?.name.value;
  return Boolean(
    matchingTypeName && typesAreEquivalent(matchingTypeName, inputName, schema),
  );
}

export function getTypeNameWithoutInput(name: string) {
  return name.endsWith("Input") ? name.replace("Input", "") : name;
}

function typesAreEquivalent(
  typeName: string,
  inputName: string,
  schema: GraphQLSchema,
): boolean {
  const typeNode = schema.getType(typeName);
  const inputNode = schema.getType(inputName);
  if (!typeNode?.astNode && !inputNode?.astNode) {
    return true;
  }
  if (
    !isObjectType(typeNode) ||
    !isInputObjectType(inputNode) ||
    !typeNode.astNode?.fields ||
    !inputNode.astNode?.fields ||
    typeNode.astNode.fields.length !== inputNode.astNode.fields.length
  ) {
    return false;
  }

  return typeNode.astNode.fields.every((typeField) => {
    const matchingInputField = inputNode.astNode?.fields?.find(
      (inputField) => inputField.name.value === typeField.name.value,
    );
    if (!matchingInputField?.type) return false;
    const baseTypeName = getBaseTypeNode(typeField.type).name.value;
    const baseInputTypeName = getBaseTypeNode(matchingInputField.type).name
      .value;
    const typeNamesAreEquivalent =
      baseTypeName == getTypeNameWithoutInput(baseInputTypeName);
    if (!typeNamesAreEquivalent) {
      return false;
    }
    return typesAreEquivalent(baseTypeName, baseInputTypeName, schema);
  });
}
