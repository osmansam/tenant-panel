import { readdir, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function checkBundleSize(directory = "dist", maxBytes = 2_000_000) {
  const chunks = [];
  async function visit(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile() && entry.name.endsWith(".js")) {
        chunks.push({ file: relative(directory, file), bytes: (await stat(file)).size });
      }
    }
  }
  await visit(directory);
  if (!chunks.length) throw new Error("No JavaScript chunks found; run the production build first.");
  chunks.sort((a, b) => b.bytes - a.bytes);
  const oversized = chunks.filter(chunk => chunk.bytes > maxBytes);
  if (oversized.length) {
    throw new Error(`JavaScript chunk budget exceeded (${maxBytes.toLocaleString()} bytes):\n${oversized.map(chunk => `${chunk.file}: ${chunk.bytes.toLocaleString()} bytes`).join("\n")}`);
  }
  return chunks;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const chunks = await checkBundleSize(process.argv[2]);
    console.log(`Bundle budget passed: ${chunks.length} JavaScript chunks; largest ${chunks[0].file} (${chunks[0].bytes.toLocaleString()} / 2,000,000 bytes).`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
