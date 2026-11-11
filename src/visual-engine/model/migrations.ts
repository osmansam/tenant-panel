import { removeRetiredVisualData } from "./retiredData";
import type { ComponentDocument } from "./document";
import { parseComponentDocument, type ValidationResult } from "./validation";

export function migrateComponentDocument(input: unknown): ValidationResult<ComponentDocument> {
  const parsed = parseComponentDocument(removeRetiredVisualData(input));
  if (!parsed.success) return parsed;
  return { success: true, value: { ...parsed.value, version: 2 }, issues: [] };
}
