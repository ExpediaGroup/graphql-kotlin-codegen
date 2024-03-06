import { buildSchema } from "graphql";
import { GraphQLKotlinCodegenConfig, plugin } from "../src/plugin";
import { describe, expect, it } from "bun:test";
import { Types } from "@graphql-codegen/plugin-helpers";
import * as glob from "glob";

function buildUnitTest({
  testName,
  config,
}: {
  testName: string;
  config: GraphQLKotlinCodegenConfig;
}) {
  it(testName, async () => {
    const filePath = `./test/unit/${testName}`;
    const schema = buildSchema(
      await Bun.file(`${filePath}/schema.graphql`).text(),
    );
    const documents: Types.DocumentFile[] = [];
    const pluginArgs = [
      schema,
      documents,
      config,
      { outputFile: "com/kotlin/generated/output.kt" },
    ] as const;
    if ("expectedErrorMessage" in config) {
      expect(() => plugin(...pluginArgs)).toThrow(config.expectedErrorMessage);
      return;
    }
    const result = await plugin(...pluginArgs);
    await Bun.write(`${filePath}/actual.kt`, result.toString());
    expect(result).toEqual(await Bun.file(`${filePath}/expected.kt`).text());
  });
}

const testDirectories = glob.sync("./test/unit/*");
const testCases = await Promise.all(
  testDirectories.map(async (testPath) => {
    const testName = testPath.split("/").findLast(Boolean);
    if (!testName) throw new Error("Test name not found");
    const absolutePath = `${process.cwd()}/${testPath}`;
    const configExists =
      glob.sync(`${absolutePath}/codegen.config.ts`).length > 0;
    if (!configExists) {
      return {
        testName,
        config: {},
      };
    }
    return {
      testName,
      config: (await import(`${absolutePath}/codegen.config.ts`))
        .default as GraphQLKotlinCodegenConfig,
    };
  }),
);

describe("graphql-kotlin-codegen", () => {
  testCases.forEach(buildUnitTest);
});
