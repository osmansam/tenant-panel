import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeMode, ThemePaletteName } from "../theme";
interface ThemeState { mode: ThemeMode; resolved: ThemePaletteName; canSwitch: boolean; setMode(mode: ThemeMode): void }
const ThemeContext = createContext<ThemeState | null>(null);
export function ThemeProvider({ defaultMode, fixedMode, children }: { projectKey: string; defaultMode: ThemeMode; fixedMode?: ThemePaletteName; persist?: boolean; children: ReactNode }) {
  const [requestedMode, setRequestedMode] = useState<ThemeMode>(defaultMode);
  const mode = fixedMode ?? requestedMode;
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    if (mode !== "system" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [mode]);
  return <ThemeContext.Provider value={{ mode, resolved: mode === "system" ? systemDark ? "dark" : "light" : mode, canSwitch: fixedMode === undefined, setMode: next => { if (fixedMode === undefined) setRequestedMode(next); } }}>{children}</ThemeContext.Provider>;
}
export const useOptionalThemeMode = () => useContext(ThemeContext);
export function useThemeMode(): ThemeState {
  const state = useOptionalThemeMode();
  if (!state) throw new Error("Visual theme provider is missing");
  return state;
}
