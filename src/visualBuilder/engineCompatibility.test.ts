import { describe, expect, it } from "vitest";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import { componentEditorRegistry } from "../visual-engine/components/editor";
import { parseComponentDocument } from "../visual-engine/model/validation";
import { updateNode } from "../visual-engine/operations";
import { EMPTY_HISTORY, recordChange, undoChange, redoChange } from "../visual-engine/editor/history";
import { canAcceptChild, NODE_DEFINITIONS, type ComponentDocument } from "../visual-engine/model";

const document: ComponentDocument = {
  version: 1, id: "doc", name: "Cards",
  root: { id: "root", type: "section", children: [{ id: "title", type: "heading", level: 2, text: "Products" }] },
};

describe("portable visual engine", () => {
  it("migrates legacy documents without losing IDs or authored text", () => {
    expect(migrateComponentDocument(document)).toMatchObject({ success: true, value: { version: 2, id: "doc", root: { children: [{ id: "title", text: "Products" }] } } });
  });
  it("rejects unsafe image sources", () => {
    expect(parseComponentDocument({ ...document, root: { ...document.root, children: [{ id: "image", type: "image", src: "javascript:alert(1)", alt: "Product" }] } }).success).toBe(false);
  });
  it("validates every library component with the source schema", () => {
    let sequence = 0;
    for (const type of componentEditorRegistry.listTypes()) {
      const node = componentEditorRegistry.get(type).createDefault(() => `node-${++sequence}`);
      // Compound defaults may require their structural parent; parse through a section.
      const kinds = NODE_DEFINITIONS[type].documentKinds;
      if (!canAcceptChild("section", type) || (kinds && !kinds.includes("section"))) continue;
      const child = ["input", "textarea", "select", "checkbox"].includes(type) ? { ...componentEditorRegistry.get("form").createDefault(() => `node-${++sequence}`), children: [node] } : node;
      const parsed = parseComponentDocument({ ...document, root: { id: "root", type: "section", children: [child] } });
      expect(parsed.success, `${type}: ${JSON.stringify(parsed.issues)}`).toBe(true);
    }
  });
  it("restores authored documents through undo and redo", () => {
    const changed = updateNode(document, "title", { text: "Inventory" });
    expect(changed.success).toBe(true);
    if (!changed.success) return;
    const original = { document, selectedNodeId: "title" };
    const current = { document: changed.document, selectedNodeId: "title" };
    const undone = undoChange(recordChange(EMPTY_HISTORY, original), current)!;
    expect(undone.entry.document.root.children[0]).toMatchObject({ id: "title", text: "Products" });
    expect(redoChange(undone.history, undone.entry)?.entry.document.root.children[0]).toMatchObject({ id: "title", text: "Inventory" });
  });
});
