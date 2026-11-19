import assert from 'node:assert/strict';
import test from 'node:test';
import { validateInteractionReport, validateNavigationReports } from './performance-results.mjs';

const report = route => ({ requestedUrl: `http://127.0.0.1:4173/${route}`, finalDisplayedUrl: `http://127.0.0.1:4173/${route}`, audits: {
  'largest-contentful-paint': { scoreDisplayMode: 'numeric', numericValue: 1200 },
  'cumulative-layout-shift': { scoreDisplayMode: 'numeric', numericValue: 0.02 },
} });
const navigationReports = () => ['login', 'projects', 'collections', 'pages'].flatMap(route => [report(route), report(route), report(route)]);
test('requires three measured navigations per requested route', () => {
  assert.throws(() => validateNavigationReports([report('login')]), /Missing.*projects/);
  assert.throws(() => validateNavigationReports(navigationReports().slice(1)), /three navigation measurements for \/login/);
  assert.doesNotThrow(() => validateNavigationReports(['login', 'projects', 'collections', 'pages'].flatMap(route => [report(route), report(route), report(route)])));
});
test('rejects protected routes accidentally measured as login redirects', () => {
  assert.throws(() => validateNavigationReports([{ ...report('projects'), finalDisplayedUrl: 'http://127.0.0.1:4173/login' }]), /redirect/);
});
test('rejects Lighthouse runtime failures', () => {
  assert.throws(() => validateNavigationReports([{ ...report('login'), runtimeError: { code: 'NO_LCP' } }]), /failed/);
});
test('rejects missing or inapplicable navigation metrics rather than treating them as passing budgets', () => {
  for (const invalid of [undefined, { scoreDisplayMode: 'notApplicable' }, { scoreDisplayMode: 'error' }, { scoreDisplayMode: 'numeric', numericValue: NaN }]) {
    const reports = navigationReports();
    reports[0].audits['largest-contentful-paint'] = invalid;
    assert.throws(() => validateNavigationReports(reports), /largest-contentful-paint.*not measured/);
  }
});
test('requires navigation medians strictly below both budgets', () => {
  for (const [metric, value] of [['largest-contentful-paint', 2500], ['cumulative-layout-shift', 0.1]]) {
    const reports = navigationReports();
    reports[0].audits[metric].numericValue = value;
    reports[1].audits[metric].numericValue = value;
    assert.throws(() => validateNavigationReports(reports), /budget/);
  }
});
test('preserves median aggregation across measured navigation runs', () => {
  const reports = navigationReports();
  reports[0].audits['largest-contentful-paint'].numericValue = 5000;
  assert.doesNotThrow(() => validateNavigationReports(reports));
});
const interactionReport = () => ({ finalDisplayedUrl: 'http://127.0.0.1:4173/projects', audits: {
  'interaction-to-next-paint': { scoreDisplayMode: 'numeric', numericValue: 50 },
} });
test('interaction gate rejects absent, inapplicable and failed INP measurements', () => {
  for (const invalid of [undefined, { scoreDisplayMode: 'notApplicable' }, { scoreDisplayMode: 'error' }, { scoreDisplayMode: 'numeric', numericValue: NaN }]) {
    const report = interactionReport();
    report.audits['interaction-to-next-paint'] = invalid;
    assert.throws(() => validateInteractionReport(report, 'projects'), /INP was not measured/);
  }
});
test('interaction gate accepts measured INP and rejects the 200ms boundary', () => {
  assert.equal(validateInteractionReport(interactionReport(), 'projects'), 50);
  const report = interactionReport();
  report.audits['interaction-to-next-paint'].numericValue = 200;
  assert.throws(() => validateInteractionReport(report, 'projects'), /<200ms budget/);
});
test('interaction gate rejects runtime failures and a redirect during the measured interaction', () => {
  assert.throws(() => validateInteractionReport({ ...interactionReport(), runtimeError: { code: 'NO_TRACE' } }, 'projects'), /failed/);
  assert.throws(() => validateInteractionReport({ ...interactionReport(), finalDisplayedUrl: 'http://127.0.0.1:4173/login' }, 'projects'), /redirect/);
});
