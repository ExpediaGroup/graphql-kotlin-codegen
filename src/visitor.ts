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
  BaseVisitor,
  ParsedConfig,
  RawConfig,
} from "@graphql-codegen/visitor-plugin-common";
import {
  EnumTypeDefinitionNode,
  EnumValueDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from "graphql";
import { GraphQLKotlinCodegenConfig } from "./plugin";
import {
  buildEnumTypeDefinition,
  buildEnumValueDefinition,
} from "./definitions/enum";
import { buildInterfaceDefinition } from "./definitions/interface";
import { buildInputObjectDefinition } from "./definitions/input";
import { buildObjectTypeDefinition } from "./definitions/object";
import { buildUnionTypeDefinition } from "./definitions/union";

export class KotlinResolversVisitor extends BaseVisitor<
  RawConfig,
  GraphQLKotlinCodegenConfig & ParsedConfig
> {
  constructor(
    rawConfig: GraphQLKotlinCodegenConfig,
    protected _schema: GraphQLSchema,
  ) {
    super(rawConfig, rawConfig as GraphQLKotlinCodegenConfig & ParsedConfig);
  }

  EnumValueDefinition(node: EnumValueDefinitionNode): string {
    return buildEnumValueDefinition.bind(this)(node);
  }

  EnumTypeDefinition(node: EnumTypeDefinitionNode): string {
    return buildEnumTypeDefinition(node, this.config);
  }

  InterfaceTypeDefinition(node: InterfaceTypeDefinitionNode): string {
    return buildInterfaceDefinition(node, this._schema, this.config);
  }

  InputObjectTypeDefinition(node: InputObjectTypeDefinitionNode): string {
    return buildInputObjectDefinition(node, this._schema, this.config);
  }

  ObjectTypeDefinition(node: ObjectTypeDefinitionNode): string {
    return buildObjectTypeDefinition(node, this._schema, this.config);
  }

  UnionTypeDefinition(node: UnionTypeDefinitionNode): string {
    return buildUnionTypeDefinition(node, this.config);
  }
}
