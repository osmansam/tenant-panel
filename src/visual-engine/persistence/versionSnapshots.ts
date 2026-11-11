import { scopedStorageKey } from "../host/storage";
import type { ComponentDocument } from "../model/document";
import { migrateComponentDocument } from "../model/migrations";

export const VERSION_SNAPSHOTS_KEY_PREFIX = "visual-engine:versions:v1:";
export const MAX_VERSION_SNAPSHOTS = 25;

export interface VersionSnapshot {
  id: string;
  name: string;
  createdAt: string;
  document: ComponentDocument;
}

export function versionSnapshotsKey(documentId: string, namespace = ""): string {
  return scopedStorageKey(`${VERSION_SNAPSHOTS_KEY_PREFIX}${documentId}`, namespace);
}

/** Loads the named versions for a document; entries that no longer validate are skipped. */
export function loadVersionSnapshots(documentId: string, namespace = ""): VersionSnapshot[] {
  try {
    const raw = localStorage.getItem(versionSnapshotsKey(documentId, namespace));
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const snapshots: VersionSnapshot[] = [];
    for (const entry of parsed) {
      if (typeof entry !== "object" || entry === null) continue;
      const { id, name, createdAt, document } = entry as Record<string, unknown>;
      if (typeof id !== "string" || typeof name !== "string" || typeof createdAt !== "string") continue;
      const migrated = migrateComponentDocument(document);
      if (migrated.success) snapshots.push({ id, name, createdAt, document: migrated.value });
    }
    return snapshots;
  } catch {
    return [];
  }
}

/** Returns the stored list including the new snapshot; the oldest entries beyond the limit are dropped. */
export function addVersionSnapshot(documentId: string, snapshot: VersionSnapshot, namespace = ""): VersionSnapshot[] {
  const next = [...loadVersionSnapshots(documentId, namespace), snapshot].slice(-MAX_VERSION_SNAPSHOTS);
  write(documentId, next, namespace);
  return next;
}

export function removeVersionSnapshot(documentId: string, snapshotId: string, namespace = ""): VersionSnapshot[] {
  const next = loadVersionSnapshots(documentId, namespace).filter((snapshot) => snapshot.id !== snapshotId);
  write(documentId, next, namespace);
  return next;
}

function write(documentId: string, snapshots: VersionSnapshot[], namespace: string): void {
  localStorage.setItem(versionSnapshotsKey(documentId, namespace), JSON.stringify(snapshots));
}

