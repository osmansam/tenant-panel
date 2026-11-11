import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentDocument, ComponentNode } from "../visual-engine/model";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import { bindNode } from "../visual-engine/renderer/bindings";
import { VisualRenderer } from "../visual-engine/renderer";

const text = (value: string): ComponentNode => ({ id: "text", type: "text", text: value });
const card: ComponentNode = { id: "card", type: "card", element: "article", children: [
  { id: "name", type: "heading", level: 3, text: "{{item.name}}" },
  text("Price: {{item.price}}"),
  { id: "photo", type: "image", src: "{{item.imageUrl}}", alt: "Photo of {{item.name}}" },
] };
const design: ComponentDocument = { version: 2, id: "design", name: "Catalog", root: { id: "root", type: "section", children: [
  { id: "list", type: "repeater", itemAlias: "product", source: { kind: "autotable", schemaName: "items", limit: 20 }, children: [{ id: "slot", type: "slot", name: "item", children: [card] }] },
] } };

describe("item templates", () => {
  it("interpolates mixed text, whitespace, nested fields, zero and false without explicit bindings", () => {
    expect(bindNode(text("{{ item.name }} · Price: {{item.price}} · {{item.category.name}} · {{item.available}}"), { name: "Chair", price: 0, category: { name: "Home" }, available: false }))
      .toMatchObject({ text: "Chair · Price: 0 · Home · false" });
  });
  it("makes missing and non-scalar values blank and never traverses inherited or prototype fields", () => {
    const record = Object.assign(Object.create({ inherited: "SECRET" }), { nullable: null, object: { name: "Secret" }, array: ["Secret"], name: "Chair" });
    expect(bindNode(text("a{{item.missing}}{{item.nullable}}{{item.object}}{{item.array}}{{item.inherited}}{{item.constructor.name}}{{item.__proto__.inherited}}{{item.prototype}}b"), record)).toMatchObject({ text: "ab" });
  });
  it("does not execute expressions or recursively expand record values", () => {
    expect(bindNode(text("{{item.name}} {{item.price * 2}} {{name}}"), { name: "{{item.secret}}", secret: "SECRET" })).toMatchObject({ text: "{{item.secret}} {{item.price * 2}} {{name}}" });
  });
  it("retains explicit selector binding precedence and interpolates its fallback if unresolved", () => {
    const node = { ...text("Price: {{item.price}}"), bindings: { text: { source: "item" as const, path: ["name"] } } };
    expect(bindNode(node, { name: "Chair", price: 12 })).toMatchObject({ text: "Chair" });
    expect(bindNode(node, { price: 12 })).toMatchObject({ text: "Price: 12" });
  });
  it("interpolates supported labels, image attributes and links", () => {
    const record = { name: "Chair", imageUrl: "https://example.com/chair.png", id: "chair", price: 12 };
    expect(bindNode({ id: "image", type: "image", src: "{{item.imageUrl}}", alt: "Photo of {{item.name}}" }, record)).toMatchObject({ src: "https://example.com/chair.png", alt: "Photo of Chair" });
    expect(bindNode({ id: "link", type: "link", href: "/items/{{item.id}}", label: "View {{item.name}}", openInNewTab: false }, record)).toMatchObject({ href: "/items/chair", label: "View Chair" });
    expect(bindNode({ id: "stat", type: "stat", value: "{{item.price}}", label: "{{item.name}}" }, record)).toMatchObject({ value: "12", label: "Chair" });
  });
  it("rejects unsafe and unresolved URL templates without returning raw template URLs", () => {
    const image: ComponentNode = { id: "image", type: "image", src: "{{item.imageUrl}}", alt: "Product" };
    const link: ComponentNode = { id: "link", type: "link", href: "{{item.url}}", label: "View", openInNewTab: false };
    for (const imageUrl of ["javascript:alert(1)", undefined, {}, "{{item.other}}", "https://example.com/\nsecret"]) expect(bindNode(image, { imageUrl })).toMatchObject({ src: "" });
    for (const url of ["javascript:alert(1)", undefined, "data:text/html,bad"]) expect(bindNode(link, { url })).toMatchObject({ href: "#" });
    expect(bindNode({ ...image, src: "/placeholder.svg", bindings: { src: { source: "item", path: ["imageUrl"] } } }, { imageUrl: "javascript:alert(1)" })).toMatchObject({ src: "/placeholder.svg" });
  });
  it("round-trips templates and renders distinct escaped cards without changing the saved design", () => {
    const saved = JSON.stringify(design);
    const result = migrateComponentDocument(JSON.parse(saved));
    if (!result.success) throw new Error(JSON.stringify(result.issues));
    const out = renderToStaticMarkup(createElement(VisualRenderer, { document: result.value, mode: "preview", resolvedCollections: { items: [
      { _id: "a", name: "<b>Chair</b>", price: 12, imageUrl: "/chair.png" },
      { _id: "b", name: "Table", price: 24, imageUrl: "/table.png" },
    ] } }));
    expect(out).toContain("&lt;b&gt;Chair&lt;/b&gt;");
    expect(out).toContain("Price: 12"); expect(out).toContain("Price: 24");
    expect(out).toContain('src="/chair.png"'); expect(out).toContain('src="/table.png"');
    expect(out).not.toContain("{{item."); expect(out).not.toContain("<b>Chair</b>");
    expect(JSON.stringify(design)).toBe(saved);
  });
  it("keeps authored templates visible when no record context is available", () => {
    const out = renderToStaticMarkup(createElement(VisualRenderer, { document: { ...design, root: { ...design.root, children: [text("Price: {{item.price}} nested {{item.category.name}}") ] } }, mode: "canvas", breakpoint: "desktop" }));
    expect(out).toContain("{{item.price}}"); expect(out).toContain("{{item.category.name}}");
  });
  it("does not request raw image templates or navigate raw link templates on the design canvas", () => {
    const out = renderToStaticMarkup(createElement(VisualRenderer, { document: { ...design, root: { ...design.root, children: [card, { id: "link", type: "link", label: "View", href: "/items/{{item.id}}", openInNewTab: false }] } }, mode: "canvas", breakpoint: "desktop" }));
    expect(out).toContain("{{item.name}}");
    expect(out).not.toContain('src="{{item.imageUrl}}"');
    expect(out).not.toContain('href="/items/{{item.id}}"');
    expect(out).toContain('href="#"');
  });
});
