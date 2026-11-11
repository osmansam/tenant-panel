import type { AutoTableCollectionSource } from "../model";
import { safeInstanceKey } from "./instances";

export type ResolvedCollectionRecord = Record<string, unknown>;
export type ResolvedCollectionMap = Record<string, readonly ResolvedCollectionRecord[]>;

export function collectionSourceKey(source: AutoTableCollectionSource): string {
  return JSON.stringify({
    schemaName: source.schemaName,
    ...(source.requestSlot ? { requestSlot: source.requestSlot } : {}),
    filters: source.filters ?? [],
    sort: source.sort ?? [],
    limit: source.limit,
  });
}

export function boundedCollection(records: readonly ResolvedCollectionRecord[] | undefined, limit: number): readonly ResolvedCollectionRecord[] {
  return (records ?? []).slice(0, Math.min(Math.max(limit, 0), 100));
}

export type CollectionStatus = "loading" | "success" | "empty" | "error";

/**
 * Host-supplied presentation state of one repeater's data. The renderer performs no networking;
 * hosts resolve records and report status here, keyed by repeater node id.
 */
export interface ResolvedCollectionState {
  status: CollectionStatus;
  /** Accessible text for `loading`, `empty` and `error`. Ignored for `success`. */
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  /** Machine-readable cause kept on the status element for diagnostics. */
  reason?: string;
}
export type ResolvedCollectionStateMap = Record<string, ResolvedCollectionState>;

const primitiveKey = (value: unknown): string | undefined =>
  typeof value === "string" && value !== "" ? value : typeof value === "number" && Number.isFinite(value) ? String(value) : undefined;

/**
 * Stable per-record keys for rendered instances: a primitive `_id`, then `id`, otherwise the
 * position in the source list. A repeated key gets an occurrence suffix (`~2`). `~` is never
 * produced by `safeInstanceKey`, so a suffix cannot equal another record's key. An index key has no
 * identity across reorders; that is acceptable for read-only lists.
 */
export function recordIdentities(records: readonly ResolvedCollectionRecord[]): string[] {
  const seen = new Map<string, number>();
  return records.map((record, index) => {
    const keyed = primitiveKey(record._id) ?? primitiveKey(record.id);
    const base = keyed === undefined ? `i-${index}` : `k-${safeInstanceKey(keyed)}`;
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}~${count}`;
  });
}
