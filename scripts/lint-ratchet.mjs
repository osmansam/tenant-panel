import path from "node:path";

// Hook ordering is a runtime invariant, so it is never eligible for a baseline.
export function summarizeResults(results, root) {
  const counts = {};
  const blockers = [];
  for (const result of results) {
    const file = path.relative(root, result.filePath).split(path.sep).join("/");
    for (const message of result.messages) {
      if (!message.ruleId || message.fatal || message.ruleId === "react-hooks/rules-of-hooks"
        || message.message.startsWith("Definition for rule ")) {
        blockers.push({ file, ...message });
        continue;
      }
      counts[file] ??= {};
      counts[file][message.ruleId] = (counts[file][message.ruleId] ?? 0) + 1;
    }
  }
  return { counts, blockers };
}

export function compareDebt(counts, baseline) {
  const regressions = [];
  for (const [file, rules] of Object.entries(counts)) {
    for (const [rule, count] of Object.entries(rules)) {
      const allowed = baseline[file]?.[rule] ?? 0;
      if (count > allowed) regressions.push({ file, rule, count, allowed });
    }
  }
  return regressions;
}
