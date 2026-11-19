import assert from 'node:assert/strict';
import test from 'node:test';
import { validateNavigationReports } from './performance-results.mjs';

const report = route => ({ requestedUrl: `http://127.0.0.1:4173/${route}`, finalDisplayedUrl: `http://127.0.0.1:4173/${route}` });
test('requires three measured navigations per requested route', () => {
  assert.throws(() => validateNavigationReports([report('login')]), /Missing.*projects/);
  assert.doesNotThrow(() => validateNavigationReports(['login', 'projects', 'collections', 'pages'].flatMap(route => [report(route), report(route), report(route)])));
});
test('rejects protected routes accidentally measured as login redirects', () => {
  assert.throws(() => validateNavigationReports([{ ...report('projects'), finalDisplayedUrl: 'http://127.0.0.1:4173/login' }]), /redirect/);
});
test('rejects Lighthouse runtime failures', () => {
  assert.throws(() => validateNavigationReports([{ ...report('login'), runtimeError: { code: 'NO_LCP' } }]), /failed/);
});
