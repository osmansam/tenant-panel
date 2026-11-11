import { SITE_LAYOUT_STARTERS } from "../fixtures/siteLayoutStarters";
import { CURATED_NAVBAR_ALL } from "../fixtures/curated-navbars";
import { CURATED_FOOTER_ALL } from "../fixtures/curated-footers";
import type { VisualTemplateRecord } from "./records";

const createdAt = "2026-10-05T00:00:00.000Z";

const ALL_LAYOUT_STARTERS = [
  ...SITE_LAYOUT_STARTERS,
  ...CURATED_NAVBAR_ALL,
  ...CURATED_FOOTER_ALL,
];

export const BUILTIN_LAYOUT_TEMPLATE_RECORDS: VisualTemplateRecord[] = ALL_LAYOUT_STARTERS.map((snapshot) => ({
  _id: `starter:${snapshot.id}`,
  id: snapshot.id,
  version: 1,
  name: snapshot.name,
  description: snapshot.id.startsWith("mustafa-professional-")
    ? "Professional forest, cream, gold, and teal site layout for the Mustafa page."
    : `Curated responsive ${snapshot.kind} document.`,
  category: snapshot.kind === "navbar" ? "Navigation" : "Footer",
  tags: ["visual", "layout", "builtin", snapshot.kind ?? "section"],
  scope: "project",
  snapshot,
  containerStyle: { width: "100%" },
  thumbnailUrl: "",
  isActive: true,
  createdAt,
  updatedAt: createdAt,
}));

export function findBuiltinLayoutTemplate(templateId: string): VisualTemplateRecord | undefined {
  return BUILTIN_LAYOUT_TEMPLATE_RECORDS.find((template) => template._id === templateId || template.id === templateId);
}
