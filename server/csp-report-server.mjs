import { createServer } from 'node:http';
import { createCspReportHandler } from './csp-report.mjs';

const handler = createCspReportHandler();
const server = createServer((request, response) => {
  if (request.url !== '/csp-report') { response.writeHead(404).end(); return; }
  void handler(request, response);
});
server.requestTimeout = 5000;
server.headersTimeout = 5000;
server.maxRequestsPerSocket = 100;
server.listen(Number(process.env.PORT || 8081), '0.0.0.0');
