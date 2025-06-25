import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import globals from "globals"
import path from "path"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    ignores: ["eslint.config.mjs"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true, // This will automatically find your tsconfig.json
        tsconfigRootDir: path.dirname(import.meta.url).replace(/^file:\/\//, ""),
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    rules: {
      // "@typescript-eslint/no-unused-vars": ["error", { "args": "none", "varsIgnorePattern": "^_" }],
      // "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // TypeScript-specific rules
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: true,
        },
      ],
      "@typescript-eslint/sort-type-constituents": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // Let ESLint sort import declarations
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",

      // General code quality rules
      "prefer-const": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-return-await": "off",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
    },
  },
]
