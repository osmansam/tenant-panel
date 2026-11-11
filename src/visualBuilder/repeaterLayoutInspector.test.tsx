// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { ComponentDocument, RepeaterNode } from "../visual-engine/model";
import { PropertiesInspector } from "../visual-engine/editor/PropertiesInspector";
import { useVisualBuilder } from "../visual-engine/editor/useVisualBuilder";
import { wrapWithRepeater } from "./visualData";
import { copyVisualDesign } from "./componentLibrary";

const original: ComponentDocument = { version: 2, id: "design", name: "Card design", root: { id: "root", type: "section", children: [{ id: "list", type: "repeater", itemAlias: "item", source: { kind: "autotable", schemaName: "products", limit: 20 }, children: [{ id: "slot", type: "slot", name: "item", children: [{ id: "card", type: "card", element: "article", children: [{ id: "name", type: "heading", level: 3, text: "{{item.name}}" }] }] }] }] } };

function Editor() {
 const { state, actions } = useVisualBuilder({ initialDocument: original, storageMode: "external" });
 return <><PropertiesInspector node={state.document.root.children[0]} onUpdate={patch => actions.updateNode("list", patch)} /><button onClick={actions.undo}>Undo layout</button><button onClick={actions.redo}>Redo layout</button><output aria-label="Saved document">{JSON.stringify(state.document)}</output></>;
}
const current = (): ComponentDocument => JSON.parse(screen.getByLabelText("Saved document").textContent || "{}");
const currentLayout = () => (current().root.children[0] as RepeaterNode & { itemsLayout?: unknown }).itemsLayout;

describe("repeater layout authoring", () => {
 it("applies the approved preset, changes devices independently and supports undo/redo", async () => {
  const user = userEvent.setup(); render(<Editor />);
  const arrangement = screen.getByRole("combobox", { name: "Items arrangement" });
  expect(arrangement).toHaveValue("original");
  await user.selectOptions(arrangement, "grid");
  expect(currentLayout()).toEqual({ columns: { mobile: 1, tablet: 2, desktop: 3 }, gap: { mobile: 16, tablet: 16, desktop: 16 }, alignment: "stretch" });
  await user.selectOptions(screen.getByRole("combobox", { name: "Desktop item columns" }), "4");
  expect(currentLayout()).toMatchObject({ columns: { mobile: 1, tablet: 2, desktop: 4 } });
  await user.click(screen.getByRole("button", { name: "Undo layout" }));
  expect(currentLayout()).toMatchObject({ columns: { desktop: 3 } });
  await user.click(screen.getByRole("button", { name: "Redo layout" }));
  expect(currentLayout()).toMatchObject({ columns: { desktop: 4 } });
  await user.selectOptions(screen.getByRole("combobox", { name: "Item alignment" }), "center");
  expect(currentLayout()).toMatchObject({ alignment: "center" });
  let id = 0;
  const copy = copyVisualDesign({ document: current() }, "Catalog", () => `copy-${++id}`);
  expect((copy.props?.visualBuilder as { document: ComponentDocument }).document.root.children[0]).toHaveProperty("itemsLayout", currentLayout());
  expect(original.root.children[0]).not.toHaveProperty("itemsLayout");
 });
 it("offers a spaced vertical list and can return to the original parent layout", async () => {
  const user = userEvent.setup(); render(<Editor />);
  await user.selectOptions(screen.getByRole("combobox", { name: "Items arrangement" }), "list");
  expect(currentLayout()).toMatchObject({ columns: { mobile: 1, tablet: 1, desktop: 1 } });
  const gap = screen.getByRole("spinbutton", { name: "Desktop item gap" });
  await user.clear(gap); await user.type(gap, "24"); await user.tab();
  expect(currentLayout()).toMatchObject({ gap: { mobile: 16, tablet: 16, desktop: 24 } });
  await user.selectOptions(screen.getByRole("combobox", { name: "Items arrangement" }), "original");
  expect(currentLayout()).toBeUndefined();
 });
 it("uses the approved layout for newly wrapped cards without modifying the card", () => {
  const template = original.root.children[0] as RepeaterNode;
  const card = template.children[0];
  if (card.type !== "slot") throw new Error("Missing template");
  const doc: ComponentDocument = { ...original, root: { ...original.root, children: [card.children[0]] } };
  const before = JSON.stringify(doc);
  const wrapped = wrapWithRepeater(doc, "card", "products");
  expect(wrapped.document.root.children[0]).toHaveProperty("itemsLayout", { columns: { mobile: 1, tablet: 2, desktop: 3 }, gap: { mobile: 16, tablet: 16, desktop: 16 }, alignment: "stretch" });
  expect(JSON.stringify(doc)).toBe(before);
 });
});
