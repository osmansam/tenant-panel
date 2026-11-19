import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const securityHeaders = {
  'x-frame-options': 'DENY',
  'x-robots-tag': 'noindex, nofollow',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'strict-transport-security': 'max-age=31536000',
  'content-security-policy-report-only': "default-src 'self'; frame-ancestors 'none'; report-uri /csp-report",
};

test('Vercel HTML cache rules cover direct SPA links while preserving asset and API policies', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const cachePolicies = pathname => config.headers.flatMap(rule => new RegExp(`^${rule.source}$`).test(pathname)
    ? rule.headers.filter(header => header.key.toLowerCase() === 'cache-control').map(header => header.value)
    : []);
  for (const pathname of ['/', '/index.html', '/login', '/invitation/accept', '/tenant/project/settings']) {
    assert.deepEqual(cachePolicies(pathname), ['no-cache'], pathname);
  }
  assert.deepEqual(cachePolicies('/assets/index-a1b2c3.js'), ['public, max-age=31536000, immutable']);
  for (const pathname of ['/api', '/api/csp-report', '/api/v1/session', '/csp-report']) {
    assert.deepEqual(cachePolicies(pathname), [], pathname);
  }
});

async function verify(t, change = () => {}, environment = {}) {
  const server = createServer((request, response) => {
    const headers = { ...securityHeaders };
    let status = 200;
    let body = '';
    if (request.url === '/login') {
      headers['cache-control'] = 'no-cache';
      body = '<html><script type="module" src="/assets/index-a1b2c3.js"></script></html>';
    } else if (request.url.startsWith('/assets/')) {
      headers['cache-control'] = 'public, max-age=31536000, immutable';
    } else if (request.url === '/robots.txt') {
      headers['content-type'] = 'text/plain';
      body = 'User-agent: *\nDisallow: /\n';
    } else if (request.url === '/csp-report') {
      status = 204;
      headers['cache-control'] = 'no-store';
    } else {
      status = 404;
    }
    const reply = { headers, status, body };
    change(request, reply);
    response.writeHead(reply.status, reply.headers).end(reply.body);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const target = `http://127.0.0.1:${server.address().port}`;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/verify-live-headers.mjs', target], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, VERCEL_AUTOMATION_BYPASS_SECRET: '', ...environment } });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.on('error', reject);
    child.on('close', code => resolve({ code, output }));
  });
}

test('accepts actual report-only hosting responses with bounded collector caching', async t => {
  const result = await verify(t);
  assert.equal(result.code, 0, result.output);
});

test('rejects HTML that can be cached after deployment', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/login') delete reply.headers['cache-control'];
  });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /cache-control/i);
});

test('accepts equivalent hosting policies that revalidate HTML on every request', async t => {
  for (const policy of ['public, max-age=0, must-revalidate', 'max-age=0, s-maxage=0, must-revalidate', 'no-store']) {
    const result = await verify(t, (request, reply) => {
      if (request.url === '/login') reply.headers['cache-control'] = policy;
    });
    assert.equal(result.code, 0, `${policy}: ${result.output}`);
  }
});

test('rejects HTML policies with fresh cache lifetimes or immutable conflicts', async t => {
  for (const policy of [
    'public, max-age=60, must-revalidate',
    'public, max-age=0, s-maxage=60, must-revalidate',
    'public, max-age=0, must-revalidate, immutable',
    'public, max-age=0',
    'no-cache, max-age=60',
    'no-store, s-maxage=60',
    'no-cache, immutable',
  ]) {
    const result = await verify(t, (request, reply) => {
      if (request.url === '/login') reply.headers['cache-control'] = policy;
    });
    assert.equal(result.code, 1, `${policy}: ${result.output}`);
    assert.match(result.output, /cache-control/i);
  }
});

test('rejects prematurely enforced CSP and missing report collection', async t => {
  for (const enforce of [false, true]) {
    const result = await verify(t, (request, reply) => {
      if (request.url !== '/login') return;
      if (enforce) {
        reply.headers['content-security-policy'] = reply.headers['content-security-policy-report-only'];
        delete reply.headers['content-security-policy-report-only'];
      } else {
        reply.headers['content-security-policy-report-only'] = "frame-ancestors 'none'";
      }
    });
    assert.equal(result.code, 1, result.output);
    assert.match(result.output, /CSP|content-security-policy|report-uri/i);
  }
});

test('rejects redirected assets instead of checking the redirect destination', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/assets/index-a1b2c3.js') {
      reply.status = 302;
      reply.headers.location = '/assets/other.js';
    }
  });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /302/);
});

test('requires robots to disallow the entire site', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/robots.txt') reply.body = 'User-agent: *\nDisallow: /private\n';
  });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /robots/);
});

test('requires collector responses to be non-cacheable', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/csp-report') delete reply.headers['cache-control'];
  });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /no-store|cache-control/i);
});

test('sends the optional protection bypass to every same-origin check without logging it', async t => {
  const requested = new Set();
  const result = await verify(t, (request, reply) => {
    if (request.headers['x-vercel-protection-bypass'] !== 'fixture-only-bypass-value') {
      reply.status = 401;
    } else {
      requested.add(request.url);
    }
  }, { VERCEL_AUTOMATION_BYPASS_SECRET: 'fixture-only-bypass-value' });
  assert.equal(result.code, 0, result.output);
  assert.deepEqual([...requested].sort(), ['/assets/index-a1b2c3.js', '/csp-report', '/login', '/robots.txt']);
  assert.doesNotMatch(result.output, /fixture-only-bypass-value/);
});

test('redacts the bypass value if a failing response reflects it in a checked header', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/login') reply.headers['x-frame-options'] = 'fixture-only-bypass-value';
  }, { VERCEL_AUTOMATION_BYPASS_SECRET: 'fixture-only-bypass-value' });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /\[redacted\]/);
  assert.doesNotMatch(result.output, /fixture-only-bypass-value/);
});

test('redacts the bypass value if successful HTML reflects it in the entry asset path', async t => {
  const result = await verify(t, (request, reply) => {
    if (request.url === '/login') reply.body = '<html><script type="module" src="/assets/fixture-only-bypass-value.js"></script></html>';
  }, { VERCEL_AUTOMATION_BYPASS_SECRET: 'fixture-only-bypass-value' });
  assert.equal(result.code, 0, result.output);
  assert.match(result.output, /\/assets\/\[redacted\]\.js/);
  assert.doesNotMatch(result.output, /fixture-only-bypass-value/);
});
