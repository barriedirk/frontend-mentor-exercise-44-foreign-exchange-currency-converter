// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import jsxa11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
      "src/app/favicon.ico",
    ],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
      "jsx-a11y": jsxa11y,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...tsPlugin.configs.recommended.rules,
      ...jsxa11y.flatConfigs.recommended.rules,

      /* --- ARCHITECTURAL CONSTRAINTS --- */
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["useEffect"],
              message:
                "Move logic to the core layer, custom hooks (React Query) or use Server Actions.",
            },
          ],
        },
      ],

      /* --- OVERRIDES ACCESIBILIDAD (JSX-A11Y) --- */
      "jsx-a11y/label-has-associated-control": ["error", { assert: "both" }],
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/tabindex-no-positive": "error",
      "jsx-a11y/role-has-required-aria-props": "error",

      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-redundant-roles": "warn",

      /* --- SONARQUBE & CLEAN CODE --- */
      complexity: ["error", { max: 10 }],
      "max-depth": ["error", 3],
      "max-lines-per-function": ["warn", { max: 250, skipBlankLines: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      /* --- TYPESCRIPT STRICTNESS (Guru Level) --- */
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  /* --- COHERENCIA ESTILÍSTICA (Tailwind v4 Auto-sorting) --- */
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/no-custom-classname": "off", // Necesario para no chocar con tus clases semánticas
    },
  },
];

export default eslintConfig;
