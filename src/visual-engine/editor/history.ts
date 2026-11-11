import type { ComponentDocument } from "../model";

export interface HistoryEntry {
  document: ComponentDocument;
  selectedNodeId: string | null;
}

export interface DocumentHistory {
  past: HistoryEntry[];
  future: HistoryEntry[];
}

export interface HistoryStep {
  history: DocumentHistory;
  entry: HistoryEntry;
}

export const HISTORY_LIMIT = 50;

export const EMPTY_HISTORY: DocumentHistory = { past: [], future: [] };

export function recordChange(history: DocumentHistory, entry: HistoryEntry): DocumentHistory {
  return { past: pushBounded(history.past, entry), future: [] };
}

export function undoChange(history: DocumentHistory, current: HistoryEntry): HistoryStep | null {
  const entry = history.past[history.past.length - 1];
  if (entry === undefined) return null;
  return { history: { past: history.past.slice(0, -1), future: pushBounded(history.future, current) }, entry };
}

export function redoChange(history: DocumentHistory, current: HistoryEntry): HistoryStep | null {
  const entry = history.future[history.future.length - 1];
  if (entry === undefined) return null;
  return { history: { past: pushBounded(history.past, current), future: history.future.slice(0, -1) }, entry };
}

export function canUndo(history: DocumentHistory): boolean {
  return history.past.length > 0;
}

export function canRedo(history: DocumentHistory): boolean {
  return history.future.length > 0;
}

function pushBounded(entries: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  return [...entries, entry].slice(-HISTORY_LIMIT);
}
