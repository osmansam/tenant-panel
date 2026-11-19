import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentDocument } from "../model/document";
import { ACTIVE_DOCUMENT_KEY, DOCUMENTS_KEY, TEMPLATES_KEY, getActiveDocumentId, loadDocuments, loadTemplates, saveDocument, saveTemplate, setActiveDocumentId, TemplateIdCollisionError } from "./localStorage";
import { exportDocument, exportTemplate, importDocument, importTemplate } from "./importExport";
import { addVersionSnapshot, loadVersionSnapshots, MAX_VERSION_SNAPSHOTS, removeVersionSnapshot, versionSnapshotsKey } from "./versionSnapshots";
import { CUSTOM_STYLE_KITS_KEY, deleteCustomStyleKit, loadCustomStyleKits, MAX_CUSTOM_STYLE_KITS, saveCustomStyleKit } from "./customStyleKits";
import { createTemplate } from "../templates/templateOperations";

const doc: ComponentDocument = { version: 1, id: "doc", name: "Inventory", root: { id: "root", type: "section", children: [{ id: "title", type: "text", text: "Authored" }] } };
const kit = { version: 1 as const, id: "kit", name: "  Brand  ", preset: "editorial" as const, options: {}, updatedAt: "2026-11-19T00:00:00Z" };
let values: Map<string, string>;
beforeEach(() => { values = new Map(); vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) }); });
afterEach(() => vi.unstubAllGlobals());

describe("validated persistence boundaries", () => {
  it("upserts a document by ID, migrates its version, and preserves other documents", () => {
    saveDocument(doc);
    saveDocument({ ...doc, id: "other" });
    saveDocument({ ...doc, name: "Updated" });
    expect(loadDocuments()).toMatchObject({ issues: [], documents: [{ id: "other" }, { id: "doc", version: 2, name: "Updated" }] });
    expect(doc.version).toBe(1);
  });
  it.each(["{", "null", "{}", '[{"version":99}]'])("falls back atomically for corrupt stored documents %s", serialized => {
    values.set(DOCUMENTS_KEY, serialized);
    expect(loadDocuments(doc)).toMatchObject({ documents: [{ id: "doc", version: 2 }], issues: [{ code: "storage.documents_invalid" }] });
    expect(loadDocuments({ ...doc, id: "" }).documents).toEqual([]);
  });
  it("keeps the active document ID independent of saved contents", () => {
    expect(getActiveDocumentId()).toBeNull();
    setActiveDocumentId("doc");
    expect(getActiveDocumentId()).toBe("doc");
    values.set(ACTIVE_DOCUMENT_KEY, "");
    expect(getActiveDocumentId()).toBeNull();
    expect(() => setActiveDocumentId("")).toThrow("required");
  });
  it("rejects invalid documents before altering browser storage", () => {
    expect(() => saveDocument({ ...doc, id: "" })).toThrow("Cannot save document");
    expect(values.size).toBe(0);
  });
  it("reports duplicate template IDs and preserves the original template", () => {
    const template = createTemplate(doc, "Original", () => "same", () => "2026-11-19T00:00:00Z");
    saveTemplate(template);
    expect(() => saveTemplate({ ...template, name: "Overwrite" })).toThrow(TemplateIdCollisionError);
    expect(loadTemplates().templates[0].name).toBe("Original");
    expect(() => saveTemplate({ ...template, scope: "global" } as never)).toThrow("Cannot save template");
  });
  it.each(["{", "null", "{}", "[null]"])("rejects invalid persisted templates %s", serialized => {
    values.set(TEMPLATES_KEY, serialized);
    expect(loadTemplates()).toMatchObject({ templates: [], issues: [{ code: "storage.templates_invalid" }] });
  });
  it("round-trips authored documents and templates with migration", () => {
    expect(importDocument(exportDocument(doc))).toMatchObject({ success: true, value: { version: 2, root: doc.root } });
    const template = createTemplate(doc, "Reusable", () => "template", () => "2026-11-19T00:00:00Z");
    expect(importTemplate(exportTemplate(template))).toEqual({ success: true, value: template, issues: [] });
  });
  it("rejects malformed and invalid JSON imports and invalid exports", () => {
    expect(importDocument("{")).toMatchObject({ success: false, issues: [{ code: "import.document_invalid" }] });
    expect(importTemplate("{")).toMatchObject({ success: false, issues: [{ code: "import.template_invalid" }] });
    expect(importDocument("null").success).toBe(false);
    expect(importTemplate("null").success).toBe(false);
    expect(() => exportDocument({ ...doc, id: "" })).toThrow("Cannot export document");
    expect(() => exportTemplate({} as never)).toThrow("Cannot export template");
  });
});

describe("version snapshot retention", () => {
  it("migrates valid entries while skipping corrupt entries without discarding good snapshots", () => {
    values.set(versionSnapshotsKey(doc.id), JSON.stringify([null, {}, { id: "bad", name: "Bad", createdAt: "now", document: {} }, { id: "good", name: "Good", createdAt: "now", document: doc }]));
    expect(loadVersionSnapshots(doc.id)).toMatchObject([{ id: "good", document: { version: 2 } }]);
  });
  it("retains the newest 25 snapshots and removes only the chosen version", () => {
    for (let index = 0; index < MAX_VERSION_SNAPSHOTS + 2; index++) addVersionSnapshot(doc.id, { id: `v${index}`, name: "Version", createdAt: "now", document: doc });
    expect(loadVersionSnapshots(doc.id).map(entry => entry.id)).toEqual(Array.from({ length: 25 }, (_, i) => `v${i + 2}`));
    expect(removeVersionSnapshot(doc.id, "v10")).toHaveLength(24);
    expect(loadVersionSnapshots(doc.id).some(entry => entry.id === "v10")).toBe(false);
  });
  it.each(["{", "null", "{}"])("recovers from corrupt version store %s", serialized => {
    values.set(versionSnapshotsKey(doc.id), serialized);
    expect(loadVersionSnapshots(doc.id)).toEqual([]);
  });
});

describe("custom style kit validation and retention", () => {
  it("normalizes names, upserts a kit, and deletes only the selected kit", () => {
    expect(saveCustomStyleKit(kit)[0].name).toBe("Brand");
    saveCustomStyleKit({ ...kit, id: "second" });
    expect(saveCustomStyleKit({ ...kit, name: "Updated" }).map(entry => entry.name)).toEqual(["Updated", "Brand"]);
    expect(deleteCustomStyleKit("kit").map(entry => entry.id)).toEqual(["second"]);
    expect(loadCustomStyleKits()).toHaveLength(1);
  });
  it("skips malformed and duplicate saved kits while keeping the first valid record", () => {
    values.set(CUSTOM_STYLE_KITS_KEY, JSON.stringify([null, [], {}, { ...kit, id: "bad\n" }, { ...kit, updatedAt: "bad" }, { ...kit, options: { palette: "bad" } }, kit, { ...kit, name: "Duplicate" }]));
    expect(loadCustomStyleKits().map(entry => entry.name)).toEqual(["Brand"]);
  });
  it.each(["{", "null", "{}", "x".repeat(1024 * 1024 + 1)])("treats malformed or oversized kit storage as empty", serialized => {
    values.set(CUSTOM_STYLE_KITS_KEY, serialized);
    expect(loadCustomStyleKits()).toEqual([]);
  });
  it("does not evict configurations at the limit and still allows updating an existing kit", () => {
    values.set(CUSTOM_STYLE_KITS_KEY, JSON.stringify(Array.from({ length: MAX_CUSTOM_STYLE_KITS + 1 }, (_, i) => ({ ...kit, id: `kit-${i}` }))));
    expect(loadCustomStyleKits()).toHaveLength(50);
    expect(() => saveCustomStyleKit(kit)).toThrow("up to 50");
    expect(saveCustomStyleKit({ ...kit, id: "kit-0", name: "Updated" })[0].name).toBe("Updated");
  });
  it("fails saves when storage is unavailable or unreadable", () => {
    vi.stubGlobal("localStorage", undefined);
    expect(loadCustomStyleKits()).toEqual([]);
    expect(() => saveCustomStyleKit(kit)).toThrow("unavailable");
    vi.stubGlobal("localStorage", { getItem() { throw new Error("permission denied"); }, setItem() { throw new Error("must not write"); } });
    expect(() => saveCustomStyleKit(kit)).toThrow("permission denied");
    expect(() => saveCustomStyleKit({ ...kit, name: "" })).toThrow("invalid");
  });
});
