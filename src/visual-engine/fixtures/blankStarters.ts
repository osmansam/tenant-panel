import type { ComponentDocument, ComponentDocumentKind } from "../model";
import { BLANK_NAVBAR_DOCUMENT, BLANK_FOOTER_DOCUMENT } from "./siteLayoutStarters";

export const BLANK_SCRATCH_SECTION: ComponentDocument = {
  version: 2,
  id: "blank-scratch-section",
  name: "Start from scratch (blank canvas)",
  kind: "section",
  root: {
    id: "scratch-root",
    type: "section",
    style: {
      spacing: { paddingY: "2xl", paddingX: "xl" },
      color: { background: "surface", text: "text" },
    },
    children: [],
  },
};

export function getBlankStarterDocument(kind?: ComponentDocumentKind): ComponentDocument {
  if (kind === "navbar") return BLANK_NAVBAR_DOCUMENT;
  if (kind === "footer") return BLANK_FOOTER_DOCUMENT;
  return BLANK_SCRATCH_SECTION;
}
