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
  array,
  boolean,
  enum_,
  literal,
  object,
  optional,
  string,
  union,
} from "valibot";
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
   * Denotes Kotlin classes representing union types to be treated as interfaces rather than annotation classes.
   * @description This should be used for types outside `dependentTypesInScope` that are not generated by the plugin. Only use when unionGeneration is set to `ANNOTATION_CLASS`.
   */
  externalUnionsAsInterfaces: optional(array(string())),
  /**
   * Additional imports to add to the generated file. GraphQL Kotlin annotations are always imported.
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
        kotlinAnnotations: array(
          union([
            string(),
            object({
              /**
               * The name of the annotation to replace the directive with.
               */
              annotationName: string(),
              /**
               * The arguments to forward from the directive directly to the Kotlin annotation. Can be INT, FLOAT, STRING, BOOLEAN, or ENUM.
               * @example @YourGraphQLDirective(arg1: "value1") -> @YourKotlinAnnotation(arg1 = "value1")
               */
              argumentsToRetain: array(string()),
            }),
          ]),
        ),
        /**
         * The type definition to apply the directive replacement to. If omitted, the replacement will apply to all definition types.
         */
        definitionType: optional(enum_(Kind)),
      }),
    ),
  ),
  /**
   * Denotes types that should be generated as classes. Resolver classes can inherit from these to enforce a type contract.
   * @description Type names can be passed as strings to generate default functions.
   * Also, suspend functions or `java.util.concurrent.CompletableFuture` functions can be generated per type.
   * @example
   * [
   *   "MyResolverType",
   *   {
   *     typeName: "MySuspendResolverType",
   *     classMethods: "SUSPEND",
   *   },
   *   {
   *     typeName: "MyCompletableFutureResolverType",
   *     classMethods: "COMPLETABLE_FUTURE",
   *   }
   * ]
   */
  resolverClasses: optional(
    array(
      union([
        string(),
        object({
          typeName: string(),
          classMethods: optional(
            union([literal("SUSPEND"), literal("COMPLETABLE_FUTURE")]),
          ),
        }),
      ]),
    ),
  ),
  /**
   * Denotes the generation strategy for union types. Defaults to `MARKER_INTERFACE`.
   * @description The `MARKER_INTERFACE` option is highly recommended, since it is more type-safe than using annotation classes.
   * @link https://opensource.expediagroup.com/graphql-kotlin/docs/schema-generator/writing-schemas/unions/
   */
  unionGeneration: optional(
    union([literal("ANNOTATION_CLASS"), literal("MARKER_INTERFACE")]),
  ),
});
