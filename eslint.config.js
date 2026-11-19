import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**", "coverage/**", "output/**", "playwright-report/**", "test-results/**"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.node } },
    rules: js.configs.recommended.rules,
  },
  { files: ["scripts/verify-*.js", "scripts/*browser-fixture.js"], languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: { sourceType: "module", ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs["eslint-recommended"].overrides[0].rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-console": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-restricted-syntax": ["warn",
        { selector: "ImportDeclaration:matches([source.value='./utils'], [source.value='../utils'], [source.value='../../utils'], [source.value='../../../utils'], [source.value='../../../../utils'], [source.value='src/utils'], [source.value='./utils/index'], [source.value='../utils/index'], [source.value='../../utils/index'], [source.value='../../../utils/index'])", message: "The utils barrel was removed. Import from a domain module (e.g. utils/pageBindings)." },
        { selector: "JSXOpeningElement[name.name='input']", message: "Use the shared Input or Checkbox component from components/ui." },
        { selector: "JSXOpeningElement[name.name='select']", message: "Use the shared Select component from components/ui." },
        { selector: "JSXOpeningElement[name.name='textarea']", message: "Use the shared Textarea component from components/ui." },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { project: "./tsconfig.json", tsconfigRootDir: import.meta.dirname } },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
    },
  },
  { files: ["src/utils/logger.ts", "src/visual-engine/logger.ts", "src/visual-engine/effects/providers/reactbits/official/**"], rules: { "no-console": "off" } },
  { files: ["src/components/ui/input.tsx", "src/components/ui/checkbox.tsx", "src/components/ui/textarea.tsx"], rules: { "no-restricted-syntax": "off" } },
];
