import * as Sentry from "@sentry/react";
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";
import { scrubEvent } from "./privacy";

export function initializeObservability() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!import.meta.env.PROD || !dsn) return;
  Sentry.init({
    dsn,
    release: __APP_RELEASE__,
    environment: import.meta.env.VITE_APP_ENV || import.meta.env.MODE,
    sendDefaultPii: false,
    // No replay, request payloads, user identity or tracing. Stack locations identify failures.
    beforeSend: scrubEvent,
    integrations: (defaults) => defaults.filter(integration => !["Breadcrumbs", "HttpContext"].includes(integration.name)),
  });
  const report = (metric: Metric) => {
    Sentry.captureEvent({
      level: "info",
      tags: { web_vital: metric.name, rating: metric.rating },
      measurements: { [metric.name]: { value: metric.value, unit: metric.name === "CLS" ? "none" : "millisecond" } },
    });
  };
  onLCP(report);
  onINP(report);
  onCLS(report);
}
