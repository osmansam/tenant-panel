import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import test from 'node:test';
import { createCspReportHandler } from './csp-report.mjs';

const legacy = { 'csp-report': { 'effective-directive': 'script-src-elem', disposition: 'report', 'status-code': 200, 'document-uri': 'https://private.example/secret?token=secret', 'blocked-uri': 'https://secret.example', 'script-sample': 'private content' } };
async function request(handler, body = legacy, overrides = {}) {
  const req = Readable.from([typeof body === 'string' ? body : JSON.stringify(body)]);
  Object.assign(req, { method: 'POST', headers: { 'content-type': 'application/csp-report' } }, overrides);
  const res = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, end() { this.ended = true; } };
  await handler(req, res);
  return res;
}

test('collects only approved aggregate fields, never payload URLs/content/IP', async () => {
  const logs = [];
  const res = await request(createCspReportHandler({ log: value => logs.push(value) }), legacy, { headers: { 'content-type': 'application/csp-report', 'x-forwarded-for': '192.0.2.1' } });
  assert.equal(res.statusCode, 204);
  assert.deepEqual(logs, [{ directive: 'script-src-elem', disposition: 'report', status: 200, count: 1 }]);
  assert.equal(res.headers['Cache-Control'], 'no-store');
});

test('aggregates a Reporting API batch and sanitizes attacker-controlled labels', async () => {
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value) });
  const body = [{ type: 'csp-violation', body: { effectiveDirective: 'img-src', disposition: 'report', statusCode: 200 } }, { type: 'csp-violation', body: { effectiveDirective: 'img-src', disposition: 'report', statusCode: 200 } }, { type: 'csp-violation', body: { effectiveDirective: 'https://private.example/secret', disposition: 'private content', statusCode: 'secret' } }];
  assert.equal((await request(handler, body, { headers: { 'content-type': 'application/reports+json; charset=utf-8' } })).statusCode, 204);
  assert.deepEqual(logs, [{ directive: 'img-src', disposition: 'report', status: 200, count: 2 }, { directive: 'unknown', disposition: 'unknown', status: 0, count: 1 }]);
});

test('rejects unsupported methods, media types, malformed JSON and invalid reports without logging', async () => {
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value) });
  assert.equal((await request(handler, legacy, { method: 'GET' })).statusCode, 405);
  assert.equal((await request(handler, legacy, { headers: { 'content-type': 'text/plain' } })).statusCode, 415);
  assert.equal((await request(handler, '{')).statusCode, 400);
  assert.equal((await request(handler, {})).statusCode, 400);
  assert.equal((await request(handler, [])).statusCode, 400);
  assert.equal((await request(handler, [{ type: 'other', body: {} }])).statusCode, 400);
  assert.deepEqual(logs, []);
});

test('bounds streamed body size, declared body size and report batch size', async () => {
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value) });
  assert.equal((await request(handler, 'x'.repeat(16385))).statusCode, 413);
  assert.equal((await request(handler, legacy, { headers: { 'content-type': 'application/json', 'content-length': '16385' } })).statusCode, 413);
  assert.equal((await request(handler, Array.from({ length: 21 }, () => ({ type: 'csp-violation', body: {} })))).statusCode, 413);
  assert.deepEqual(logs, []);
});

test('accepts bounded Vercel parsed bodies and rate-limits without retaining client identifiers', async () => {
  let time = 0;
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value), now: () => time });
  for (let index = 0; index < 120; index++) assert.equal((await request(handler, legacy, { body: legacy })).statusCode, 204);
  const limited = await request(handler);
  assert.equal(limited.statusCode, 429);
  assert.equal(limited.headers['Retry-After'], '60');
  time = 60_000;
  assert.equal((await request(handler)).statusCode, 204);
  assert.equal(logs.length, 121);
});

test('rejects oversized Vercel parsed payloads and malformed body getters', async () => {
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value) });
  assert.equal((await request(handler, legacy, { body: { 'csp-report': { 'script-sample': 'x'.repeat(16385) } } })).statusCode, 413);
  const req = Readable.from([]);
  req.method = 'POST'; req.headers = { 'content-type': 'application/json' };
  Object.defineProperty(req, 'body', { get() { throw new SyntaxError('private payload'); } });
  const res = { setHeader() {}, end() {} };
  await handler(req, res);
  assert.equal(res.statusCode, 400);
  assert.deepEqual(logs, []);
});

test('accepts Vercel raw Buffer bodies for CSP content types', async () => {
  const logs = [];
  const handler = createCspReportHandler({ log: value => logs.push(value) });
  assert.equal((await request(handler, legacy, { body: Buffer.from(JSON.stringify(legacy)) })).statusCode, 204);
  assert.deepEqual(logs, [{ directive: 'script-src-elem', disposition: 'report', status: 200, count: 1 }]);
});
