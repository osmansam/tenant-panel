import { describe, expect, it } from "vitest";
import { collectVisualDesigns, copyVisualDesign } from "./componentLibrary";
import { sampleDocument, samplePage } from "./testFixtures";
import { DEFAULT_SITE_THEME } from "../visual-engine/theme";
import { parseComponentDocument } from "../visual-engine/model/validation";

describe("independent visual components", () => {
  it("copies a design deeply with fresh component/document/node identity and preserves theme", () => {
    const value = { document: structuredClone(sampleDocument), theme: structuredClone(DEFAULT_SITE_THEME) };
    let sequence = 0;
    const first = copyVisualDesign(value, "Product card", () => `copy_${++sequence}`);
    const second = copyVisualDesign(value, "Another card", () => `copy_${++sequence}`);
    expect(first.type).toBe("custom");
    expect(first.id).not.toBe(second.id);
    expect(first.props?.visualBuilder.document.id).not.toBe(value.document.id);
    expect(first.props?.visualBuilder.document.root.id).not.toBe(value.document.root.id);
    expect(first.props?.visualBuilder.theme).toEqual(value.theme);
    first.props!.visualBuilder.document.root.children[0].text = "Edited copy";
    first.props!.visualBuilder.theme.palettes.light["primary-foreground"] = "#000000";
    expect(value.document.root.children[0]).toMatchObject({ text: "Products" });
    expect(second.props?.visualBuilder.document.root.children[0].text).toBe("Products");
    expect(value.theme.palettes.light["primary-foreground"]).not.toBe("#000000");
  });
  it("remaps internal menu targets so a copied navigation design remains valid", () => {
    const value = { document: { ...sampleDocument, kind: "navbar" as const, root: { ...sampleDocument.root, children: [
      { id: "toggle", type: "menu-toggle" as const, label: "Menu", targetId: "panel" },
      { id: "panel", type: "menu-panel" as const, children: [] },
    ] } } };
    let sequence = 0;
    const copy = copyVisualDesign(value, "Navigation", () => `copy_${++sequence}`);
    const doc = copy.props!.visualBuilder.document;
    expect(doc.root.children[0].targetId).toBe(doc.root.children[1].id);
    expect(doc.root.children[1].id).not.toBe("panel");
    expect(parseComponentDocument(doc).success).toBe(true);
  });
  it("remaps direct and slider links to copied node anchors", () => {
    const value = { document: { ...sampleDocument, root: { ...sampleDocument.root, children: [
      { id: "destination", type: "heading" as const, level: 2 as const, text: "Details" },
      { id: "link", type: "link" as const, label: "Direct", href: "#destination", openInNewTab: false },
      { id: "slide", type: "card" as const, element: "article" as const, slideLink: { href: "#destination", accessibleLabel: "Slide" }, children: [] },
    ] } } };
    let sequence = 0;
    const copy = copyVisualDesign(value, "Linked cards", () => `copy_${++sequence}`);
    const children = copy.props!.visualBuilder.document.root.children;
    expect(children[1].href).toBe(`#${children[0].id}`);
    expect(children[2].slideLink.href).toBe(`#${children[0].id}`);
  });

  it("rejects invalid designs and lists saved nested designs with their source page", () => {
    expect(() => copyVisualDesign({ document: {} } as never, "Invalid")).toThrow(/invalid/i);
    const page = samplePage();
    page.sections.push({ type: "component", component: { id: "broken", type: "custom", props: { visualBuilder: { document: {} } } } });
    const designs = collectVisualDesigns([page]);
    expect(designs).toHaveLength(1);
    expect(designs[0]).toMatchObject({ pageId: "page-1", pageName: "Inventory", componentId: "visual", name: "Visual section" });
  });
});
