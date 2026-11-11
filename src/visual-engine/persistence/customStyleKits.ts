import { scopedStorageKey } from "../host/storage";
import { isDesignPresetId, type DesignPresetId } from "../model/designPresets";
import { parseDesignStyleOptions, type DesignStyleOptions } from "../model/designStyle";

export interface CustomStyleKit {
  version: 1;
  id: string;
  name: string;
  preset: DesignPresetId;
  options: DesignStyleOptions;
  updatedAt: string;
}

export const CUSTOM_STYLE_KITS_KEY = "visual-engine:custom-style-kits:v1";
export const MAX_CUSTOM_STYLE_KITS = 50;
const MAX_STORAGE_LENGTH = 1024 * 1024;

/** Browser-local reusable configuration; corrupt or unsupported records are ignored. */
export function loadCustomStyleKits(namespace = ""): CustomStyleKit[] {
  try {
    return readKits(browserStorage(namespace));
  } catch {
    return [];
  }
}

/** Upserts a validated kit without evicting existing user configurations. */
export function saveCustomStyleKit(kit: CustomStyleKit, namespace = ""): CustomStyleKit[] {
  const parsed = parseKit(kit);
  if (!parsed) throw new Error("Cannot save this style kit: its name or configuration is invalid.");

  const storage = browserStorage(namespace);
  const existing = readKits(storage);
  const index = existing.findIndex(({ id }) => id === parsed.id);
  if (index < 0) {
    if (existing.length >= MAX_CUSTOM_STYLE_KITS) {
      throw new Error(`You can save up to ${MAX_CUSTOM_STYLE_KITS} custom style kits. Delete a saved kit before adding another.`);
    }
    existing.push(parsed);
  } else {
    existing[index] = parsed;
  }
  storage.setItem(CUSTOM_STYLE_KITS_KEY, JSON.stringify(existing));
  return existing;
}

export function deleteCustomStyleKit(id: string, namespace = ""): CustomStyleKit[] {
  const storage = browserStorage(namespace);
  const remaining = readKits(storage).filter((kit) => kit.id !== id);
  storage.setItem(CUSTOM_STYLE_KITS_KEY, JSON.stringify(remaining));
  return remaining;
}

function browserStorage(namespace: string): Pick<Storage, "getItem" | "setItem"> {
  if (typeof localStorage === "undefined") {
    throw new Error("Browser storage is unavailable. Custom style kits could not be saved.");
  }
  return { getItem: key => localStorage.getItem(scopedStorageKey(key, namespace)), setItem: (key, value) => localStorage.setItem(scopedStorageKey(key, namespace), value) };
}

function readKits(storage: Pick<Storage, "getItem" | "setItem">): CustomStyleKit[] {
  // Keep storage access outside the parse catch so failed reads cannot become successful writes.
  const raw = storage.getItem(CUSTOM_STYLE_KITS_KEY);
  if (raw === null || raw.length > MAX_STORAGE_LENGTH) return [];
  let entries: unknown;
  try {
    entries = JSON.parse(raw) as unknown;
  } catch {
    return [];
  }
  if (!Array.isArray(entries)) return [];

  const kits: CustomStyleKit[] = [];
  const ids = new Set<string>();
  for (const entry of entries) {
    const kit = parseKit(entry);
    if (!kit || ids.has(kit.id)) continue;
    kits.push(kit);
    ids.add(kit.id);
    if (kits.length >= MAX_CUSTOM_STYLE_KITS) break;
  }
  return kits;
}

function parseKit(input: unknown): CustomStyleKit | undefined {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return undefined;
  const { version, id, name, preset, options, updatedAt } = input as Record<string, unknown>;
  if (version !== 1
    || typeof id !== "string" || id.length === 0 || id.length > 128 || id.trim() !== id || Array.from(id).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
    || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 80
    || !isDesignPresetId(preset)
    || typeof updatedAt !== "string" || updatedAt.length > 64 || !Number.isFinite(Date.parse(updatedAt))) return undefined;

  const parsedOptions = parseDesignStyleOptions(options);
  if (!parsedOptions.success) return undefined;
  return {
    version: 1,
    id,
    name: name.trim(),
    preset,
    options: JSON.parse(JSON.stringify(parsedOptions.value)) as DesignStyleOptions,
    updatedAt,
  };
}
