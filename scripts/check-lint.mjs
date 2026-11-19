import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import eslintApi from "eslint/use-at-your-own-risk";
import { compareDebt, summarizeResults } from "./lint-ratchet.mjs";

const { FlatESLint } = eslintApi;

const root = fileURLToPath(new URL("../", import.meta.url));
const baselinePath = path.join(root, "scripts/lint-baseline.json");
const mode = process.argv[2];
if (process.argv.length > 3 || (mode && mode !== "--update" && mode !== "--seed")) {
  throw new Error("Usage: node scripts/check-lint.mjs [--update|--seed]");
}
const eslint = new FlatESLint({ cwd: root });
const results = await eslint.lintFiles(["."]);
const { counts, blockers } = summarizeResults(results, root);
let baseline;
try {
  baseline = JSON.parse(await readFile(baselinePath, "utf8")).files;
  if (mode === "--seed") throw new Error("Baseline already exists. --update only reduces debt; review baseline changes explicitly.");
} catch (error) {
  if (error.code !== "ENOENT" || mode !== "--seed") throw error;
  baseline = counts;
}
const regressions = compareDebt(counts, baseline);
if (blockers.length || regressions.length) {
  const formatter = await eslint.loadFormatter("stylish");
  const failingFiles = new Set([...blockers.map(({ file }) => file), ...regressions.map(({ file }) => file)]);
  process.stderr.write(formatter.format(results.filter(({ filePath }) => failingFiles.has(path.relative(root, filePath).split(path.sep).join("/")))));
  for (const { file, rule, count, allowed } of regressions) {
    process.stderr.write(`${file}: ${rule}: ${count} findings exceeds baseline ${allowed}\n`);
  }
  process.stderr.write(`Lint failed: ${blockers.length} unbaselinable findings and ${regressions.length} increased file/rule counts.\n`);
  process.exitCode = 1;
} else {
  if (mode) {
    const files = Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([file, rules]) => [file, Object.fromEntries(Object.entries(rules).sort(([a], [b]) => a.localeCompare(b)))]));
    await writeFile(baselinePath, `${JSON.stringify({ version: 1, files }, null, 2)}\n`);
  }
  const total = Object.values(counts).reduce((sum, rules) => sum + Object.values(rules).reduce((a, b) => a + b, 0), 0);
  process.stdout.write(`Lint ratchet passed: ${total} existing findings in ${Object.keys(counts).length} files; no new debt.\n`);
}
