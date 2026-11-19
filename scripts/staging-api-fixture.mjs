// Task-owned CI upstream. It contains no application data or authentication.
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';

const server = createServer((request, response) => {
  if (request.url !== '/api/v1/smoke/proxy') return response.writeHead(404).end();
  response.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({
    proto: request.headers['x-forwarded-proto'],
    cookie: request.headers.cookie,
  }));
});
server.on('upgrade', (request, socket) => {
  const key = request.headers['sec-websocket-key'];
  if (request.url !== '/api/v1/smoke/project/ws' || request.headers.upgrade?.toLowerCase() !== 'websocket'
      || !request.headers.connection?.toLowerCase().split(/\s*,\s*/).includes('upgrade')
      || request.headers['sec-websocket-version'] !== '13' || !key) {
    socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
    return;
  }
  const accept = createHash('sha1').update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest('base64');
  socket.end(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`);
});
server.listen(4000, '0.0.0.0');
