export const OZMISHOW_ICON_IDS = [
  "academic-cap",
  "arrow-right",
  "banknotes",
  "book-open",
  "briefcase",
  "building-library",
  "calendar-days",
  "check",
  "check-badge",
  "clock",
  "envelope",
  "globe-alt",
  "heart",
  "home",
  "language",
  "light-bulb",
  "link",
  "map-pin",
  "megaphone",
  "phone",
  "play",
  "scale",
  "shield-check",
  "sparkles",
  "star",
  "user",
  "user-group",
] as const;

export type OzmishowIconId = (typeof OZMISHOW_ICON_IDS)[number];

const iconIds = new Set<string>(OZMISHOW_ICON_IDS);

export function isOzmishowIconId(value: unknown): value is OzmishowIconId {
  return typeof value === "string" && iconIds.has(value);
}
