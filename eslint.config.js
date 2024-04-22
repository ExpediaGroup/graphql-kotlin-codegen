// @ts-check

import typescriptEslint from "typescript-eslint";

export default [
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-call": "error",
    },
  },
  {
    ignores: ["build", "dist", "docs"],
  },
];
