import assert from "node:assert/strict";
import test from "node:test";
import { coverageFailures, coveragePercentages, ratchetBaseline } from "./coverage-ratchet.mjs";

const metrics = { lines: 40, statements: 39, functions: 30, branches: 35 };
const baseline = { version: 1, measuredAt: "2026-11-19", reviewedMonth: "2026-11", initial: metrics, thresholds: { lines: 42, statements: 41, functions: 32, branches: 37 }, monthlyIncrease: 2 };
const summary = percentages => ({ total: Object.fromEntries(Object.entries(percentages).map(([key, pct]) => [key, { total: 10000, covered: pct * 100, pct }])) });

test("checks every metric without rounding a shortfall into a pass", () => {
  const failures = coverageFailures(summary({ lines: 41.999, statements: 41, functions: 32, branches: 37 }), baseline, "2026-11-30");
  assert.equal(failures.length, 1);
  assert.match(failures[0], /lines.*42/);
});

test("requires complete valid coverage measurements", () => {
  assert.throws(() => coveragePercentages({ total: { lines: { pct: 100 } } }), /coverage/);
  assert.throws(() => coveragePercentages(summary({ ...metrics, lines: NaN })), /coverage/);
});

test("requires a monthly reviewed ratchet, including across year boundaries", () => {
  assert.deepEqual(coverageFailures(summary(baseline.thresholds), baseline, "2026-11-30"), []);
  assert.match(coverageFailures(summary(baseline.thresholds), baseline, "2026-12-01")[0], /monthly review/);
  assert.match(coverageFailures(summary(baseline.thresholds), baseline, "2027-01-01")[0], /monthly review/);
});

test("monthly review raises each floor by two points only after tests meet it", () => {
  assert.throws(() => ratchetBaseline(summary(baseline.thresholds), baseline, "2026-12-01"), /lines/);
  const next = ratchetBaseline(summary({ lines: 46, statements: 44, functions: 35, branches: 40 }), baseline, "2026-12-01");
  assert.deepEqual(next.thresholds, { lines: 44, statements: 43, functions: 34, branches: 39 });
  assert.equal(next.reviewedMonth, "2026-12");
  assert.deepEqual(next.initial, metrics);
});

test("cannot repeatedly ratchet in one month and caps targets at 100", () => {
  assert.throws(() => ratchetBaseline(summary(baseline.thresholds), baseline, "2026-11-20"), /already reviewed/);
  const nearComplete = { ...baseline, thresholds: { lines: 99, statements: 99, functions: 99, branches: 99 } };
  assert.deepEqual(ratchetBaseline(summary({ lines: 100, statements: 100, functions: 100, branches: 100 }), nearComplete, "2026-12-01").thresholds, { lines: 100, statements: 100, functions: 100, branches: 100 });
});
