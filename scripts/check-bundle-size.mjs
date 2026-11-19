import { readFile, readdir } from "node:fs/promises";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const bundleBudgets = Object.freeze({ gzip: 350_000, brotli: 300_000, totalGzip: 11_000_000, totalBrotli: 10_000_000 });

export async function checkBundleSize(directory = "dist", limits = {}) {
  const budgets = { ...bundleBudgets, ...limits };
  const chunks = [];
  async function visit(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile() && entry.name.endsWith(".js")) {
        const source = await readFile(file);
        chunks.push({ file: relative(directory, file), bytes: source.length,
          gzip: gzipSync(source, { level: 9 }).length,
          brotli: brotliCompressSync(source, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }).length });
      }
    }
  }
  await visit(directory);
  if (!chunks.length) throw new Error("No JavaScript chunks found; run the production build first.");
  chunks.sort((a, b) => b.gzip - a.gzip);
  for (const encoding of ["gzip", "brotli"]) {
    const oversized = chunks.filter(chunk => chunk[encoding] > budgets[encoding]);
    if (oversized.length) throw new Error(`${encoding} chunk budget exceeded (${budgets[encoding].toLocaleString()} bytes):\n${oversized.map(chunk => `${chunk.file}: ${chunk[encoding].toLocaleString()} bytes`).join("\n")}`);
    const total = chunks.reduce((sum, chunk) => sum + chunk[encoding], 0);
    const limit = budgets[encoding === "gzip" ? "totalGzip" : "totalBrotli"];
    if (total > limit) throw new Error(`${encoding} total budget exceeded: ${total.toLocaleString()} / ${limit.toLocaleString()} bytes`);
  }
  return chunks;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const chunks = await checkBundleSize(process.argv[2]);
    console.log(`Bundle budgets passed: ${chunks.length} JavaScript chunks (gzip level 9 / brotli quality 5).`);
    for (const encoding of ["gzip", "brotli"]) {
      const largest = [...chunks].sort((a, b) => b[encoding] - a[encoding])[0];
      console.log(`${encoding}: largest ${largest.file} ${largest[encoding].toLocaleString()} / ${bundleBudgets[encoding].toLocaleString()}; total ${chunks.reduce((sum, chunk) => sum + chunk[encoding], 0).toLocaleString()} bytes.`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
