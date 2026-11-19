import assert from 'node:assert/strict';
import test from 'node:test';
import { secretScanRange } from './secret-scan-range.mjs';

const before = 'a'.repeat(40);
const head = 'b'.repeat(40);
const base = 'c'.repeat(40);

test('PR scans include every commit since its base, including secrets removed at the tip', () => {
  assert.equal(secretScanRange('pull_request', { pull_request: { base: { sha: before }, head: { sha: head } } }), `${before}..${head}`);
});

test('push scans include all newly pushed commits', () => {
  assert.equal(secretScanRange('push', { before, after: head }), `${before}..${head}`);
});

test('new branches use the default branch merge-base and fall back to full reachable history', () => {
  const event = { before: '0'.repeat(40), after: head };
  assert.equal(secretScanRange('push', event, base), `${base}..${head}`);
  assert.equal(secretScanRange('push', event), head);
});

test('ignores branch deletions and manual runs that have no changed commit range', () => {
  assert.equal(secretScanRange('push', { deleted: true, before, after: '0'.repeat(40) }), null);
  assert.equal(secretScanRange('workflow_dispatch', {}), null);
});

test('rejects malformed or option-like revisions rather than passing them to git', () => {
  for (const invalid of [undefined, '', '--all', 'main', `${head};touch file`]) {
    assert.throws(() => secretScanRange('push', { before, after: invalid }), /commit SHA/);
    assert.throws(() => secretScanRange('pull_request', { pull_request: { base: { sha: invalid }, head: { sha: head } } }), /commit SHA/);
  }
});
