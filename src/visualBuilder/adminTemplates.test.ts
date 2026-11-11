import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentNode } from "../visual-engine/model";
import { parseComponentDocument } from "../visual-engine/model/validation";
import { VisualRenderer } from "../visual-engine/renderer";
import { readVisualBlock } from "./pageAdapter";
import { copyVisualDesign } from "./componentLibrary";
import { ADMIN_TEMPLATES } from "./adminTemplates";

const nodes = (node: ComponentNode): ComponentNode[] => [node, ...("children" in node ? node.children.flatMap(nodes) : [])];
describe("built-in admin visual layouts", () => {
 it("provides the fifteen promised editable layouts as valid renderable documents", () => {
  expect(ADMIN_TEMPLATES.map(template => template.name)).toEqual([
   "Dashboard KPI cards",
   "Record card grid",
   "Compact record list",
   "Customer profile",
   "Record details",
   "Order summary",
   "Activity feed",
   "Empty state",
   "Breadcrumbs and page header",
   "Quick actions and shortcuts",
   "Analytics and quota breakdown",
   "Workflow and onboarding stepper",
   "System alerts and status banners",
   "Filter and active tags toolbar",
   "Inventory stock count",
  ]);
  for (const template of ADMIN_TEMPLATES) {
   const parsed = parseComponentDocument(template.value.document);
   expect(parsed.success, `${template.name}: ${JSON.stringify(parsed)}`).toBe(true);
   const value = readVisualBlock({ id: "fixture", type: "custom", props: { visualBuilder: template.value } });
   const output = renderToStaticMarkup(createElement(VisualRenderer, { document: value.document, mode: "canvas", breakpoint: "desktop", themeMode: "light" }));
   expect(output).toContain(template.heading);
   expect(nodes(value.document.root).every(node => node.type !== "repeater" && node.type !== "form" && !(node.type === "button" && (node.action || node.href || node.submit)))).toBe(true);
   for (const node of nodes(value.document.root)) if (node.type === "image" || node.type === "avatar") expect(node.src === "" || node.src.startsWith("/visual-builder/")).toBe(true);
  }
 });
 it("creates independent copies without changing the source or subsequent insertions", () => {
  const source = ADMIN_TEMPLATES.find(template => template.name === "Record card grid")!;
  const original = JSON.stringify(source);
  const first = copyVisualDesign(source.value, source.name), second = copyVisualDesign(source.value, source.name);
  const a = readVisualBlock(first), b = readVisualBlock(second);
  const aIds = new Set(nodes(a.document.root).map(node => node.id));
  expect(nodes(b.document.root).every(node => !aIds.has(node.id))).toBe(true);
  expect(a.document.id).not.toBe(b.document.id);
  a.document.root.children = [];
  expect(b.document.root.children.length).toBeGreaterThan(0);
  expect(JSON.stringify(source)).toBe(original);
 });
});
