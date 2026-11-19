const { readFileSync } = require('node:fs');

// LHCI calls this before each route. Every run uses the disposable smoke API;
// assertions must never measure a redirect to the anonymous login screen.
module.exports = async (browser, { url }) => {
  const origin = 'http://127.0.0.1:4173';
  const page = await browser.newPage();
  try {
    const { key } = JSON.parse(readFileSync('output/playwright/fixture.json', 'utf8'));
    const reset = await fetch('http://127.0.0.1:4174/__e2e/reset', { method: 'POST', headers: { 'X-E2E-Key': key } });
    if (!reset.ok) throw new Error('Performance fixture reset failed');
    await page.goto(`${origin}/login`);
    await page.evaluate(() => { globalThis.localStorage.clear(); globalThis.sessionStorage.clear(); });
    const cookies = await page.cookies();
    if (cookies.length) await page.deleteCookie(...cookies);
    await page.reload({ waitUntil: 'networkidle0' });
    if (new URL(url).pathname === '/login') return;
    await page.type('input[type="email"]', 'owner@example.test');
    await page.type('input[type="password"]', 'Smoke-password-123!');
    await page.click('button[type="submit"]');
    await page.waitForFunction(() => globalThis.location.pathname !== '/login');
    await page.goto(`${origin}/projects`, { waitUntil: 'networkidle0' });
    if (new URL(url).pathname !== '/projects') {
      await page.waitForSelector('button[aria-label="Switch to Inventory"]');
      await page.click('button[aria-label="Switch to Inventory"]');
      await page.waitForFunction(() => globalThis.location.pathname === '/collections');
    }
  } finally { await page.close(); }
};
