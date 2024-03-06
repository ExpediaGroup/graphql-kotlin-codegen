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

import { array, boolean, enum_, object, optional, string } from "valibot";
import { Kind } from "graphql";

export const configSchema = object({
  /**
   * The package name for the generated file. Defaults to the directory containing the generated file.
   * @example "com.example.generated"
   */
  packageName: optional(string()),
  /**
   * Only generate types matching those in this list. If empty, no types will be generated. If omitted, all types will be generated.
   * @example ["MyType", "MyEnum"]
   */
  onlyTypes: optional(array(string())),
  /**
   * Determines whether to generate dependent types from types listed in `onlyTypes`. Defaults to `true`.
   */
  includeDependentTypes: optional(boolean()),
  /**
   * Limits dependent types to include from `onlyTypes` list. Can be used to exclude classes that are imported from external packages.
   * @description If `MyType` depends on `MyDependentType1` and `MyDependentType2`, we can allow `MyDependentType2` to be imported externally by including its import in `extraImports` and omitting it in the `dependentTypesInScope` list: `["MyType", "MyDependentType1"]`
   */
  dependentTypesInScope: optional(array(string())),
  /**
   * Additional imports to add to the generated file.
   * @example ["com.example.additional.import.*"]
   */
  extraImports: optional(array(string())),
  /**
   * Additional scalars to add to the generated file. Unknown scalars default to `String`.
   * @example [{ scalarName: "URL", kotlinType: "java.net.URL" }]
   */
  extraScalars: optional(
    array(
      object({
        scalarName: string(),
        kotlinType: string(),
      }),
    ),
  ),
  /**
   * Denotes Kotlin annotations to replace GraphQL directives.
   * @example [{ directive: "myDirective", kotlinAnnotations: ['@MyAnnotation("some argument")'] }]
   */
  directiveReplacements: optional(
    array(
      object({
        /**
         * The name of the directive to replace.
         */
        directive: string(),
        /**
         * A list of Kotlin annotations to replace the directive with.
         */
        kotlinAnnotations: array(string()),
        /**
         * The type definition to apply the directive replacement to. If omitted, the replacement will apply to all definition types.
         */
        definitionType: optional(enum_(Kind)),
      }),
    ),
  ),
  /**
   * Denotes types that should be generated as interfaces with suspense functions. Resolver classes can inherit from these to enforce a type contract.
   * @description Two interfaces will be generated: one with suspend functions, and one with `java.util.concurrent.CompletableFuture` functions.
   * @example ["MyResolverType1", "MyResolverType2"]
   */
  resolverTypes: optional(array(string())),
  /**
   * Denotes extra arguments that should be added to functions on resolver classes.
   * @example [{ typeNames: ["MyType", "MyType2"], argumentName: "myArgument", argumentValue: "myValue" }]
   */
  extraResolverArguments: optional(
    array(
      object({
        /**
         * The types whose fields to add the argument to. The argument will be added to all fields on each type. If omitted, the argument will be added to all fields on all types.
         */
        typeNames: optional(array(string())),
        /**
         * The name of the argument to add.
         */
        argumentName: string(),
        /**
         * The type of the argument to add.
         */
        argumentType: string(),
      }),
    ),
  ),
});
