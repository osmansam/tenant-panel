import { readFile, writeFile } from "node:fs/promises";
import { coverageFailures, coveragePercentages, ratchetBaseline } from "./coverage-ratchet.mjs";

const baselinePath = new URL("./coverage-baseline.json", import.meta.url);
const summaryPath = new URL("../coverage/coverage-summary.json", import.meta.url);
const mode = process.argv[2];
if (process.argv.length > 3 || (mode && mode !== "--ratchet")) throw new Error("Usage: node scripts/check-coverage.mjs [--ratchet]");
const summary = JSON.parse(await readFile(summaryPath, "utf8"));
let baseline = JSON.parse(await readFile(baselinePath, "utf8"));
if (mode === "--ratchet") {
  baseline = ratchetBaseline(summary, baseline);
  await writeFile(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
}
const failures = coverageFailures(summary, baseline);
if (failures.length) {
  process.stderr.write(`Coverage gate failed:\n${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Coverage gate passed: ${Object.entries(coveragePercentages(summary)).map(([metric, value]) => `${metric} ${value.toFixed(2)}% (floor ${baseline.thresholds[metric]}%)`).join(", ")}. Monthly review: ${baseline.reviewedMonth}.\n`);
}
