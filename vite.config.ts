import { menuIconChunks } from "./scripts/menu-icon-chunks";
import { execFileSync } from "node:child_process";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

const release = process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[a-f0-9]{40,64}$/i.test(release)) throw new Error("The app release must be a full git commit SHA");
const uploadSourceMaps = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

export default defineConfig({
  define: { __APP_RELEASE__: JSON.stringify(release) },
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  build: { manifest: true, sourcemap: uploadSourceMaps ? "hidden" : false },
  plugins: [
    menuIconChunks(), react(), viteTsconfigPaths(), svgrPlugin(),
    process.env.ANALYZE === "true" && visualizer({ filename: "output/bundle-stats.html", gzipSize: true, brotliSize: true, open: false }),
    uploadSourceMaps && sentryVitePlugin({
      org: process.env.SENTRY_ORG, project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN, url: process.env.SENTRY_URL,
      telemetry: false,
      release: { name: release, inject: false },
      sourcemaps: { assets: "./dist/**", filesToDeleteAfterUpload: ["./dist/**/*.map"] },
    }),
  ],
});
