export const PERFORMANCE_ROUTES = ['login', 'projects', 'collections', 'pages'];

export function validateNavigationReports(reports) {
  const counts = new Map(PERFORMANCE_ROUTES.map(route => [`/${route}`, 0]));
  for (const report of reports) {
    if (report.runtimeError) throw new Error('Lighthouse navigation failed');
    const requested = new URL(report.requestedUrl);
    const displayed = new URL(report.finalDisplayedUrl);
    if (requested.href !== displayed.href) throw new Error(`Unexpected redirect while measuring ${requested.pathname}`);
    if (counts.has(requested.pathname)) counts.set(requested.pathname, counts.get(requested.pathname) + 1);
  }
  const missing = [...counts].filter(([, count]) => count === 0).map(([route]) => route);
  if (missing.length) throw new Error(`Missing navigation reports: ${missing.join(', ')}`);
  for (const [route, count] of counts) if (count < 3) throw new Error(`Need three navigation measurements for ${route}`);
}
