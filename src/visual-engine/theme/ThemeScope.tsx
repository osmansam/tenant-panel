"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { resolveSiteTheme } from "./defaults";
import { serializeSiteThemeCss } from "./css";
import type {
  ResolvedSiteTheme,
  ResolvedThemePalette,
  SiteTheme,
  ThemeMode,
  ThemePaletteName,
} from "./types";

export interface ActiveTheme {
  theme: ResolvedSiteTheme;
  palette: ThemePaletteName;
  values: ResolvedThemePalette;
}

export interface ThemeScopeProps {
  theme?: SiteTheme;
  palette?: ThemePaletteName;
  /** Updates resolved consumers without forcing a local data-theme override. */
  activePalette?: ThemePaletteName;
  defaultMode?: ThemeMode;
  children: ReactNode;
  scopeId?: string;
}

const ActiveThemeContext = createContext<ActiveTheme | null>(null);

export function ThemeScope({
  theme,
  palette,
  activePalette,
  defaultMode,
  children,
  scopeId = "site-theme",
}: ThemeScopeProps) {
  const safeScopeId = normalizeScopeId(scopeId);
  const resolved = useMemo(() => {
    const completed = resolveSiteTheme(theme);
    return defaultMode === undefined ? completed : { ...completed, defaultMode };
  }, [defaultMode, theme]);
  const contextPalette = palette ?? activePalette ?? (resolved.defaultMode === "dark" ? "dark" : "light");
  const active = useMemo<ActiveTheme>(() => ({
    theme: resolved,
    palette: contextPalette,
    values: resolved.palettes[contextPalette],
  }), [contextPalette, resolved]);
  const css = useMemo(() => serializeSiteThemeCss(resolved, safeScopeId), [resolved, safeScopeId]);

  return (
    <>
      <style data-ozmi-site-theme={safeScopeId} dangerouslySetInnerHTML={{ __html: css }} />
      <ActiveThemeContext.Provider value={active}>
        <div
          className="ozmi-site-theme isolate"
          data-theme-scope={safeScopeId}
          data-default-mode={resolved.defaultMode}
          data-theme={palette}
        >
          {children}
        </div>
      </ActiveThemeContext.Provider>
    </>
  );
}

export function useActiveTheme(): ActiveTheme {
  const value = useOptionalActiveTheme();
  if (value === null) throw new Error("useActiveTheme must be used within ThemeScope");
  return value;
}

export function useOptionalActiveTheme(): ActiveTheme | null {
  return useContext(ActiveThemeContext);
}

function normalizeScopeId(value: string): string {
  const normalized = value.trim().toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "site-theme";
}
