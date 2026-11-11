import type { ComponentDocument } from "../model/document";
import { migrateComponentDocument } from "../model/migrations";
import { regenerateNodeIds, type IdFactory } from "../operations";
import { parseVisualTemplate, type VisualTemplate } from "./types";

export type Clock = () => string;

const defaultIdFactory: IdFactory = () => crypto.randomUUID();
const defaultClock: Clock = () => new Date().toISOString();

export function createTemplate(
  document: ComponentDocument,
  name: string,
  idFactory: IdFactory = defaultIdFactory,
  now: Clock = defaultClock,
): VisualTemplate {
  const parsedDocument = migrateComponentDocument(document);
  if (!parsedDocument.success) throw new Error(`Cannot create template: ${parsedDocument.issues[0]?.message ?? "invalid document"}`);

  return requireValidTemplate({
    version: 1,
    id: idFactory(),
    name,
    scope: "project",
    snapshot: parsedDocument.value,
    createdAt: now(),
    updatedAt: now(),
  }, "Cannot create template");
}

export function instantiateTemplate(
  template: VisualTemplate,
  name: string,
  idFactory: IdFactory = defaultIdFactory,
): ComponentDocument {
  const parsedTemplate = parseVisualTemplate(template);
  if (!parsedTemplate.success) throw new Error(`Cannot instantiate template: ${parsedTemplate.issues[0]?.message ?? "invalid template"}`);

  const documentId = idFactory();
  const regeneratedRoot = regenerateNodeIds(parsedTemplate.value.snapshot.root, idFactory);
  if (regeneratedRoot.type !== "section") throw new Error("Cannot instantiate template: snapshot root must be a section");

  const candidate: ComponentDocument = {
    ...parsedTemplate.value.snapshot,
    id: documentId,
    name,
    root: regeneratedRoot,
    source: { templateId: parsedTemplate.value.id },
  };
  const parsedDocument = migrateComponentDocument(candidate);
  if (!parsedDocument.success) throw new Error(`Cannot instantiate template: ${parsedDocument.issues[0]?.message ?? "invalid instance"}`);

  return parsedDocument.value;
}

function requireValidTemplate(input: unknown, prefix: string): VisualTemplate {
  const parsed = parseVisualTemplate(input);
  if (!parsed.success) throw new Error(`${prefix}: ${parsed.issues[0]?.message ?? "invalid template"}`);
  return parsed.value;
}
