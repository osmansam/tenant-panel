import type { ComponentDocument } from "../model";
import { starterEntries, starterModules } from "./starterCatalog.generated";

export interface StarterCatalogEntry {
  id: string;
  name: string;
  kind?: string;
  tags?: readonly string[];
  source: number;
  exportName: string;
  index: number | null;
}

export const STARTER_CATALOG: readonly StarterCatalogEntry[] = starterEntries;

export async function loadStarter(entry: StarterCatalogEntry): Promise<ComponentDocument> {
  const module = await starterModules[entry.source]();
  const exported = module[entry.exportName];
  const doc: unknown = entry.index === null ? exported : (exported as unknown[])[entry.index];
  if (!doc || typeof doc !== "object" || !("id" in doc) || doc.id !== entry.id || !("root" in doc)) {
    throw new Error("Template catalog does not match the fixture. Reload and try again.");
  }
  return doc as ComponentDocument;
}
