import { describe, expect, it } from "vitest";
import type { ComponentNode, ImageNode, TableNode } from "../model";
import { imageDeliveryGeometry } from "./images/geometry";
import { expandableHeightClasses, growingSectionStyle, hasExpandableContent } from "./contentHeight";
import { inlineTargetId, inlineTargetPatch, inlineTargetValue, inlineTextField, inlineTextValue, isInlineTargetEditable, targetMatches } from "./inlineTextModel";

const table: TableNode = { id: "table", type: "table", headers: ["Name", "Price"], rows: [["A", "10"], ["B", "20"]], caption: "Products" };
describe("renderer inline edit model", () => {
  it("reads and patches table cells and headers without mutating neighbouring values", () => {
    const cell = { base: "rows", index: 0, sub: 1 };
    expect(isInlineTargetEditable(table, cell)).toBe(true);
    expect(inlineTargetValue(table, cell)).toBe("10");
    expect(inlineTargetPatch(table, "12", cell)).toEqual({ rows: [["A", "12"], ["B", "20"]] });
    expect(inlineTargetPatch(table, "Product", { base: "headers", index: 0 })).toEqual({ headers: ["Product", "Price"] });
    expect(inlineTargetPatch(table, "New caption", { base: "caption" })).toEqual({ caption: "New caption" });
    expect(table.rows[0][1]).toBe("10");
  });
  it("reads and patches entry fields and nested theme labels", () => {
    const timeline: ComponentNode = { id: "timeline", type: "timeline", entries: [{ title: "First", description: "Description" }] };
    const target = { base: "entries", index: 0, sub: "title" };
    expect(isInlineTargetEditable(timeline, target)).toBe(true);
    expect(inlineTargetValue(timeline, target)).toBe("First");
    expect(inlineTargetPatch(timeline, "Updated", target)).toEqual({ entries: [{ title: "Updated", description: "Description" }] });
    const switcher: ComponentNode = { id: "theme", type: "theme-switcher", presentation: "segmented", accessibleLabel: "Color mode", labels: { light: "Light", dark: "Dark", system: "System" } };
    expect(isInlineTargetEditable(switcher, { base: "labels", sub: "light" })).toBe(true);
    expect(inlineTargetValue(switcher, { base: "labels", sub: "light" })).toBe("Light");
    expect(inlineTargetPatch(switcher, "Day", { base: "labels", sub: "light" })).toEqual({ labels: { light: "Day", dark: "Dark", system: "System" } });
  });
  it("does not expose missing, non-string or unsupported edit targets", () => {
    for (const target of [{ base: "rows", index: -1 }, { base: "rows", index: 99 }, { base: "missing", index: 0 }, { base: "rows" }, { base: "headers", sub: "bad" }]) expect(inlineTargetValue(table, target)).toBeNull();
    expect(isInlineTargetEditable(table, { base: "caption" })).toBe(true);
    expect(isInlineTargetEditable(table, { base: "rows", index: 0 })).toBe(false);
    expect(isInlineTargetEditable(table, { base: "headers", index: 0 })).toBe(true);
    expect(isInlineTargetEditable(table, { base: "caption", sub: 1 })).toBe(false);
    expect(inlineTargetPatch(table, "x", { base: "missing", index: 0 })).toEqual({});
    expect(inlineTextField(table)).toBeNull();
    expect(inlineTextValue(table)).toBeNull();
    expect(inlineTextValue({ id: "text", type: "text", text: "Authored" })).toBe("Authored");
  });
  it("identifies targets using all coordinates", () => {
    const cell = { base: "rows", index: 0, sub: 1 };
    expect(inlineTargetId("table", cell)).toBe("table|rows0|1");
    expect(targetMatches(cell, { ...cell })).toBe(true);
    expect(targetMatches(null, cell)).toBe(false);
    expect(targetMatches(cell, { ...cell, index: 1 })).toBe(false);
    expect(targetMatches(cell, { ...cell, sub: 0 })).toBe(false);
  });
});
describe("responsive image geometry", () => {
  const image: ImageNode = { id: "image", type: "image", src: "/photo.jpg", alt: "Photo" };
  it("uses authored dimensions and proportional dimensions only for fixed display boxes", () => {
    expect(imageDeliveryGeometry({ ...image, style: { custom: { width: "400px", height: "300px" } } })).toEqual({ width: 400, height: 300, sizes: "(max-width: 400px) 100vw, 400px" });
    expect(imageDeliveryGeometry({ ...image, aspectRatio: "wide", style: { custom: { width: "400px" } } })).toMatchObject({ width: 400, height: 225 });
    expect(imageDeliveryGeometry({ ...image, aspectRatio: "square", style: { sizing: { width: "full" } } })).toEqual({ width: 1920, height: 1920, sizes: "100vw" });
  });
  it("leaves fluid, original-ratio, zero and height-constrained images unspecified", () => {
    expect(imageDeliveryGeometry(image)).toBeUndefined();
    expect(imageDeliveryGeometry({ ...image, aspectRatio: "original", style: { custom: { width: "400px" } } })).toBeUndefined();
    expect(imageDeliveryGeometry({ ...image, aspectRatio: "wide", style: { custom: { width: "0px" } } })).toBeUndefined();
    expect(imageDeliveryGeometry({ ...image, aspectRatio: "wide", style: { custom: { width: "400px", height: "50%" } } })).toBeUndefined();
  });
});
describe("expandable content height", () => {
  const section: ComponentNode = { id: "root", type: "section", children: [{ id: "disclosure", type: "disclosure", defaultOpen: false, transition: "none", children: [] }] };
  it("allows nested disclosures to grow beyond a section's authored height", () => {
    expect(hasExpandableContent(section)).toBe(true);
    expect(growingSectionStyle(section, { height: "240px", maxHeight: "240px", color: "red" })).toEqual({ minHeight: "240px", height: "auto", color: "red" });
    expect(growingSectionStyle(section, { height: "240px", minHeight: "100px" })).toEqual({ minHeight: "100px", height: "auto" });
    expect(growingSectionStyle(section, { height: "auto" })).toEqual({ height: "auto" });
    expect(expandableHeightClasses(section, "h-[240px] h-full bg-red")).toBe("min-h-[240px] min-h-full bg-red");
  });
  it("retains fixed sizing for ordinary content", () => {
    const text: ComponentNode = { id: "text", type: "text", text: "Text" };
    const style = { height: "240px" };
    expect(hasExpandableContent(text)).toBe(false);
    expect(growingSectionStyle(text, style)).toBe(style);
    expect(expandableHeightClasses(text, "h-full")).toBe("h-full");
  });
});
