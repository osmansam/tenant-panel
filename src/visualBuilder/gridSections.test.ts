import { describe, expect, it } from "vitest";
import { designerGridSections, mergeDesignerGridSections, movePageSection } from "./gridSections";
import type { Section } from "../utils/api/page";

describe("native and visual page sections", () => {
  const visual: Section = { id: "visual-section", type: "component", order: 1, component: { id: "visual", type: "custom", props: { visualBuilder: { document: { "primary-foreground": "keep" } } } } };
  it("preserves visual and tab sections when the native grid designer changes", () => {
    const original: Section[] = [{ id: "grid-section", type: "grid", grid: { columns: 1, cells: [] } }, visual, { id: "tabs", type: "tabs", order: 2, tabs: { tabs: [] } }];
    const grids = designerGridSections(original);
    const merged = mergeDesignerGridSections(original, [{ ...grids[0], columns: 2 }]);
    expect(Object.getOwnPropertySymbols(merged[0].grid!)).toEqual([]);
    expect(merged).toHaveLength(3);
    expect(merged[0]).toMatchObject({ id: "grid-section", type: "grid", grid: { columns: 2 } });
    expect(merged[1].component).toEqual(visual.component);
    expect(merged[2]).toMatchObject({ id: "tabs", type: "tabs" });
    expect(original[0].grid?.columns).toBe(1);
  });
  it("retains opaque sections when all grids are deleted and appends new grids", () => {
    expect(mergeDesignerGridSections([{ columns: 1, cells: [] }, visual], [])).toEqual([{ ...visual, order: 0 }]);
    const result = mergeDesignerGridSections([visual], [{ columns: 2, cells: [] }]);
    expect(result[0].component).toEqual(visual.component);
    expect(result[1]).toMatchObject({ columns: 2, cells: [], order: 1 });
  });
});

it("keeps runtime order when explicit order differs from array position", () => {
  const original: Section[] = [
    { id: "visual", type: "component", order: 20, component: { id: "hero", type: "custom", props: { visualBuilder: { document: {} } } } },
    { id: "grid", type: "grid", order: 10, grid: { columns: 1, cells: [] } },
  ];
  const grids = designerGridSections(original);
  const saved = mergeDesignerGridSections(original, [{ ...grids[0], columns: 2 }]);
  expect(saved.map(section => section.id)).toEqual(["grid", "visual"]);
  expect(saved[0].grid?.columns).toBe(2);
  expect(original.map(section => section.order)).toEqual([20, 10]);
});

it("moves mixed sections by displayed order, preserves config and re-tags later grid edits", () => {
 const sections: Section[] = [{ id: "visual", type: "component", order: 20, component: { id: "hero", type: "custom", dataBinding: { kind: "schema", parameters: { item: { source: "componentOutput", componentId: "table", outputId: "record" } } }, props: { visualBuilder: { document: { name: "Keep" } } } } }, { id: "grid-a", type: "grid", order: 10, grid: { columns: 1, gap: 8, cells: [] } }, { id: "tabs", type: "tabs", order: 30, tabs: { tabs: [{ id: "t", label: "Tab", order: 0, sections: [{ id: "nested", columns: 1, cells: [] }] }] } }, { id: "grid-b", columns: 2, gap: 20, cells: [] }];
 const original = structuredClone(sections);
 // Default order 0 puts the legacy grid first, then grid-a, visual, tabs.
 const moved = movePageSection(sections, 2, 0);
 expect(moved.map(section => section.id)).toEqual(["visual", "grid-b", "grid-a", "tabs"]);
 expect(moved.map(section => section.order)).toEqual([0,1,2,3]);
 expect(moved[0].component).toEqual(sections[0].component); expect(moved[3].tabs).toEqual(sections[2].tabs);
 const grids = designerGridSections(moved); grids[1] = { ...grids[1], gap: 32 };
 const edited = mergeDesignerGridSections(moved, grids);
 expect(edited.map(section => section.id)).toEqual(moved.map(section => section.id));
 expect(edited[1].gap).toBe(20); expect(edited[2].grid?.gap).toBe(32);
 expect(JSON.stringify(edited)).not.toContain("source-slot"); expect(sections).toEqual(original);
 for (const [from, to] of [[-1,0],[0,4],[0,0],[0.5,1],[NaN,0]]) expect(movePageSection(sections, from, to)).toBe(sections);
});
