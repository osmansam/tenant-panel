// @vitest-environment jsdom
import { createElement } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentDocument } from "../visual-engine/model";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import { VisualRenderer, type VisualRendererProps } from "../visual-engine/renderer/VisualRenderer";

afterEach(cleanup);
const action = { name: "record", config: { schemaName: "products", action: { kind: "edit", modalType: "form" }, valueBindings: { productId: ["_id"] } } };
const doc = (): ComponentDocument => ({ version: 2, id: "design", name: "Actions", root: { id: "root", type: "section", children: [{ id: "list", type: "repeater", source: { kind: "autotable", schemaName: "products", limit: 5 }, itemAlias: "item", children: [{ id: "slot", type: "slot", name: "item", children: [{ id: "edit", type: "button", label: "Edit {{item.name}}", action }] }] }] } }) as unknown as ComponentDocument;
const records = [{ _id: "a", name: "Chair", price: 0, undisplayed: { code: "A" } }, { _id: "b", name: "Table", price: 20, undisplayed: { code: "B" } }];
function view(document: ComponentDocument, onHostAction?: (event: unknown) => void, mode = "preview") {
 return render(createElement(VisualRenderer, { document, mode, breakpoint: "desktop", resolvedCollections: { products: records }, onHostAction } as unknown as VisualRendererProps));
}

describe("visual button action bridge", () => {
 it("preserves host actions through document validation and rejects unsafe or oversized configs", () => {
  const valid = migrateComponentDocument(doc()); expect(valid.success).toBe(true);
  if (valid.success) expect(JSON.stringify(valid.value)).toContain('"valueBindings":{"productId":["_id"]}');
  for (const invalid of [{ name: "", config: {} }, { name: "record", config: [] }, { name: "record", config: JSON.parse('{"__proto__":{"polluted":true}}') }, { name: "record", config: { huge: "x".repeat(70_000) } }]) {
   const input = JSON.parse(JSON.stringify(doc())); input.root.children[0].children[0].children[0].action = invalid;
   expect(migrateComponentDocument(input).success).toBe(false);
  }
 });
 it("passes the complete clicked record including hidden id without mutating records or designs", () => {
  const document = doc(), before = JSON.stringify(document), recordBefore = JSON.stringify(records);
  const callback = vi.fn((event: unknown) => {
   const value = event as { item: { _id: string; undisplayed: { code: string } }; action: { config: { schemaName: string } } };
   value.item.undisplayed.code = "Changed by host"; value.action.config.schemaName = "Changed by host";
  });
  view(document, callback);
  fireEvent.click(screen.getByRole("button", { name: "Edit Table" }));
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback.mock.calls[0][0]).toMatchObject({ item: { _id: "b", name: "Table", price: 20 } });
  expect(JSON.stringify(document)).toBe(before); expect(JSON.stringify(records)).toBe(recordBefore);
 });
 it("does not invoke actions on the canvas or in a host-free preview", () => {
  const callback = vi.fn();
  const canvas = view(doc(), callback, "canvas");
  fireEvent.click(screen.getByRole("button", { name: "Edit {{item.name}}" }));
  expect(callback).not.toHaveBeenCalled(); canvas.unmount();
  view(doc());
  expect((screen.getByRole("button", { name: "Edit Chair" }) as HTMLButtonElement).disabled).toBe(true);
 });
 it("leaves ordinary links and native submit buttons unchanged", () => {
  const document: ComponentDocument = { version: 2, id: "d", name: "Links", root: { id: "r", type: "section", children: [{ id: "link", type: "button", label: "Visit", href: "/items" }] } };
  view(document, vi.fn());
  expect(screen.getByRole("link", { name: "Visit" }).getAttribute("href")).toBe("/items");
 });
});
