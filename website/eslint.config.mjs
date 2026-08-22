import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".next-demo/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "screenshots/**",
    "playwright-report/**",
    "test-results/**",
    "scripts/tmp/**",
  ]),
  {
    rules: {
      /* Unused values are almost always a leftover; surface them as errors so
         they do not accumulate. `_`-prefixed arguments stay allowed. */
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
