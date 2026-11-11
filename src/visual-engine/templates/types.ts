import type { ComponentDocument } from "../model/document";
import { type ValidationIssue, type ValidationResult } from "../model/validation";
import { migrateComponentDocument } from "../model/migrations";

export interface VisualTemplate {
  version: 1;
  id: string;
  name: string;
  scope: "project";
  snapshot: ComponentDocument;
  createdAt: string;
  updatedAt: string;
}

export function parseVisualTemplate(input: unknown): ValidationResult<VisualTemplate> {
  if (!isRecord(input)) return invalid("$", "template.object_required", "Template must be an object");

  const issues: ValidationIssue[] = [];
  if (input.version !== 1) issues.push(issue("$.version", "template.version_unsupported", "Only template version 1 is supported"));
  if (typeof input.id !== "string" || input.id.length === 0) issues.push(issue("$.id", "template.id_required", "Template ID is required"));
  if (typeof input.name !== "string" || input.name.trim().length === 0) issues.push(issue("$.name", "template.name_required", "Template name is required"));
  if (input.scope !== "project") issues.push(issue("$.scope", "template.scope_invalid", "Template scope must be project"));
  if (!isTimestamp(input.createdAt)) issues.push(issue("$.createdAt", "template.created_at_invalid", "Template creation time must be an ISO timestamp"));
  if (!isTimestamp(input.updatedAt)) issues.push(issue("$.updatedAt", "template.updated_at_invalid", "Template update time must be an ISO timestamp"));

  const snapshot = migrateComponentDocument(input.snapshot);
  if (!snapshot.success) issues.push(...snapshot.issues.map((entry) => ({ ...entry, path: `$.snapshot${entry.path.slice(1)}` })));
  if (issues.length > 0 || !snapshot.success) return { success: false, issues };

  return {
    success: true,
    value: {
      version: 1,
      id: input.id as string,
      name: (input.name as string).trim(),
      scope: "project",
      snapshot: snapshot.value,
      createdAt: input.createdAt as string,
      updatedAt: input.updatedAt as string,
    },
    issues: [],
  };
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

function isTimestamp(input: unknown): input is string {
  if (typeof input !== "string" || input.length === 0) return false;
  const rfc3339 =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
  return rfc3339.test(input) && Number.isFinite(Date.parse(input));
}

function issue(path: string, code: string, message: string): ValidationIssue {
  return { path, code, message };
}

function invalid(path: string, code: string, message: string): ValidationResult<never> {
  return { success: false, issues: [issue(path, code, message)] };
}
