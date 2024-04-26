import { Kind, TypeNode } from "graphql/index";
import { GraphQLSchema, InputObjectTypeDefinitionNode } from "graphql";

export function inputTypeHasMatchingOutputType(
  inputTypeNode: InputObjectTypeDefinitionNode,
  schema: GraphQLSchema,
) {
  const typeNameWithoutInput = getTypeNameWithoutInput(
    inputTypeNode.name.value,
  );
  const matchingType = schema.getType(typeNameWithoutInput)?.astNode;
  const matchingTypeFields =
    matchingType?.kind === Kind.OBJECT_TYPE_DEFINITION
      ? matchingType.fields
      : [];
  const inputFields = inputTypeNode.fields;
  const fieldsMatch = matchingTypeFields?.every((field) => {
    const matchingInputField = inputFields?.find(
      (inputField) => inputField.name.value === field.name.value,
    );
    if (!matchingInputField) return false;
    return fieldsAreEquivalent(field.type, matchingInputField.type);
  });
  return Boolean(matchingTypeFields?.length && fieldsMatch);
}

function getTypeNameWithoutInput(name: string) {
  return name.endsWith("Input") ? name.replace("Input", "") : name;
}

function fieldsAreEquivalent(
  typeField: TypeNode,
  inputField: TypeNode,
): boolean {
  switch (typeField.kind) {
    case Kind.NAMED_TYPE:
      return (
        inputField.kind === Kind.NAMED_TYPE &&
        typeField.name.value === getTypeNameWithoutInput(inputField.name.value)
      );
    case Kind.LIST_TYPE:
      return (
        inputField.kind === Kind.LIST_TYPE &&
        fieldsAreEquivalent(typeField.type, inputField.type)
      );
    case Kind.NON_NULL_TYPE:
      return (
        inputField.kind === Kind.NON_NULL_TYPE &&
        fieldsAreEquivalent(typeField.type, inputField.type)
      );
  }
}
