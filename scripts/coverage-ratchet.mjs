export const COVERAGE_METRICS = ["lines", "statements", "functions", "branches"];

export function coveragePercentages(summary) {
  return Object.fromEntries(COVERAGE_METRICS.map(metric => {
    const entry = summary?.total?.[metric];
    if (!entry || !Number.isFinite(entry.total) || entry.total <= 0 || !Number.isFinite(entry.covered) || entry.covered < 0 || entry.covered > entry.total) {
      throw new Error(`Missing or invalid ${metric} coverage measurement`);
    }
    return [metric, entry.covered / entry.total * 100];
  }));
}

function validateBaseline(baseline) {
  if (baseline?.version !== 1 || !/^\d{4}-\d{2}$/.test(baseline.reviewedMonth) || baseline.monthlyIncrease !== 2) throw new Error("Invalid coverage baseline");
  for (const metric of COVERAGE_METRICS) {
    if (!Number.isFinite(baseline.thresholds?.[metric]) || baseline.thresholds[metric] < 0 || baseline.thresholds[metric] > 100) throw new Error(`Invalid ${metric} coverage threshold`);
  }
}

export function coverageFailures(summary, baseline, date = new Date().toISOString().slice(0, 10)) {
  validateBaseline(baseline);
  const actual = coveragePercentages(summary);
  const failures = [];
  if (date.slice(0, 7) > baseline.reviewedMonth) failures.push(`Coverage monthly review overdue (last reviewed ${baseline.reviewedMonth}); add tests and run yarn coverage:ratchet.`);
  for (const metric of COVERAGE_METRICS) {
    if (actual[metric] < baseline.thresholds[metric]) failures.push(`${metric}: ${actual[metric].toFixed(4)}% is below ${baseline.thresholds[metric]}%`);
  }
  return failures;
}

export function ratchetBaseline(summary, baseline, date = new Date().toISOString().slice(0, 10)) {
  validateBaseline(baseline);
  const month = date.slice(0, 7);
  if (month <= baseline.reviewedMonth) throw new Error(`Coverage already reviewed for ${baseline.reviewedMonth}`);
  const thresholds = Object.fromEntries(COVERAGE_METRICS.map(metric => [metric, Math.min(100, Math.round((baseline.thresholds[metric] + baseline.monthlyIncrease) * 100) / 100)]));
  const next = { ...baseline, reviewedMonth: month, thresholds };
  const failures = coverageFailures(summary, next, date);
  if (failures.length) throw new Error(`Cannot raise coverage floors:\n${failures.join("\n")}`);
  return next;
}
