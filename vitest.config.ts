import { menuIconChunks } from "./scripts/menu-icon-chunks";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [menuIconChunks()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.d.ts",
        "src/**/*.generated.ts",
        "src/test/**",
        "src/**/testFixtures.ts",
      ],
      reporter: ["text-summary", "json-summary", "json", "lcov"],
      reportsDirectory: "coverage",
      reportOnFailure: true,
      processingConcurrency: 1,
    },
    typecheck: {
      enabled: true,
    },
  },
});
