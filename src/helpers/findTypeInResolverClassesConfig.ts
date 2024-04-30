import { InterfaceTypeDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";

export function findTypeInResolverClassesConfig(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  return config.resolverClasses?.find(
    (resolverClass) => resolverClass.typeName === node.name.value,
  );
}
