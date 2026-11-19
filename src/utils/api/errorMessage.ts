type ErrorPath = readonly string[];

const DEFAULT_PATHS: readonly ErrorPath[] = [["response", "data", "message"], ["message"]];

const readPath = (source: unknown, path: ErrorPath): unknown =>
  path.reduce<unknown>(
    (current, key) =>
      current && typeof current === "object" ? (current as Record<string, unknown>)[key] : undefined,
    source,
  );

/** Picks the first non-empty string message from an unknown (axios-like) error. */
export const apiErrorMessage = (
  error: unknown,
  fallback: string,
  paths: readonly ErrorPath[] = DEFAULT_PATHS,
): string => {
  for (const path of paths) {
    const value = readPath(error, path);
    if (typeof value === "string" && value) return value;
  }
  return fallback;
};
