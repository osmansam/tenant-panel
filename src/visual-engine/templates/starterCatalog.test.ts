import { describe, expect, it } from "vitest";
import { ALL_CURATED_STARTERS } from "../fixtures/templateStarters";
import { STARTER_CATALOG, loadStarter } from "./starterCatalog";
import { migrateComponentDocument } from "../model/migrations";
import { exportDocument, importDocument } from "../persistence/importExport";

describe("lazy starter catalog", () => {
  it("preserves every starter and its display name without eagerly storing snapshots", () => {
    expect(STARTER_CATALOG.map(({ id, name }) => ({ id, name }))).toEqual(
      ALL_CURATED_STARTERS.map(({ id, name }) => ({ id, name })),
    );
    expect(STARTER_CATALOG.every(entry => !("root" in entry))).toBe(true);
  });

  it("resolves each selected starter to its original document", async () => {
    for (let index = 0; index < STARTER_CATALOG.length; index++) {
      expect(await loadStarter(STARTER_CATALOG[index])).toEqual(ALL_CURATED_STARTERS[index]);
    }
  });

  it("migrates and round-trips every authored starter without changing its source", async () => {
    for (const entry of STARTER_CATALOG) {
      const original = await loadStarter(entry);
      const before = JSON.stringify(original);
      const migrated = migrateComponentDocument(original);
      expect(migrated.success, `${entry.id}: ${JSON.stringify(migrated.issues)}`).toBe(true);
      if (!migrated.success) continue;
      expect(importDocument(exportDocument(original)), entry.id).toEqual(migrated);
      expect(JSON.stringify(original), `${entry.id}: source was mutated`).toBe(before);
      expect(migrated.value.id).toBe(entry.id);
      expect(migrated.value.version).toBe(2);
    }
  });
});
