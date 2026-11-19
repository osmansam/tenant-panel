#!/usr/bin/env node

const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const sanitizeOutput = value => bypassSecret ? String(value).replaceAll(bypassSecret, "[redacted]") : String(value);
const log = value => console.log(sanitizeOutput(value));
const reportError = value => console.error(sanitizeOutput(value));
const rawTarget = process.argv[2];
if (!rawTarget) {
  reportError("Usage: node scripts/verify-live-headers.mjs <https://deployment-url>");
  process.exit(1);
}

const baseUrl = new URL(rawTarget);
const failures = [];
if (baseUrl.protocol !== "https:" && !(baseUrl.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(baseUrl.hostname))) {
  reportError("Use HTTPS for deployments; HTTP is allowed only for a loopback smoke test.");
  process.exit(1);
}
const request = (url, options = {}) => {
  const headers = new Headers(options.headers);
  if (bypassSecret && url.origin === baseUrl.origin) headers.set("x-vercel-protection-bypass", bypassSecret);
  return fetch(url, { ...options, headers, redirect: "manual", signal: AbortSignal.timeout(10_000) });
};

const checkHeader = (headers, name, pattern, label) => {
  const value = headers.get(name);
  if (!value || !pattern.test(value)) {
    failures.push(`${label}: expected ${name} matching ${pattern}, got ${JSON.stringify(value)}`);
  }
};

const loginUrl = new URL("/login", baseUrl);
const loginRes = await request(loginUrl);
if (!loginRes.ok) {
  failures.push(`/login returned HTTP ${loginRes.status}`);
}
const html = await loginRes.text();

checkHeader(loginRes.headers, "x-frame-options", /^DENY$/i, "/login");
checkHeader(loginRes.headers, "x-robots-tag", /noindex.*nofollow/i, "/login");
checkHeader(loginRes.headers, "x-content-type-options", /^nosniff$/i, "/login");
checkHeader(loginRes.headers, "referrer-policy", /^no-referrer$/i, "/login");
checkHeader(loginRes.headers, "permissions-policy", /camera=\(\)/i, "/login");
checkHeader(loginRes.headers, "strict-transport-security", /max-age=\d+/i, "/login");
const htmlCachePolicy = loginRes.headers.get("cache-control");
const cacheDirectives = (htmlCachePolicy ?? "").toLowerCase().split(",").map(value => value.trim());
const cacheAges = cacheDirectives.filter(value => /^(?:max-age|s-maxage)\s*=/.test(value));
const hasCacheConflict = cacheDirectives.includes("immutable") || cacheAges.some(value => !/^(?:max-age|s-maxage)\s*=\s*(?:0+|"0+")$/.test(value));
const revalidatesHtml = cacheDirectives.includes("no-cache") || cacheDirectives.includes("no-store")
  || (cacheDirectives.includes("must-revalidate") && cacheAges.some(value => /^max-age\s*=\s*(?:0+|"0+")$/.test(value)));
if (!revalidatesHtml || hasCacheConflict) {
  failures.push(`/login: expected cache-control requiring revalidation or no storage without positive cache lifetimes or immutable, got ${JSON.stringify(htmlCachePolicy)}`);
}

const csp = loginRes.headers.get("content-security-policy-report-only");
if (!csp || !/frame-ancestors 'none'/i.test(csp)) {
  failures.push(`/login: missing CSP-Report-Only with frame-ancestors 'none'`);
}
if (!csp || !/(?:^|;)\s*report-uri\s+\/csp-report\s*(?:;|$)/i.test(csp)) {
  failures.push(`/login: CSP-Report-Only must include report-uri /csp-report`);
}
if (loginRes.headers.has("content-security-policy")) {
  failures.push(`/login: enforcing Content-Security-Policy is premature; retain report-only until observation is reviewed`);
}

const robotsRes = await request(new URL("/robots.txt", baseUrl));
const robotsBody = await robotsRes.text();
if (!robotsRes.ok || !/^\s*Disallow:[\t ]*\/[\t ]*\r?$/im.test(robotsBody) || /<html/i.test(robotsBody)) {
  failures.push(`/robots.txt: expected plain robots policy with Disallow: /, got HTTP ${robotsRes.status}`);
}

const assetMatch = html.match(/src="(\/assets\/[^" ]+\.js)"/);
if (!assetMatch) {
  failures.push(`/login HTML did not reference a hashed /assets/*.js entry script`);
} else {
  const assetRes = await request(new URL(assetMatch[1], baseUrl), { method: "HEAD" });
  if (!assetRes.ok) {
    failures.push(`${assetMatch[1]} returned HTTP ${assetRes.status}`);
  }
  checkHeader(assetRes.headers, "cache-control", /max-age=31536000.*immutable/i, assetMatch[1]);
  checkHeader(assetRes.headers, "x-frame-options", /^DENY$/i, assetMatch[1]);
}

const cspRes = await request(new URL("/csp-report", baseUrl), {
  method: "POST",
  headers: { "Content-Type": "application/csp-report" },
  body: JSON.stringify({
    "csp-report": {
      "effective-directive": "script-src",
      disposition: "report",
      "status-code": 200,
    },
  }),
});
if (cspRes.status !== 204) {
  failures.push(`POST /csp-report returned HTTP ${cspRes.status}, expected 204`);
}
checkHeader(cspRes.headers, "cache-control", /(?:^|,)\s*no-store\s*(?:,|$)/i, "/csp-report");

if (failures.length > 0) {
  reportError(`Live header verification FAILED for ${baseUrl.origin}:`);
  for (const failure of failures) {
    reportError(`  - ${failure}`);
  }
  process.exit(1);
}

log(`Live header verification PASSED for ${baseUrl.origin}:`);
log("  - Security headers and report-only CSP with /csp-report collection");
log("  - /login HTML requires cache revalidation or no storage");
log("  - /robots.txt serves Disallow: / (not SPA HTML)");
log(`  - ${assetMatch[1]} serves immutable 1-year Cache-Control`);
log("  - POST /csp-report returns 204 with no-store");
