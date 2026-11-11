import { expect, it } from "vitest";
import { readVisualCellSizing, withCellSizing } from "./cellSizing";
import { sampleDocument, visualComponent } from "./testFixtures";
it("opts in only for the explicit placement setting", () => {
 expect(readVisualCellSizing(visualComponent)).toBe("natural");
 expect(readVisualCellSizing({ ...visualComponent, props: { ...visualComponent.props, visualCellSizing: "fill" } })).toBe("fill");
 expect(readVisualCellSizing({ ...visualComponent, props: { visualCellSizing: true } })).toBe("natural");
});
it("fills the rendering root without altering saved data or unrelated leaf dimensions", () => {
 const document = structuredClone(sampleDocument);
 document.root.style = { sizing: { width: "20rem", height: "compact", maxWidth: "sm", scaleFromHeight: "tall" }, custom: { width: "320px", height: "200px", maxWidth: "320px" } };
 const before = structuredClone(document);
 const rendered = withCellSizing(document, "fill");
 expect(rendered.root.style?.sizing).toMatchObject({ width: "full", height: "full", maxWidth: "none" });
 expect(rendered.root.style?.sizing?.scaleFromHeight).toBeUndefined();
 expect(rendered.root.style?.custom).toMatchObject({ width: "100%", height: "100%", maxWidth: "none" });
 expect(rendered.root.children).toBe(document.root.children);
 expect(document).toEqual(before);
 expect(withCellSizing(document, "natural")).toBe(document);
});

it("fills the sole top-level design container while preserving its nested content sizing", () => {
 const document = structuredClone(sampleDocument);
 document.root.children = [{ id: "main-card", type: "card", element: "article", style: { sizing: { width: "20rem", height: "compact", maxWidth: "sm", scaleFromHeight: "tall" }, custom: { width: "25%", height: "160px", maxWidth: "320px" } }, children: [{ id: "nested-card", type: "card", element: "article", style: { sizing: { width: "10rem", height: "compact" } }, children: [] }] }];
 const before = structuredClone(document);
 const filled = withCellSizing(document, "fill");
 expect(filled.root.children[0].style?.sizing).toMatchObject({ width: "full", height: "full", maxWidth: "none" });
 expect(filled.root.children[0].style?.custom).toMatchObject({ width: "100%", height: "100%", maxWidth: "none" });
 expect(filled.root.children[0].style?.sizing?.scaleFromHeight).toBeUndefined();
 expect("children" in filled.root.children[0] && filled.root.children[0].children[0]).toMatchObject({ id: "nested-card", style: { sizing: { width: "10rem", height: "compact" } } });
 expect(document).toEqual(before);
 expect(withCellSizing(document, "natural")).toBe(document);
});
it("preserves a multi-container design's composition instead of resizing every child", () => {
 const document = structuredClone(sampleDocument);
 document.root.children = [{ id: "left", type: "card", element: "article", style: { custom: { width: "160px" } }, children: [] }, { id: "right", type: "card", element: "article", style: { custom: { width: "240px" } }, children: [] }];
 expect(withCellSizing(document, "fill").root.children).toEqual(document.root.children);
});
