import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off", // if on, can't write ' in strings, have to write &apos
      "react/prop-types": "off",
    },
  },
  prettier, // must always be last, turns off formatting ESLint checks
];
