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

import { ConstDirectiveNode } from "graphql/language";
import { Kind } from "graphql/index";

const federationDirectivePrefix =
  "com.expediagroup.graphql.generator.federation.directives.";

export function getFederationDirectiveReplacement(
  directive: ConstDirectiveNode,
) {
  switch (directive.name.value) {
    case "key":
      if (
        directive.arguments?.[0] &&
        directive.arguments[0].value.kind === Kind.STRING
      ) {
        const fieldArg = directive.arguments[0]?.value.value;
        return `@${federationDirectivePrefix}KeyDirective(${federationDirectivePrefix}FieldSet("${fieldArg}"))`;
      }
      return undefined;
    case "extends":
      return `@${federationDirectivePrefix}ExtendsDirective`;
    case "external":
      return `@${federationDirectivePrefix}ExternalDirective`;
  }
}
