import { InterfaceTypeDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { CodegenConfigWithDefaults } from "./build-config-with-defaults";

export function findTypeInResolverInterfacesConfig(
  node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
  config: CodegenConfigWithDefaults,
) {
  return config.resolverInterfaces.find(
    (resolverInterface) => resolverInterface.typeName === node.name.value,
  );
}
