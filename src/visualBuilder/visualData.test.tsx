// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { wrapWithRepeater, parseSampleRecords } from "./visualData";
import VisualDataTools from "./VisualDataTools";
import type { ComponentDocument } from "../visual-engine/model";
import { VisualDataContext } from "../visual-engine/host/DataContext";
import { PropertiesInspector } from "../visual-engine/editor/PropertiesInspector";
import { useState } from "react";
import { mapNode } from "../visual-engine/operations/queryNode";
const document: ComponentDocument = { version: 2, id: "design", name: "Products", root: { id: "root", type: "section", children: [{ id: "card", type: "card", element: "article", children: [{ id: "name", type: "heading", level: 3, text: "Name", bindings: { text: { source: "item", path: ["name"] } } }] }] } };
describe("visual data authoring", () => {
 it("lets authors type a mixed template into ordinary content and preview distinct sample values", async () => {
  const user = userEvent.setup();
  function Editor() {
   const [value, setValue] = useState("Price");
   const input: ComponentDocument = { version: 2, id: "templates", name: "Template card", root: { id: "root", type: "section", children: [{ id: "card", type: "card", element: "article", children: [{ id: "price", type: "text", text: value }] }] } };
   const wrapped = wrapWithRepeater({ ...input, root: { ...input.root, children: [{ id: "card", type: "card", element: "article", children: [{ id: "price", type: "text", text: "Price" }] }] } }, "card", "products", (() => { let id = 0; return () => `wrap-${++id}`; })());
   const edited = { ...wrapped.document, root: mapNode(wrapped.document.root, "price", node => ({ ...node, text: value })) as ComponentDocument["root"] };
   return <><PropertiesInspector node={{ id: "price", type: "text", text: value }} bindingAlias="item" onUpdate={patch => { if ("text" in patch && typeof patch.text === "string") setValue(patch.text); }} /><VisualDataTools document={edited} selectedId={wrapped.repeaterId} onReplace={() => {}} onSelect={() => {}} schemas={[]} /></>;
  }
  render(<Editor />);
  const content = screen.getByRole("textbox", { name: "Text content" });
  await user.clear(content);
  await user.click(content);
  await user.paste("{{item.name}} — Price: {{item.price}}");
  await user.click(screen.getByRole("button", { name: "Sample records" }));
  await user.click(screen.getByRole("button", { name: "Load five example products" }));
  await user.click(screen.getByRole("button", { name: "Preview data" }));
  expect(screen.getByText("Example product 1 — Price: 10")).toBeInTheDocument();
  expect(screen.getByText("Example product 5 — Price: 50")).toBeInTheDocument();
  expect(content).toHaveValue("{{item.name}} — Price: {{item.price}}");
 });
 it("offers exact schema field names in the child binding inspector", async () => {
  const update = vi.fn();
  render(<VisualDataContext.Provider value={[{ name: "products", fields: [{ name: "ProductSKU", path: ["ProductSKU"], type: "string" }] }]}><PropertiesInspector node={{ id: "text", type: "text", text: "Fallback" }} bindingAlias="item" bindingSchemaName="products" onUpdate={update} /></VisualDataContext.Provider>);
  await userEvent.click(screen.getByRole("button", { name: "Data binding" }));
  await userEvent.selectOptions(screen.getByRole("combobox", { name: "Text item field" }), JSON.stringify(["ProductSKU"]));
  expect(update).toHaveBeenCalledWith({ bindings: { text: { source: "item", path: ["ProductSKU"] } } });
 });
 it("wraps a card without changing source or child ids and transfers layout", () => {
  const layout = { span: { mobile: 12, tablet: 6, desktop: 4 } };
  const input: ComponentDocument = { ...document, root: { ...document.root, children: [{ id: "grid", type: "grid", columns: 12, children: [{ ...document.root.children[0], layout }] }] } };
  const before = structuredClone(input); let id = 0;
  const result = wrapWithRepeater(input, "card", "products", () => `new-${++id}`);
  const grid = result.document.root.children[0];
  if (grid.type !== "grid") throw new Error("Missing grid");
  const repeater = grid.children[0];
  expect(repeater).toMatchObject({ type: "repeater", layout, source: { schemaName: "products", limit: 20 } });
  if (repeater.type !== "repeater" || repeater.children[0].type !== "slot") throw new Error("Missing item slot");
  expect(repeater.children[0].children[0]).toMatchObject({ id: "card" });
  expect(repeater.children[0].children[0].layout).toBeUndefined();
  expect(input).toEqual(before);
 });
 it("rejects nested repeaters and positioning grids without changing the document", () => {
  const wrapped = wrapWithRepeater(document, "card", "products").document;
  expect(() => wrapWithRepeater(wrapped, "card", "products")).toThrow(/nested/i);
 });
 it("bounds sample input and rejects dangerous keys", () => {
  expect(parseSampleRecords('[{"name":"A","ProductSKU":0}]')).toEqual([{ name: "A", ProductSKU: 0 }]);
  for (const input of ['{}', '[null]', '[{"nested":{"__proto__":{}}}]', JSON.stringify(Array(101).fill({}))]) expect(() => parseSampleRecords(input)).toThrow();
 });
 it("previews five bound cards locally and never passes samples into document replacement", async () => {
  const wrapped = wrapWithRepeater(document, "card", "products");
  const replace = vi.fn();
  render(<VisualDataTools document={wrapped.document} selectedId={wrapped.repeaterId} onReplace={replace} onSelect={vi.fn()} schemas={[]} />);
  await userEvent.click(screen.getByRole("button", { name: "Sample records" }));
  await userEvent.click(screen.getByRole("button", { name: "Load five example products" }));
  await userEvent.click(screen.getByRole("button", { name: "Preview data" }));
  const cards = screen.getAllByRole("heading", { name: /Example product [1-5]/ });
  expect(cards).toHaveLength(5); expect(replace).not.toHaveBeenCalled();
 });
});
