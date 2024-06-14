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
   * Limits dependent types to include from `onlyTypes` list. Can be used to exclude classes that are imported from external packages.
   *
   * If `MyType` depends on `MyDependentType1` and `MyDependentType2`, we can allow `MyDependentType2` to be imported
   * externally by including its import in `extraImports` and omitting it in the `dependentTypesInScope` list.
   * @example ["MyType", "MyDependentType1"]
   */
  dependentTypesInScope: optional(array(string())),
  /**
   * Denotes Kotlin annotations to replace GraphQL directives.
   *
   * `directive` is the name of the directive to replace, and `kotlinAnnotations` is a list of Kotlin annotations to replace the directive with.
   *
   * Use `argumentsToRetain` to forward arguments from the directive directly to the Kotlin annotation. Can be INT, FLOAT, STRING, BOOLEAN, or ENUM. ```@YourGraphQLDirective(arg1: "value1") -> @YourKotlinAnnotation(arg1 = "value1")```
   *
   * Use `definitionType` to apply the directive replacement to a specific kind of type definition. If omitted, the replacement will apply to all definition types.
   *
   * @example
   * [{ directive: "myDirective", kotlinAnnotations: ['@MyAnnotation("some argument")'] }]
   *
   * @example
   * [{ directive: "myDirective", definitionType: Kind.INPUT_OBJECT_TYPE_DEFINITION, kotlinAnnotations: ['@MyAnnotation("some argument")'] }]
   */
  directiveReplacements: optional(
    array(
      object({
        directive: string(),
        kotlinAnnotations: array(
          union([
            string(),
            object({
              annotationName: string(),
              argumentsToRetain: array(string()),
            }),
          ]),
        ),
        definitionType: optional(enum_(Kind)),
      }),
    ),
  ),
  /**
   * Denotes Kotlin classes representing union types to be treated as interfaces rather than annotation classes.
   *
   * This should be used for types outside `dependentTypesInScope` that are not generated by the plugin.
   * Only use when unionGeneration is set to `ANNOTATION_CLASS`.
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
   * Determines whether to generate dependent types from types listed in `onlyTypes`.
   *
   * @default true
   */
  includeDependentTypes: optional(boolean()),
  /**
   * Only generate types matching those in this list. If empty, no types will be generated. If omitted, all types will be generated.
   * @example ["MyType", "MyEnum"]
   */
  onlyTypes: optional(array(string())),
  /**
   * The package name for the generated file.
   *
   * @default path.to.directory.containing.generated.file
   *
   * @example "com.example.generated"
   */
  packageName: optional(string()),
  /**
   * Denotes types that should be generated as interfaces rather than classes. Resolver classes should implement the
   * interface functions to enforce a type contract.
   *
   * Type names can be optionally passed with the classMethods config to generate the interface with `suspend` functions or
   * `java.util.concurrent.CompletableFuture` functions. Pass `nullableDataFetchingEnvironment: true` to make the
   * `DataFetchingEnvironment` argument nullable in each resolver function for that class.
   * @example
   * [
   *   {
   *     typeName: "MyResolverType",
   *   },
   *   {
   *     typeName: "MySuspendResolverType",
   *     classMethods: "SUSPEND",
   *   },
   *   {
   *     typeName: "MyCompletableFutureResolverType",
   *     classMethods: "COMPLETABLE_FUTURE",
   *   },
   *   {
   *     typeName: "MyTypeWithNullableDataFetchingEnvironment",
   *     nullableDataFetchingEnvironment: true,
   *   }
   * ]
   * @link https://opensource.expediagroup.com/graphql-kotlin-codegen/docs/recommended-usage
   */
  resolverInterfaces: optional(
    array(
      object({
        typeName: string(),
        classMethods: optional(
          union([literal("SUSPEND"), literal("COMPLETABLE_FUTURE")]),
        ),
        nullableDataFetchingEnvironment: optional(boolean()),
      }),
    ),
  ),
  /**
   * Denotes the generation strategy for union types. Can be `ANNOTATION_CLASS` or `MARKER_INTERFACE`.
   *
   * The `MARKER_INTERFACE` option is highly recommended, since it is more type-safe than using annotation classes.
   *
   * @default MARKER_INTERFACE
   *
   * @link https://opensource.expediagroup.com/graphql-kotlin/docs/schema-generator/writing-schemas/unions/
   */
  unionGeneration: optional(
    union([literal("ANNOTATION_CLASS"), literal("MARKER_INTERFACE")]),
  ),
});