import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Vitest configuration.
 *
 * No React plugin: Vitest transforms `.tsx` with the automatic JSX runtime from
 * `tsconfig.json` already, and adding `@vitejs/plugin-react` pulls in a second
 * copy of Vite whose types conflict with Vitest's during `next build`.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      /* `server-only` is a Next build marker with no resolvable module. */
      "server-only": path.resolve(__dirname, "./tests/unit/server-only-stub.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
