/** Diagnostics sink for the visual engine (kept independent of app-level utils). */
export const engineLogger = {
  error(...args: unknown[]) {
    if (import.meta.env.DEV) console.error(...args);
  },
};
