import assert from 'node:assert/strict';
import { request } from 'node:http';

const baseUrl = new URL(process.argv[2] || 'http://127.0.0.1:8080');
const response = await fetch(new URL('/api/v1/smoke/proxy', baseUrl), {
  headers: { Cookie: 'smoke=task-owned' }, redirect: 'manual', signal: AbortSignal.timeout(5000),
});
assert.equal(response.status, 200, 'API requests must reach the upstream without an SPA fallback');
assert.deepEqual(await response.json(), { proto: 'https', cookie: 'smoke=task-owned' });

await new Promise((resolve, reject) => {
  const probe = request(new URL('/api/v1/smoke/project/ws', baseUrl), {
    // RFC 6455 example nonce, encoded as the protocol requires.
    headers: { Upgrade: 'websocket', Connection: 'Upgrade', 'Sec-WebSocket-Key': Buffer.from('the sample nonce').toString('base64'), 'Sec-WebSocket-Version': '13' },
  });
  probe.setTimeout(5000, () => probe.destroy(new Error('WebSocket proxy probe timed out')));
  probe.on('error', reject);
  probe.on('response', result => {
    result.resume();
    reject(new Error(`WebSocket proxy returned HTTP ${result.statusCode}; expected 101`));
  });
  probe.on('upgrade', (result, socket) => {
    try {
      assert.equal(result.statusCode, 101);
      assert.equal(result.headers['sec-websocket-accept'], 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
      resolve();
    } catch (error) { reject(error); }
    finally { socket.destroy(); }
  });
  probe.end();
});
console.log('API path/cookie/forwarded-proto and WebSocket upgrade proxy checks passed.');
