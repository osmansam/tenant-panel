export const DESIGN_PRESET_IDS = ["editorial", "swiss-minimal", "playful", "luxury", "neo-brutalist", "soft-ui", "terminal", "retro", "nordic", "coastal", "botanical", "art-deco", "midnight", "sunset", "blueprint", "sakura"] as const;
export type DesignPresetId = (typeof DESIGN_PRESET_IDS)[number];

export function isDesignPresetId(input: unknown): input is DesignPresetId {
  return typeof input === "string" && (DESIGN_PRESET_IDS as readonly string[]).includes(input);
}
