import { createDefaultRepeaterLayout, type ComponentDocument, type ComponentNode, type RepeaterNode } from "../visual-engine/model";
import { findAncestors, findNode, findParent, mapNode } from "../visual-engine/operations/queryNode";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
export function wrapWithRepeater(document: ComponentDocument, selectedId: string, schemaName: string, ids: () => string = () => crypto.randomUUID()) {
 const node = findNode(document.root, selectedId), parent = findParent(document.root, selectedId);
 if (!node || !parent || !["card", "stack", "flex"].includes(node.type)) throw new Error("Select a card or group to repeat.");
 if (findAncestors(document.root, selectedId).some(ancestor => ancestor.type === "repeater")) throw new Error("Nested repeaters are not supported.");
 const hasRepeat = (child: ComponentNode): boolean => child.type === "repeater" || ("children" in child && child.children.some(hasRepeat));
 if (hasRepeat(node)) throw new Error("Nested repeaters are not supported.");
 if (parent.type === "grid" && parent.children.some(child => child.layout?.placement)) throw new Error("Use a flow grid before repeating this card.");
 const repeater: RepeaterNode = { id: ids(), type: "repeater", source: { kind: "autotable", schemaName, limit: 20 }, itemAlias: "item", itemsLayout: createDefaultRepeaterLayout(), layout: node.layout, children: [{ id: ids(), type: "slot", name: "item", children: [{ ...node, layout: undefined }] }] };
 const next = { ...document, root: mapNode(document.root, node.id, () => repeater) as ComponentDocument["root"] };
 const parsed = migrateComponentDocument(next);
 if (!parsed.success) throw new Error(parsed.issues[0]?.message || "This selection cannot be repeated.");
 return { document: parsed.value, repeaterId: repeater.id };
}
export function parseSampleRecords(text: string): Record<string, unknown>[] {
 if (new TextEncoder().encode(text).byteLength > 256 * 1024) throw new Error("Samples must be smaller than 256 KiB.");
 let value: unknown;
 try { value = JSON.parse(text); } catch { throw new Error("Enter a valid JSON array of sample records."); }
 if (!Array.isArray(value) || value.length > 100 || value.some(row => !row || typeof row !== "object" || Array.isArray(row))) throw new Error("Use an array of up to 100 record objects.");
 const check = (entry: unknown) => {
  if (entry && typeof entry === "object") for (const [key, child] of Object.entries(entry)) {
   if (["__proto__", "constructor", "prototype"].includes(key)) throw new Error("Samples contain an unsafe property name.");
   check(child);
  }
 };
 check(value); return value;
}
export function templateCollections(root: ComponentNode): Record<string, Record<string, unknown>[]> {
 const result: Record<string, Record<string, unknown>[]> = {};
 const visit = (node: ComponentNode) => {
  if (node.type === "repeater") result[JSON.stringify({ schemaName: node.source.schemaName, filters: node.source.filters ?? [], sort: node.source.sort ?? [], limit: node.source.limit })] = [{}];
  if ("children" in node) node.children.forEach(visit);
 };
 visit(root); return result;
}
