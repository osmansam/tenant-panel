export const PERFORMANCE_ROUTES = ['login', 'projects', 'collections', 'pages'];

export function validateInteractionReport(report, route) {
  if (report?.runtimeError) throw new Error(`${route}: Lighthouse interaction failed`);
  if (!report?.finalDisplayedUrl || new URL(report.finalDisplayedUrl).pathname !== `/${route}`) {
    throw new Error(`Unexpected redirect while measuring ${route} interaction`);
  }
  const inp = report.audits?.['interaction-to-next-paint'];
  if (inp?.scoreDisplayMode !== 'numeric' || !Number.isFinite(inp.numericValue) || inp.numericValue < 0) {
    throw new Error(`${route}: INP was not measured`);
  }
  if (inp.numericValue >= 200) throw new Error(`${route}: INP ${inp.numericValue}ms exceeds the <200ms budget`);
  return inp.numericValue;
}

export function validateNavigationReports(reports) {
  const measurements = new Map(PERFORMANCE_ROUTES.map(route => [`/${route}`, []]));
  for (const report of reports) {
    if (report.runtimeError) throw new Error('Lighthouse navigation failed');
    const requested = new URL(report.requestedUrl);
    const displayed = new URL(report.finalDisplayedUrl);
    if (requested.href !== displayed.href) throw new Error(`Unexpected redirect while measuring ${requested.pathname}`);
    if (measurements.has(requested.pathname)) measurements.get(requested.pathname).push(report);
  }
  const missing = [...measurements].filter(([, runs]) => runs.length === 0).map(([route]) => route);
  if (missing.length) throw new Error(`Missing navigation reports: ${missing.join(', ')}`);
  for (const [route, runs] of measurements) {
    if (runs.length < 3) throw new Error(`Need three navigation measurements for ${route}`);
    for (const [metric, budget] of [['largest-contentful-paint', 2500], ['cumulative-layout-shift', 0.1]]) {
      const values = runs.map(report => {
        const audit = report.audits?.[metric];
        if (audit?.scoreDisplayMode !== 'numeric' || !Number.isFinite(audit.numericValue) || audit.numericValue < 0) {
          throw new Error(`${route}: ${metric} was not measured`);
        }
        return audit.numericValue;
      }).sort((a, b) => a - b);
      const middle = Math.floor(values.length / 2);
      const median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
      if (median >= budget) throw new Error(`${route}: ${metric} median ${median} exceeds the <${budget} budget`);
    }
  }
}
