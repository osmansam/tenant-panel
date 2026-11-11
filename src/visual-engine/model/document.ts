import type { SectionNode } from "./nodes";

export const DOCUMENT_KINDS = ["section", "navbar", "footer"] as const;
export type ComponentDocumentKind = (typeof DOCUMENT_KINDS)[number];

export interface ComponentDocument {
  version: 1 | 2;
  id: string;
  name: string;
  /** Missing on legacy documents and treated as `section`. */
  kind?: ComponentDocumentKind;
  root: SectionNode;
  source?: { templateId: string };
}

export function resolveDocumentKind(document: Pick<ComponentDocument, "kind">): ComponentDocumentKind {
  return document.kind ?? "section";
}
