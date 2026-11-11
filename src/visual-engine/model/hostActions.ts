import type { HostActionSpec } from "./nodes";

const blocked = new Set(["__proto__", "prototype", "constructor"]);
function json(value: unknown, depth = 0, seen = new WeakSet<object>()): boolean {
  if (depth > 16) return false;
  if (value === null || typeof value === "boolean" || typeof value === "string") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object" || seen.has(value)) return false;
  if (!Array.isArray(value) && ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return false;
  seen.add(value);
  const entries = Object.entries(value);
  const valid = entries.length <= 100 && entries.every(([key, entry]) => !blocked.has(key) && json(entry, depth + 1, seen));
  seen.delete(value); return valid;
}
export function isHostAction(value: unknown): value is HostActionSpec {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some(key => key !== "name" && key !== "config") || typeof input.name !== "string" || !/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(input.name)) return false;
  return !!input.config && typeof input.config === "object" && !Array.isArray(input.config) && json(input.config)
    && new TextEncoder().encode(JSON.stringify(input.config)).byteLength <= 65536;
}
