import { Kind } from "graphql/index";
import { GraphQLSchema, InputObjectTypeDefinitionNode } from "graphql";
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
  const typeNode = schema.getType(typeName)?.astNode;
  const inputNode = schema.getType(inputName)?.astNode;
  if (!typeNode && !inputNode) {
    return true;
  }
  if (
    typeNode?.kind !== Kind.OBJECT_TYPE_DEFINITION ||
    inputNode?.kind !== Kind.INPUT_OBJECT_TYPE_DEFINITION
  ) {
    return false;
  }
  if (
    !typeNode.fields ||
    !inputNode.fields ||
    typeNode.fields.length !== inputNode.fields.length
  ) {
    return false;
  }
  return typeNode.fields.every((typeField) => {
    const baseTypeName = getBaseTypeNode(typeField.type).name.value;
    const matchingInputField = inputNode.fields?.find(
      (inputField) => inputField.name.value === typeField.name.value,
    );
    if (!matchingInputField?.type) return false;
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
