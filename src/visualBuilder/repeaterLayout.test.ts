import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentDocument } from "../visual-engine/model";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import { VisualRenderer } from "../visual-engine/renderer";
import { collectionSourceKey } from "../visual-engine/renderer/repeaters";

const layout = { columns: { mobile: 1, tablet: 2, desktop: 3 }, gap: { mobile: 8, tablet: 16, desktop: 24 }, alignment: "stretch" };
const source = { kind: "autotable" as const, schemaName: "products", limit: 20 };
const makeDocument = (itemsLayout: unknown = layout): ComponentDocument => ({ version: 2, id: "design", name: "Catalog", root: { id: "root", type: "section", children: [
  { id: "sibling", type: "text", text: "Keep this sibling" },
  { id: "list", type: "repeater", itemAlias: "item", source, ...(itemsLayout === undefined ? {} : { itemsLayout }), children: [{ id: "template", type: "slot", name: "item", children: [
    { id: "card", type: "card", element: "article", style: { custom: { width: "300px" }, border: { radius: "lg" } }, children: [{ id: "name", type: "heading", level: 3, text: "{{item.name}}" }] },
    { id: "price", type: "text", text: "Price: {{item.price}}" },
  ] }] },
] } }) as ComponentDocument;
const records = [{ _id: "a", name: "Chair", price: 12 }, { _id: "b", name: "Table", price: 24 }];
const html = (doc: ComponentDocument, props: Record<string, unknown> = {}) => renderToStaticMarkup(createElement(VisualRenderer, { document: doc, mode: "preview", resolvedCollections: { [collectionSourceKey(source)]: records }, ...props }));

describe("repeated item layouts", () => {
  it("round-trips each device layout in an existing v2 document", () => {
    const result = migrateComponentDocument(JSON.parse(JSON.stringify(makeDocument())));
    expect(result.success).toBe(true);
    if (result.success) expect(result.value.root.children[1]).toHaveProperty("itemsLayout", layout);
  });
  it("rejects invalid, incomplete and unknown layout settings", () => {
    for (const invalid of [null, [], {}, { ...layout, extra: true }, { ...layout, alignment: "space-between" },
      ...[0, 7, 1.5, "3"].map(desktop => ({ ...layout, columns: { ...layout.columns, desktop } })),
      ...[-1, 129, 1.5, "16"].map(mobile => ({ ...layout, gap: { ...layout.gap, mobile } })),
      { ...layout, columns: { mobile: 1, desktop: 3 } }, { ...layout, gap: { ...layout.gap, watch: 8 } },
    ]) expect(migrateComponentDocument(makeDocument(invalid)).success, JSON.stringify(invalid)).toBe(false);
  });
  it("keeps old repeaters without implicitly assigning a grid", () => {
    const input = makeDocument(); delete (input.root.children[1] as unknown as Record<string, unknown>).itemsLayout;
    const result = migrateComponentDocument(input);
    expect(result.success).toBe(true);
    if (result.success) expect(result.value.root.children[1]).not.toHaveProperty("itemsLayout");
    const out = html(input);
    expect(out).not.toContain("data-repeater-grid");
    expect(out.match(/data-repeater-instance=/g)).toHaveLength(2);
    expect(out).toContain("Chair"); expect(out).toContain("Table");
  });
  it("groups all children of one record into one grid cell and places the summary after the grid", () => {
    const input = makeDocument(), before = JSON.stringify(input);
    const out = html(input, { collectionStates: { list: { status: "success", message: "Showing 2 of 2 records" } } });
    expect(out.match(/data-repeater-grid=/g)).toHaveLength(1);
    expect(out.match(/data-repeater-instance=/g)).toHaveLength(2);
    expect(out).toContain("--ve-items-cols-mobile:1");
    expect(out).toContain("--ve-items-cols-tablet:2");
    expect(out).toContain("--ve-items-cols-desktop:3");
    expect(out).toContain("--ve-items-gap-desktop:24px");
    expect(out).toContain("Price: 12"); expect(out).toContain("Price: 24");
    expect(out).toContain("Keep this sibling"); expect(out).toContain("width:300px");
    expect(out.indexOf("Showing 2 of 2 records")).toBeGreaterThan(out.lastIndexOf("data-repeater-instance="));
    expect(JSON.stringify(input)).toBe(before);
  });
  it("shows a single editable template at the selected device's column width", () => {
    for (const [breakpoint, columns, gap] of [["mobile", 1, 8], ["tablet", 2, 16], ["desktop", 3, 24]] as const) {
      const out = renderToStaticMarkup(createElement(VisualRenderer, { document: makeDocument(), mode: "canvas", breakpoint }));
      expect(out).toContain(`grid-template-columns:repeat(${columns}, minmax(0, 1fr))`);
      expect(out).toContain(`gap:${gap}px`);
      expect(out).toContain('data-node-id="card"');
      expect(out).not.toContain("data-repeater-instance=");
    }
  });
  it("applies alignment and preserves parent placement once for the collection", () => {
    const input = makeDocument({ ...layout, alignment: "center" });
    const list = input.root.children[1]; list.layout = { span: { mobile: 12, tablet: 6, desktop: 8 } };
    input.root.children = [{ id: "grid", type: "grid", columns: 12, children: [list] }];
    const out = html(input);
    expect(out).toContain("justify-items:center");
    expect(out.match(/md:col-span-6/g)).toHaveLength(1);
    expect(out.match(/lg:col-span-8/g)).toHaveLength(1);
  });
  it("keeps loading, empty and error local without displaying cards", () => {
    for (const status of ["loading", "empty", "error"] as const) {
      const out = html(makeDocument(), { collectionStates: { list: { status, message: `State ${status}` } } });
      expect(out).toContain(`data-repeater-status="${status}"`); expect(out).toContain("Keep this sibling");
      expect(out).not.toContain("data-repeater-instance=");
    }
  });
  it("attaches the responsive outer-spacing rule to the runtime collection surface", () => {
    const input = makeDocument();
    input.root.children[1].responsive = { spacing: { mobile: { custom: { padding: "8px" } }, desktop: { custom: { padding: "32px", margin: "16px" } } } };
    const out = html(input);
    const rule = out.match(/\.([a-z0-9-]+)\{padding:32px !important;margin:16px !important/);
    expect(rule).not.toBeNull();
    const ruleClass = rule![1];
    const classes = [...out.matchAll(/class="([^"]*)"/g)].map(match => match[1].split(" "));
    expect(classes.some(value => value.includes(ruleClass))).toBe(true);
  });
});
