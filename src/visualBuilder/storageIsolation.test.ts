import { afterEach, describe, expect, it, vi } from "vitest";
import { saveTemplate, loadTemplates } from "../visual-engine/persistence/localStorage";
import { addVersionSnapshot, loadVersionSnapshots } from "../visual-engine/persistence/versionSnapshots";
import { saveCustomStyleKit, loadCustomStyleKits } from "../visual-engine/persistence/customStyleKits";
import { createTemplate } from "../visual-engine/templates/templateOperations";
import type { ComponentDocument } from "../visual-engine/model";

const doc: ComponentDocument = { version: 2, id: "same-doc", name: "Products", root: { id: "root", type: "section", children: [] } };
afterEach(() => vi.unstubAllGlobals());
describe("project-scoped local builder content", () => {
  it("isolates templates, versions and kits for identical IDs in two projects", () => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
    saveTemplate(createTemplate(doc, "Reusable card", () => "template", () => "2026-11-03T12:00:00.000Z"), "acme/shop");
    addVersionSnapshot("same-doc", { id: "v1", name: "Before edits", createdAt: "2026-11-03T12:00:00.000Z", document: doc }, "acme/shop");
    saveCustomStyleKit({ version: 1, id: "kit", name: "Brand", preset: "editorial", options: {}, updatedAt: "2026-11-03T12:00:00.000Z" }, "acme/shop");
    expect(loadTemplates("acme/shop").templates).toHaveLength(1);
    expect(loadVersionSnapshots("same-doc", "acme/shop")).toHaveLength(1);
    expect(loadCustomStyleKits("acme/shop")).toHaveLength(1);
    expect(loadTemplates("acme/inventory").templates).toHaveLength(0);
    expect(loadVersionSnapshots("same-doc", "acme/inventory")).toHaveLength(0);
    expect(loadCustomStyleKits("acme/inventory")).toHaveLength(0);
  });
  it("recovers from corrupt or unavailable storage without discarding supplied content", () => {
    vi.stubGlobal("localStorage", { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } });
    expect(loadTemplates("shop").templates).toEqual([]);
    expect(loadVersionSnapshots("same-doc", "shop")).toEqual([]);
    expect(loadCustomStyleKits("shop")).toEqual([]);
    expect(() => addVersionSnapshot("same-doc", { id: "v", name: "Version", createdAt: "now", document: doc }, "shop")).toThrow("blocked");
  });
});
