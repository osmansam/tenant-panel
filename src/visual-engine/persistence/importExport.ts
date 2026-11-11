import type { ComponentDocument } from "../model/document";
import { type ValidationResult } from "../model/validation";
import { migrateComponentDocument } from "../model/migrations";
import { parseVisualTemplate, type VisualTemplate } from "../templates/types";

export function exportDocument(document: ComponentDocument): string {
  const parsed = migrateComponentDocument(document);
  if (!parsed.success) throw new Error(`Cannot export document: ${parsed.issues[0]?.message ?? "invalid document"}`);
  return JSON.stringify(parsed.value, null, 2);
}

export function importDocument(serialized: string): ValidationResult<ComponentDocument> {
  const parsedJson = parseJson(serialized, "import.document_invalid", "Document import must be valid JSON");
  return parsedJson.success ? migrateComponentDocument(parsedJson.value) : parsedJson;
}

export function exportTemplate(template: VisualTemplate): string {
  const parsed = parseVisualTemplate(template);
  if (!parsed.success) throw new Error(`Cannot export template: ${parsed.issues[0]?.message ?? "invalid template"}`);
  return JSON.stringify(parsed.value, null, 2);
}

export function importTemplate(serialized: string): ValidationResult<VisualTemplate> {
  const parsedJson = parseJson(serialized, "import.template_invalid", "Template import must be valid JSON");
  return parsedJson.success ? parseVisualTemplate(parsedJson.value) : parsedJson;
}

function parseJson(serialized: string, code: string, message: string): ValidationResult<unknown> {
  try {
    return { success: true, value: JSON.parse(serialized) as unknown, issues: [] };
  } catch {
    return { success: false, issues: [{ path: "$", code, message }] };
  }
}
