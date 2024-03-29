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

import { dirname, normalize } from "path";
import {
  getCachedDocumentNodeFromSchema,
  PluginFunction,
} from "@graphql-codegen/plugin-helpers";
import { buildPackageNameFromPath } from "@graphql-codegen/java-common";
import { KotlinVisitor } from "./visitor";
import {
  ParsedConfig,
  RawConfig,
} from "@graphql-codegen/visitor-plugin-common";
import { Input, safeParse } from "valibot";
import { configSchema } from "./config";
import { addDependentTypes } from "./helpers/add-dependent-types";
import { visit } from "graphql";

export type GraphQLKotlinCodegenConfig = Partial<RawConfig & ParsedConfig> &
  Input<typeof configSchema>;
export type CodegenConfig = RawConfig &
  ParsedConfig &
  Input<typeof configSchema>;
export const plugin: PluginFunction<CodegenConfig> = (
  schema,
  _,
  config,
  info,
) => {
  if (!info?.outputFile) {
    throw new Error("Missing outputFile in config");
  }
  const relevantPath = dirname(normalize(info.outputFile));
  const { issues } = safeParse(configSchema, config);
  if (issues) {
    throw new Error(
      issues
        .map(
          (issue) =>
            `${issue.path?.[0]?.key} must be ${issue.expected} (${issue.input} was provided)`,
        )
        .join("\n"),
    );
  }

  addDependentTypes(config, schema);
  const visitor = new KotlinVisitor(config, schema);
  const astNode = getCachedDocumentNodeFromSchema(schema);
  const { definitions } = visit(astNode, visitor);
  const packageName = `package ${
    config.packageName ?? buildPackageNameFromPath(relevantPath)
  }\n`;
  const defaultImports = ["com.expediagroup.graphql.generator.annotations.*"];
  const imports =
    defaultImports
      .concat(config.extraImports ?? [])
      .map((annotation) => `import ${annotation}`)
      .join("\n") + "\n";
  const typeDefinitions = definitions
    .filter((d: unknown) => typeof d === "string" && d.length)
    .join("\n\n");

  return [packageName, imports, typeDefinitions].join("\n") + "\n";
};
