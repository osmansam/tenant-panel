import { scopedStorageKey } from "../host/storage";
import type { ComponentDocument } from "../model/document";
import { type ValidationIssue } from "../model/validation";
import { migrateComponentDocument } from "../model/migrations";
import { parseVisualTemplate, type VisualTemplate } from "../templates/types";

export const DOCUMENTS_KEY = "visual-engine:documents:v1";
export const TEMPLATES_KEY = "visual-engine:templates:v1";
export const ACTIVE_DOCUMENT_KEY = "visual-engine:active-document:v1";

export interface DocumentLoadResult {
  documents: ComponentDocument[];
  issues: ValidationIssue[];
}

export interface TemplateLoadResult {
  templates: VisualTemplate[];
  issues: ValidationIssue[];
}

export class TemplateIdCollisionError extends Error {
  readonly issue: ValidationIssue;

  constructor(id: string) {
    super(`A template with ID ${id} already exists`);
    this.name = "TemplateIdCollisionError";
    this.issue = storageIssue("template.id_collision", "A template with this ID already exists", "$.id");
  }
}

export function saveDocument(document: ComponentDocument, namespace = ""): void {
  const parsed = migrateComponentDocument(document);
  if (!parsed.success) throw new Error(`Cannot save document: ${parsed.issues[0]?.message ?? "invalid document"}`);

  const existing = loadDocuments(undefined, namespace);
  const documents = [...existing.documents.filter((item) => item.id !== parsed.value.id), parsed.value];
  writeJson(DOCUMENTS_KEY, documents, namespace);
}

export function loadDocuments(fallback?: ComponentDocument, namespace = ""): DocumentLoadResult {
  const fallbackDocuments = validFallback(fallback);
  const raw = readJson(DOCUMENTS_KEY, namespace);
  if (!raw.success || !Array.isArray(raw.value)) return invalidDocuments(fallbackDocuments);

  const documents: ComponentDocument[] = [];
  for (const entry of raw.value) {
    const parsed = migrateComponentDocument(entry);
    if (!parsed.success) return invalidDocuments(fallbackDocuments);
    documents.push(parsed.value);
  }
  return { documents, issues: [] };
}

export function setActiveDocumentId(id: string, namespace = ""): void {
  if (typeof id !== "string" || id.length === 0) throw new Error("Active document ID is required");
  localStorage.setItem(scopedStorageKey(ACTIVE_DOCUMENT_KEY, namespace), id);
}

export function getActiveDocumentId(namespace = ""): string | null {
  const id = localStorage.getItem(scopedStorageKey(ACTIVE_DOCUMENT_KEY, namespace));
  return typeof id === "string" && id.length > 0 ? id : null;
}

export function saveTemplate(template: VisualTemplate, namespace = ""): void {
  const parsed = parseVisualTemplate(template);
  if (!parsed.success) throw new Error(`Cannot save template: ${parsed.issues[0]?.message ?? "invalid template"}`);

  const existing = loadTemplates(namespace);
  if (existing.templates.some((item) => item.id === parsed.value.id)) {
    throw new TemplateIdCollisionError(parsed.value.id);
  }
  const templates = [...existing.templates, parsed.value];
  writeJson(TEMPLATES_KEY, templates, namespace);
}

export function loadTemplates(namespace = ""): TemplateLoadResult {
  const raw = readJson(TEMPLATES_KEY, namespace);
  if (!raw.success || !Array.isArray(raw.value)) return invalidTemplates();

  const templates: VisualTemplate[] = [];
  for (const entry of raw.value) {
    const parsed = parseVisualTemplate(entry);
    if (!parsed.success) return invalidTemplates();
    templates.push(parsed.value);
  }
  return { templates, issues: [] };
}

function validFallback(fallback: ComponentDocument | undefined): ComponentDocument[] {
  if (fallback === undefined) return [];
  const parsed = migrateComponentDocument(fallback);
  return parsed.success ? [parsed.value] : [];
}

function invalidDocuments(documents: ComponentDocument[]): DocumentLoadResult {
  return { documents, issues: [storageIssue("storage.documents_invalid", "Stored documents are invalid")] };
}

function invalidTemplates(): TemplateLoadResult {
  return { templates: [], issues: [storageIssue("storage.templates_invalid", "Stored templates are invalid")] };
}

function readJson(key: string, namespace: string): { success: true; value: unknown } | { success: false } {
  try {
    const value = localStorage.getItem(scopedStorageKey(key, namespace));
    return value === null ? { success: true, value: [] } : { success: true, value: JSON.parse(value) as unknown };
  } catch {
    return { success: false };
  }
}

function writeJson(key: string, value: unknown, namespace: string): void {
  localStorage.setItem(scopedStorageKey(key, namespace), JSON.stringify(value));
}

function storageIssue(code: string, message: string, path = "$"): ValidationIssue {
  return { path, code, message };
}
