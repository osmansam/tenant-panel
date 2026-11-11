"use client";

import {
  CANONICAL_THEME_COLOR_TOKENS,
  DEFAULT_SITE_THEME,
  LEGACY_THEME_COLOR_TOKENS,
  THEME_GRADIENT_TOKENS,
  resolveSiteTheme,
  type EditableThemeColorToken,
  type SiteTheme,
  type ThemeGradient,
  type ThemePalette,
  type ThemePaletteName,
} from "../theme";
import type { GradientPaint } from "../model/paint";
import { ColorPaintControl } from "./ColorPaintControl";
import { GradientPaintControl } from "./GradientPaintControl";
import { humanizeToken } from "./tokenLabels";
import { themeContrastWarnings } from "./themeContrast";

export type ThemeEditorStatus = "clean" | "dirty" | "saving" | "error";

export interface ThemeEditorProps {
  draft: SiteTheme;
  saved: SiteTheme;
  palette: ThemePaletteName;
  status: ThemeEditorStatus;
  error: string | null;
  onPaletteChange(palette: ThemePaletteName): void;
  onChange(theme: SiteTheme): void;
  onSave(theme: SiteTheme): Promise<void> | void;
}

export function ThemeEditor({ draft, saved, palette, status, error, onPaletteChange, onChange, onSave }: ThemeEditorProps) {
  const resolvedDraft = resolveSiteTheme(draft);
  const resolvedSaved = resolveSiteTheme(saved);
  const values = resolvedDraft.palettes[palette];
  const warnings = themeContrastWarnings(resolvedDraft, palette);
  const paletteLabel = palette === "light" ? "Light" : "Dark";

  const updateColor = (token: EditableThemeColorToken, value: string) => {
    const next = structuredClone(draft);
    next.palettes[palette] = { ...next.palettes[palette], [token]: value } as ThemePalette;
    onChange(next);
  };
  const resetColor = (token: EditableThemeColorToken) => updateColor(token, resolvedSaved.palettes[palette][token]);
  const updateGradient = (token: (typeof THEME_GRADIENT_TOKENS)[number], gradient: GradientPaint) => {
    const next = structuredClone(draft);
    next.gradients[palette][token] = gradient as ThemeGradient;
    onChange(next);
  };
  const resetPalette = () => {
    const next = structuredClone(draft);
    next.palettes[palette] = { ...resolvedSaved.palettes[palette] };
    next.gradients[palette] = structuredClone(resolvedSaved.gradients[palette]);
    onChange(next);
  };

  return <section className="vb-theme-editor" aria-label="Site theme editor">
    <header className="vb-theme-editor__header">
      <div>
        <h2>Site theme</h2>
        <p>Edit semantic colors once for every component that uses them.</p>
      </div>
      <button type="button" className="vb-button" onClick={() => onChange(structuredClone(DEFAULT_SITE_THEME))}>Restore built-in defaults</button>
    </header>

    <div className="vb-theme-editor__tabs" role="tablist" aria-label="Theme palette">
      {(["light", "dark"] as const).map((name) => <button
        key={name}
        type="button"
        role="tab"
        aria-selected={palette === name}
        onClick={() => onPaletteChange(name)}
      >{name === "light" ? "Light" : "Dark"}</button>)}
    </div>

    <div className="vb-theme-editor__section-head">
      <h3>{paletteLabel} semantic colors</h3>
      <button type="button" className="vb-button" onClick={resetPalette} aria-label={`Reset ${paletteLabel} palette`}>Reset palette</button>
    </div>
    <div className="vb-theme-editor__tokens">
      {CANONICAL_THEME_COLOR_TOKENS.map((token) => <ThemeColorField
        key={token}
        label={paletteLabel}
        token={token}
        value={values[token]}
        colors={values}
        onChange={(value) => updateColor(token, value)}
        onReset={() => resetColor(token)}
      />)}
    </div>

    <details className="vb-theme-editor__legacy">
      <summary>Legacy colors</summary>
      <p>Compatibility tokens remain editable for existing documents.</p>
      <div className="vb-theme-editor__tokens">
        {LEGACY_THEME_COLOR_TOKENS.map((token) => <ThemeColorField
          key={token}
          label={paletteLabel}
          token={token}
          value={values[token]}
          colors={values}
          onChange={(value) => updateColor(token, value)}
          onReset={() => resetColor(token)}
        />)}
      </div>
    </details>

    <section className="vb-theme-editor__gradients" aria-label={`${paletteLabel} gradients`}>
      <h3>Theme gradients</h3>
      {THEME_GRADIENT_TOKENS.map((token) => <div className="vb-theme-editor__gradient" key={token}>
        <h4>{humanizeToken(token)}</h4>
        <GradientPaintControl
          label={`${paletteLabel} ${token.replace(/-/g, " ")}`}
          value={resolvedDraft.gradients[palette][token]}
          resolvedTokenColors={values}
          onChange={(gradient) => updateGradient(token, gradient)}
        />
      </div>)}
    </section>

    <section className="vb-theme-editor__contrast" aria-label="Contrast checks">
      <h3>Contrast checks</h3>
      {warnings.length === 0 ? <p>No common contrast warnings.</p> : <ul>{warnings.map((warning) => <li key={warning.id}>{warning.message}</li>)}</ul>}
    </section>

    {error ? <p role="alert" className="vb-theme-editor__error">{error}</p> : null}
    <footer className="vb-theme-editor__footer">
      <span role="status">{status === "clean" ? "Saved" : status === "saving" ? "Saving…" : status === "error" ? "Save failed" : "Unsaved theme changes"}</span>
      <button
        type="button"
        className="vb-button vb-button--primary"
        disabled={status === "saving"}
        aria-label={status === "saving" ? "Saving site theme" : "Save site theme"}
        onClick={() => onSave(draft)}
      >{status === "saving" ? "Saving…" : "Save site theme"}</button>
    </footer>
  </section>;
}

function ThemeColorField({ label, token, value, colors, onChange, onReset }: {
  label: string;
  token: EditableThemeColorToken;
  value: string;
  colors: Record<EditableThemeColorToken, string>;
  onChange(value: string): void;
  onReset(): void;
}) {
  return <div className="vb-theme-editor__token">
    <div className="vb-theme-editor__token-head">
      <h4>{humanizeToken(token)}</h4>
      <button type="button" className="vb-button" aria-label={`Reset ${label} ${token}`} onClick={onReset}>Reset</button>
    </div>
    <ColorPaintControl
      label={`${label} ${token}`}
      value={{ kind: "custom", value }}
      resolvedTokenColors={colors}
      allowTokens={false}
      onChange={(color) => { if (color.kind === "custom") onChange(color.value); }}
    />
  </div>;
}
