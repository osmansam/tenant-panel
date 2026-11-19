import { stdout } from 'node:process';

const MAX_BYTES = 16 * 1024;
const MAX_REPORTS = 20;
const MAX_REQUESTS_PER_MINUTE = 120;
const DIRECTIVES = new Set(['default-src', 'base-uri', 'child-src', 'connect-src', 'font-src', 'form-action', 'frame-ancestors', 'frame-src', 'img-src', 'manifest-src', 'media-src', 'object-src', 'script-src', 'script-src-elem', 'script-src-attr', 'style-src', 'style-src-elem', 'style-src-attr', 'worker-src', 'navigate-to', 'require-trusted-types-for', 'trusted-types', 'upgrade-insecure-requests', 'block-all-mixed-content']);
const MEDIA_TYPES = new Set(['application/csp-report', 'application/reports+json', 'application/json']);
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

async function readBody(request) {
  if (Number(request.headers['content-length']) > MAX_BYTES) throw 413;
  if (request.body !== undefined) {
    const body = request.body;
    const raw = Buffer.isBuffer(body) ? body : typeof body === 'string' ? body : JSON.stringify(body);
    if (Buffer.byteLength(raw) > MAX_BYTES) throw 413;
    return !Buffer.isBuffer(body) && (isRecord(body) || Array.isArray(body)) ? body : JSON.parse(raw.toString());
  }
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bytes += buffer.length;
    if (bytes > MAX_BYTES) { request.resume(); throw 413; }
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function summarize(payload) {
  let reports;
  if (Array.isArray(payload)) {
    if (payload.length > MAX_REPORTS) throw 413;
    if (!payload.length || payload.some(report => !isRecord(report) || report.type !== 'csp-violation' || !isRecord(report.body))) throw 400;
    reports = payload.map(report => report.body);
  } else if (isRecord(payload) && isRecord(payload['csp-report'])) {
    reports = [payload['csp-report']];
  } else {
    throw 400;
  }
  const counts = new Map();
  for (const report of reports) {
    const candidate = report.effectiveDirective ?? report['effective-directive'] ?? report['violated-directive'];
    const directive = DIRECTIVES.has(candidate) ? candidate : 'unknown';
    const disposition = ['report', 'enforce'].includes(report.disposition) ? report.disposition : 'unknown';
    const code = report.statusCode ?? report['status-code'];
    const status = Number.isInteger(code) && code >= 0 && code <= 599 ? code : 0;
    const key = `${directive}:${disposition}:${status}`;
    const previous = counts.get(key);
    counts.set(key, { directive, disposition, status, count: (previous?.count ?? 0) + 1 });
  }
  return counts.values();
}

// One bounded global bucket per instance; never retain addresses, URLs, samples,
// report bodies, cookies or request metadata. Logs contain these four fields only.
export function createCspReportHandler({ log = value => stdout.write(`${JSON.stringify(value)}\n`), now = Date.now } = {}) {
  let windowStart = now();
  let requests = 0;
  return async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    const finish = status => { response.statusCode = status; response.end(); };
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return finish(405);
    }
    const mediaType = String(request.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
    if (!MEDIA_TYPES.has(mediaType)) return finish(415);
    const current = now();
    if (current - windowStart >= 60_000) { windowStart = current; requests = 0; }
    if (++requests > MAX_REQUESTS_PER_MINUTE) {
      response.setHeader('Retry-After', String(Math.max(1, Math.ceil((60_000 - current + windowStart) / 1000))));
      return finish(429);
    }
    try {
      const summaries = summarize(await readBody(request));
      for (const summary of summaries) log(summary);
      return finish(204);
    } catch (error) {
      // Never log parsing errors: they can contain user-supplied report content.
      return finish(error === 413 ? 413 : 400);
    }
  };
}
