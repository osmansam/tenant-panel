import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-restricted-syntax": [
        "warn",
        {
          selector: "JSXOpeningElement[name.name='input']",
          message: "Use the shared Input or Checkbox component from components/ui.",
        },
        {
          selector: "JSXOpeningElement[name.name='select']",
          message: "Use the shared Select component from components/ui.",
        },
        {
          selector: "JSXOpeningElement[name.name='textarea']",
          message: "Use the shared Textarea component from components/ui.",
        },
      ],
    },
  },
  {
    files: [
      "src/components/ui/input.tsx",
      "src/components/ui/checkbox.tsx",
      "src/components/ui/textarea.tsx",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
];
