import type { Event, ErrorEvent } from "@sentry/react";

function assetURL(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    // Only compiled asset locations survive. Authored paths, search and fragments do not.
    return /^\/assets\/[\w.-]+\.(js|css)$/.test(url.pathname) ? url.origin + url.pathname : undefined;
  } catch { return /^[\w./-]+\.[jt]sx?$/.test(value) ? value : undefined; }
}

/** Use an allowlist: arbitrary error text and context can contain authored data. */
export function scrubEvent(event: Event): ErrorEvent {
  const vital = String(event.tags?.web_vital || "");
  return {
    type: undefined,
    event_id: event.event_id,
    timestamp: event.timestamp,
    platform: event.platform,
    level: event.level,
    release: event.release,
    environment: event.environment,
    message: ["LCP", "INP", "CLS"].includes(vital) ? `Web vital: ${vital}` : undefined,
    // Free text, URLs, user, extra, request and custom contexts are intentionally omitted.
    exception: event.exception ? { values: event.exception.values?.map(exception => ({
      type: /^(Error|TypeError|RangeError|ReferenceError|SyntaxError|URIError|EvalError|AggregateError)$/.test(exception.type || "") ? exception.type : "Error",
      value: "[Filtered]",
      stacktrace: exception.stacktrace ? { frames: exception.stacktrace.frames?.map(frame => ({
        filename: assetURL(frame.filename),
        abs_path: assetURL(frame.abs_path),
        function: frame.function && /^[\w.$<> /-]+$/.test(frame.function) ? frame.function : undefined,
        lineno: frame.lineno, colno: frame.colno, in_app: frame.in_app,
      })) } : undefined,
    })) } : undefined,
    tags: Object.fromEntries(Object.entries(event.tags || {}).filter(([key, value]) =>
      (key === "web_vital" && ["LCP", "INP", "CLS"].includes(String(value))) ||
      (key === "rating" && ["good", "needs-improvement", "poor"].includes(String(value))))),
    measurements: Object.fromEntries(Object.entries(event.measurements || {})
      .filter(([name, metric]) => ["LCP", "INP", "CLS"].includes(name) && Number.isFinite(metric.value))
      .map(([name, metric]) => [name, { value: metric.value, unit: name === "CLS" ? "none" : "millisecond" }])),
    debug_meta: event.debug_meta ? { images: event.debug_meta.images?.flatMap(image => {
      if (image.type !== "sourcemap" || !image.debug_id || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(image.debug_id)) return [];
      const code_file = assetURL(image.code_file);
      return code_file ? [{ type: "sourcemap" as const, debug_id: image.debug_id, code_file }] : [];
    }) } : undefined,
    breadcrumbs: event.breadcrumbs?.map(crumb => ({
      timestamp: crumb.timestamp,
      category: ["navigation", "fetch", "xhr", "ui.click"].includes(crumb.category || "") ? crumb.category : "event",
      level: crumb.level,
    })),
  };
}
