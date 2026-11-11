import { removeRetiredVisualConnections } from "./retiredData";
import { expect, it } from "vitest";
import { migrateComponentDocument } from "./migrations";

it("keeps the layout of retired dataset regions without creating legacy collection requests", () => {
 const input = { version: 2, id: "doc", name: "Catalog", datasets: [{ id: "products" }], dataContexts: [{ id: "ctx" }], root: { id: "root", type: "section", children: [{ id: "region", type: "repeater", datasetId: "products", dataContextId: "ctx", itemAlias: "product", source: { kind: "autotable", schemaName: "product", limit: 20 }, children: [{ id: "template", type: "slot", name: "item", children: [{ id: "card", type: "card", element: "article", children: [{ id: "name", type: "text", text: "Product", bindings: { text: { source: "item", scope: { contextId: "ctx", recordId: "base" }, path: ["name"] } }, conditionalColors: [{ scope: { contextId: "ctx", recordId: "base" } }] }] }] }] }] } };
 const before = structuredClone(input);
 const result = migrateComponentDocument(input);
 expect(result.success).toBe(true);
 if (!result.success) return;
 expect(result.value).not.toHaveProperty("datasets");
 expect(result.value).not.toHaveProperty("dataContexts");
 const region = result.value.root.children[0];
 expect(region.type).toBe("stack");
 expect(region).not.toHaveProperty("source");
 expect(region).not.toHaveProperty("dataContextId");
 if (!("children" in region)) throw new Error("Missing layout");
 expect(region.children[0]).toMatchObject({ id: "card", type: "card", children: [{ id: "name", text: "Product" }] });
 expect(region.children[0]).not.toHaveProperty("children.0.bindings.text");
 expect(region.children[0]).not.toHaveProperty("children.0.conditionalColors.0");
 expect(input).toEqual(before);
});

it("preserves ordinary collection repeaters and selected-record item bindings", () => {
 const result = migrateComponentDocument({ version: 2, id: "doc", name: "Legacy", root: { id: "root", type: "section", children: [{ id: "rows", type: "repeater", itemAlias: "item", source: { kind: "autotable", schemaName: "products", limit: 20 }, children: [{ id: "template", type: "slot", name: "item", children: [{ id: "text", type: "text", text: "{{item.name}}", bindings: { text: { source: "item", path: ["name"] } } }] }] }] } });
 expect(result.success).toBe(true);
 if (result.success) expect(result.value.root.children[0]).toMatchObject({ type: "repeater", source: { schemaName: "products" } });
});


it("discards previously normalized dataset slots without discarding valid collection connections", () => {
 const component = { id: "visual", type: "custom", props: { visualBuilder: { document: { root: { id: "root", type: "section", children: [] } } } }, requestBindings: { datasetDataset15476Fa8F15F41809E62Debd7984Cf05: { requestId: "old" }, "dataset:products": { requestId: "old" }, "collection:Catalog_Rows": { requestId: "keep" } } };
 const cleaned = removeRetiredVisualConnections(component);
 expect(cleaned.requestBindings).toEqual({ "collection:Catalog_Rows": { requestId: "keep" } });
 expect(component.requestBindings).toHaveProperty("datasetDataset15476Fa8F15F41809E62Debd7984Cf05");
});
