import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import net from 'node:net';
import { chromium } from 'playwright-core';
import prepare from './lighthouse-auth.cjs';
import { validateNavigationReports } from './performance-results.mjs';

const require = createRequire(import.meta.url);
const lhciRequire = createRequire(require.resolve('@lhci/cli/package.json'));
const { startFlow } = await import(pathToFileURL(lhciRequire.resolve('lighthouse')).href);
const puppeteer = lhciRequire('puppeteer-core');
for (const port of [4173, 4174]) {
  await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(port, '127.0.0.1', () => probe.close(resolve));
  });
}
const stack = spawn(process.execPath, ['scripts/e2e-stack.mjs'], { stdio: 'inherit' });
let stackExited = false;
stack.once('exit', () => { stackExited = true; });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
function command(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`Performance command failed (${code})`)));
  });
}
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 360; attempt++) {
    if (stackExited) throw new Error('Disposable performance stack exited');
    try { ready = (await fetch('http://127.0.0.1:4173/login')).ok; } catch { /* Starting */ }
    if (ready) break;
    await pause(500);
  }
  if (!ready) throw new Error('Disposable performance stack did not start');
  await command([require.resolve('@lhci/cli/src/cli.js'), 'autorun', '--config=./lighthouserc.cjs']);
  const reports = await Promise.all((await readdir('.lighthouseci')).filter(name => name.startsWith('lhr-') && name.endsWith('.json')).map(async name => JSON.parse(await readFile(`.lighthouseci/${name}`, 'utf8'))));
  validateNavigationReports(reports);
  browser = await puppeteer.launch({ executablePath: chromium.executablePath(), headless: true, args: ['--no-sandbox'] });
  await mkdir('output/performance', { recursive: true });
  const failures = [];
  for (const route of ['login', 'projects', 'collections', 'pages']) {
    const url = `http://127.0.0.1:4173/${route}`;
    await prepare(browser, { url });
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      if (new URL(page.url()).pathname !== `/${route}`) throw new Error(`Unexpected redirect while measuring ${route}`);
      const flow = await startFlow(page, { name: `${route} interaction`, config: { extends: 'lighthouse:default', settings: { onlyCategories: ['performance'], throttlingMethod: 'provided', disableStorageReset: true } } });
      await flow.startTimespan({ stepName: `${route}: interact with primary route control` });
      if (route === 'login' || route === 'projects') {
        const selector = route === 'login' ? 'input[type="email"]' : 'input[type="search"]';
        await page.waitForSelector(selector);
        await page.click(selector);
        await page.type(selector, route === 'login' ? 'performance@example.test' : 'Smoke', { delay: 50 });
      } else {
        const searchSelector = 'input[type="search"]';
        const hasSearch = await page.$(searchSelector);
        if (hasSearch) {
          await page.click(searchSelector);
          await page.type(searchSelector, 'Smoke', { delay: 50 });
        } else {
          await page.waitForSelector('[data-primary-action="true"]');
          await page.click('[data-primary-action="true"]');
          const dialogInput = '[role="dialog"] input:not([type="hidden"]):not([type="checkbox"])';
          await page.waitForSelector(dialogInput);
          await page.click(dialogInput);
          await page.type(dialogInput, 'Smoke', { delay: 50 });
          await page.keyboard.press('Escape');
        }
      }
      await pause(500);
      await flow.endTimespan();
      const result = await flow.createFlowResult();
      await writeFile(`output/performance/${route}-interaction.json`, JSON.stringify(result));
      const inp = result.steps[0]?.lhr.audits['interaction-to-next-paint'];
      if (!inp || inp.notApplicable || !Number.isFinite(inp.numericValue)) failures.push(`${route}: INP was not measured`);
      else if (inp.numericValue >= 200) failures.push(`${route}: INP ${inp.numericValue}ms exceeds the <200ms budget`);
      else process.stdout.write(`${route}: measured interaction INP ${inp.numericValue}ms (<200ms).\n`);
    } finally { await page.close(); }
  }
  if (failures.length) throw new Error(failures.join('\n'));
} finally {
  await browser?.close();
  if (!stackExited) {
    stack.kill('SIGTERM');
    await Promise.race([new Promise(resolve => stack.once('exit', resolve)), pause(25_000).then(() => { if (!stackExited) stack.kill('SIGKILL'); })]);
  }
}
