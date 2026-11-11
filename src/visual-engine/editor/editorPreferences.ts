/**
 * Editor UI preferences. These are never part of a document and live under a
 * dedicated namespaced key so they can't collide with document storage.
 */
export const INSPECTOR_PREFERENCES_KEY = "visual-builder:inspector-preferences";
export const THEME_PREVIEW_PREFERENCE_KEY = "visual-builder:theme-preview:v2";

export const INSPECTOR_WIDTH = { min: 240, max: 450, default: 300 } as const;

export interface InspectorPreferences {
  width: number;
  collapsed: boolean;
}

export const DEFAULT_INSPECTOR_PREFERENCES: InspectorPreferences = { width: INSPECTOR_WIDTH.default, collapsed: false };

export function clampInspectorWidth(width: number): number {
  if (!Number.isFinite(width)) return INSPECTOR_WIDTH.default;
  return Math.min(INSPECTOR_WIDTH.max, Math.max(INSPECTOR_WIDTH.min, Math.round(width)));
}

/** Client-only. Returns defaults on the server, without storage, or for malformed values. */
export function loadInspectorPreferences(): InspectorPreferences {
  if (typeof window === "undefined") return DEFAULT_INSPECTOR_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(INSPECTOR_PREFERENCES_KEY);
    if (raw === null) return DEFAULT_INSPECTOR_PREFERENCES;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_INSPECTOR_PREFERENCES;
    const candidate = parsed as Record<string, unknown>;
    return {
      width: typeof candidate.width === "number" ? clampInspectorWidth(candidate.width) : INSPECTOR_WIDTH.default,
      collapsed: candidate.collapsed === true,
    };
  } catch {
    return DEFAULT_INSPECTOR_PREFERENCES;
  }
}

export function saveInspectorPreferences(preferences: InspectorPreferences): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(INSPECTOR_PREFERENCES_KEY, JSON.stringify({
      width: clampInspectorWidth(preferences.width),
      collapsed: preferences.collapsed,
    }));
  } catch {
    // Preferences are best-effort; storage may be unavailable or full.
  }
}

export function loadThemePreviewPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    const value = window.localStorage.getItem(THEME_PREVIEW_PREFERENCE_KEY);
    if (value === "dark" || value === "light") return value;
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  } catch {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }
}

export function saveThemePreviewPreference(value: "light" | "dark"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_PREVIEW_PREFERENCE_KEY, value);
  } catch {
    // Editor preview preferences are best-effort and never affect visitor storage.
  }
}
