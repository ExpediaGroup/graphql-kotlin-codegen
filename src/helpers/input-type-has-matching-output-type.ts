import { Kind, TypeNode } from "graphql/index";
import { GraphQLSchema, TypeDefinitionNode } from "graphql";
import { getBaseTypeNode } from "@graphql-codegen/visitor-plugin-common";

export function inputTypeHasMatchingOutputType(
  schema: GraphQLSchema,
  typeNode?: TypeDefinitionNode | null,
) {
  if (typeNode?.kind !== Kind.INPUT_OBJECT_TYPE_DEFINITION) {
    return false;
  }

  const typeNameWithoutInput = getTypeNameWithoutInput(typeNode.name.value);
  const matchingType = schema.getType(typeNameWithoutInput)?.astNode;
  const matchingTypeFields =
    matchingType?.kind === Kind.OBJECT_TYPE_DEFINITION
      ? matchingType.fields
      : [];
  const inputFields = typeNode.fields;
  const typesHaveSameNumberOfFields = Boolean(
    matchingTypeFields?.length &&
      matchingTypeFields.length === inputFields?.length,
  );
  const fieldsMatch = matchingTypeFields?.every((field) => {
    const matchingInputField = inputFields?.find(
      (inputField) => inputField.name.value === field.name.value,
    );
    if (!matchingInputField) return false;
    return fieldsAreEquivalent(field.type, matchingInputField.type);
  });
  return Boolean(typesHaveSameNumberOfFields && fieldsMatch);
}

export function getTypeNameWithoutInput(name: string) {
  return name.endsWith("Input") ? name.replace("Input", "") : name;
}

function fieldsAreEquivalent(
  typeField: TypeNode,
  inputField: TypeNode,
): boolean {
  const baseTypeName = getBaseTypeNode(typeField).name.value;
  const baseInputTypeName = getBaseTypeNode(inputField).name.value;
  return baseTypeName === getTypeNameWithoutInput(baseInputTypeName);
}
