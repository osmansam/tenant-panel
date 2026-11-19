import { captureException } from "@sentry/react";

const isDev = () => import.meta.env.DEV;

/**
 * Single sink for diagnostics. `console.*` is banned by lint outside this file.
 * - debug: development only, never shipped to users.
 * - warn: development only.
 * - error: console in development, Sentry in production.
 */
export const logger = {
  debug(...args: unknown[]) {
    if (isDev()) console.debug(...args);
  },
  warn(message: unknown, ...context: unknown[]) {
    if (isDev()) console.warn(message, ...context);
  },
  error(error: unknown, ...context: unknown[]) {
    if (isDev()) {
      console.error(error, ...context);
      return;
    }
    const cause = [error, ...context].find((item) => item instanceof Error);
    // Retain a callsite stack even when the diagnostic contains only authored
    // text or objects. The privacy boundary must not need the original payload.
    captureException(cause ?? new Error("Non-Error diagnostic"));
  },
};
