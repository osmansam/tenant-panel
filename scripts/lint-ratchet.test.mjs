import assert from "node:assert/strict";
import test from "node:test";
import { compareDebt, summarizeResults } from "./lint-ratchet.mjs";

const result = (ruleId, count = 1, filePath = "/project/src/example.tsx") => ({
  filePath,
  messages: Array.from({ length: count }, () => ({ ruleId, severity: 2, message: "violation" })),
});

test("rejects an increased count in an existing file/rule bucket", () => {
  const { counts } = summarizeResults([result("no-console", 2)], "/project");
  assert.equal(compareDebt(counts, { "src/example.tsx": { "no-console": 1 } }).length, 1);
});

test("rejects a violation moved to a different file", () => {
  const { counts } = summarizeResults([result("no-console", 1, "/project/src/new.tsx")], "/project");
  assert.equal(compareDebt(counts, { "src/example.tsx": { "no-console": 1 } }).length, 1);
});

test("accepts reduced existing debt", () => {
  const { counts } = summarizeResults([result("no-console")], "/project");
  assert.deepEqual(compareDebt(counts, { "src/example.tsx": { "no-console": 2 } }), []);
});

test("hook violations and parser failures can never be baseline debt", () => {
  const { counts, blockers } = summarizeResults([result("react-hooks/rules-of-hooks"), result(null)], "/project");
  assert.deepEqual(counts, {});
  assert.equal(blockers.length, 2);
});

test("missing rule definitions cannot be accepted as legacy debt", () => {
  const result = { filePath: "/project/src/example.jsx", messages: [{ ruleId: "missing/rule", severity: 2, message: "Definition for rule 'missing/rule' was not found." }] };
  const { counts, blockers } = summarizeResults([result], "/project");
  assert.deepEqual(counts, {});
  assert.equal(blockers.length, 1);
});
