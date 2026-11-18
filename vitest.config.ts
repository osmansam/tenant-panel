import { menuIconChunks } from "./scripts/menu-icon-chunks";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [menuIconChunks()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    typecheck: {
      enabled: true,
    },
  },
});
