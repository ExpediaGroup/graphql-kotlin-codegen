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
  PluginFunction,
  getCachedDocumentNodeFromSchema,
} from "@graphql-codegen/plugin-helpers";
import { KotlinVisitor } from "./visitor";
import {
  ParsedConfig,
  RawConfig,
} from "@graphql-codegen/visitor-plugin-common";
import { Input, safeParse } from "valibot";
import { configSchema } from "./config";
import { addDependentTypesToOnlyTypes } from "./helpers/add-dependent-types-to-only-types";
import { visit } from "graphql";
import { buildConfigWithDefaults } from "./helpers/build-config-with-defaults";

export type GraphQLKotlinCodegenConfig = Partial<RawConfig & ParsedConfig> &
  Input<typeof configSchema>;

export const plugin: PluginFunction<GraphQLKotlinCodegenConfig> = (
  schema,
  _,
  config,
  info,
) => {
  if (!info?.outputFile) {
    throw new Error("Missing outputFile in config");
  }
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

  const configWithDefaults = buildConfigWithDefaults(config, info.outputFile);
  if (
    configWithDefaults.onlyTypes &&
    configWithDefaults.includeDependentTypes
  ) {
    addDependentTypesToOnlyTypes(configWithDefaults, schema);
  }
  const visitor = new KotlinVisitor(configWithDefaults, schema);
  const astNode = getCachedDocumentNodeFromSchema(schema);
  const { definitions } = visit(astNode, visitor);
  const packageName = `package ${configWithDefaults.packageName}\n`;
  const imports =
    configWithDefaults.extraImports
      .map((annotation) => `import ${annotation}`)
      .join("\n") + "\n";
  const typeDefinitions = definitions
    .filter(
      (definition: unknown) =>
        typeof definition === "string" && definition.length,
    )
    .join("\n\n");

  return [packageName, imports, typeDefinitions].join("\n") + "\n";
};
