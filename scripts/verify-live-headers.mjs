#!/usr/bin/env node

const rawTarget = process.argv[2];
if (!rawTarget) {
  console.error("Usage: node scripts/verify-live-headers.mjs <https://deployment-url>");
  process.exit(1);
}

const baseUrl = new URL(rawTarget);
const failures = [];

const checkHeader = (headers, name, pattern, label) => {
  const value = headers.get(name);
  if (!value || !pattern.test(value)) {
    failures.push(`${label}: expected ${name} matching ${pattern}, got ${JSON.stringify(value)}`);
  }
};

const loginUrl = new URL("/login", baseUrl);
const loginRes = await fetch(loginUrl, { redirect: "manual" });
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

const csp =
  loginRes.headers.get("content-security-policy") ??
  loginRes.headers.get("content-security-policy-report-only");
if (!csp || !/frame-ancestors 'none'/i.test(csp)) {
  failures.push(`/login: missing CSP or CSP-Report-Only with frame-ancestors 'none'`);
}

const robotsRes = await fetch(new URL("/robots.txt", baseUrl), { redirect: "manual" });
const robotsBody = await robotsRes.text();
if (!robotsRes.ok || !/Disallow:\s*\//i.test(robotsBody) || /<html/i.test(robotsBody)) {
  failures.push(`/robots.txt: expected plain robots policy with Disallow: /, got HTTP ${robotsRes.status}`);
}

const assetMatch = html.match(/src="(\/assets\/[^" ]+\.js)"/);
if (!assetMatch) {
  failures.push(`/login HTML did not reference a hashed /assets/*.js entry script`);
} else {
  const assetRes = await fetch(new URL(assetMatch[1], baseUrl), { method: "HEAD" });
  if (!assetRes.ok) {
    failures.push(`${assetMatch[1]} returned HTTP ${assetRes.status}`);
  }
  checkHeader(assetRes.headers, "cache-control", /max-age=31536000.*immutable/i, assetMatch[1]);
  checkHeader(assetRes.headers, "x-frame-options", /^DENY$/i, assetMatch[1]);
}

const cspRes = await fetch(new URL("/csp-report", baseUrl), {
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

if (failures.length > 0) {
  console.error(`Live header verification FAILED for ${baseUrl.origin}:`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`Live header verification PASSED for ${baseUrl.origin}:`);
console.log("  - Security headers (XFO, X-Robots-Tag, XCTO, Referrer-Policy, Permissions-Policy, HSTS, CSP)");
console.log("  - /robots.txt serves Disallow: / (not SPA HTML)");
console.log(`  - ${assetMatch[1]} serves immutable 1-year Cache-Control`);
console.log("  - POST /csp-report returns 204");
