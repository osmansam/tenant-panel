"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import type { Breakpoint, ComponentDocument } from "../model";
import { FONT_FAMILIES, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS, LEADING_TOKENS, RADIUS_TOKENS, SHADOW_TOKENS, BORDER_WIDTHS, SPACING_TOKENS } from "../model/styles";
import type { DesignPresetId } from "../model/designPresets";
import { DESIGN_COLOR_TOKENS, parseDesignStyleOptions, type DesignStyleOptions } from "../model/designStyle";
import { applyDesignPreset, DESIGN_STYLE_KITS } from "../operations/designPreset";
import { applyConfiguredDesign, configuredDesignPaletteStyle, DESIGN_PALETTES } from "../operations/designStyle";
import { regenerateNodeIds } from "../operations/duplicateNode";
import { loadCustomStyleKits, saveCustomStyleKit, deleteCustomStyleKit, type CustomStyleKit } from "../persistence/customStyleKits";
import { VisualRenderer } from "../renderer";
import { ThemeScope, type ThemePaletteName } from "../theme";
import { FONT_FAMILY_CLASSES } from "../renderer/styleTokens";
import { contrastRatio } from "./themeContrast";
import { CloseIcon } from "./icons";
import "./style-kit-editor.css";

const tabs = ["Kits", "Colors", "Typography", "Surfaces", "My kits"] as const;
type Tab = typeof tabs[number];
const essentialColors = ["background", "surface", "primary", "primary-foreground", "accent", "text", "text-muted", "border"] as const;
const SAMPLE: ComponentDocument = { version: 2, id: "style-controls", name: "Style controls", root: { id: "style-root", type: "section", children: [
  { id: "h", type: "heading", level: 1, text: "Aa" },
  { id: "t", type: "text", text: "Body" },
  { id: "b", type: "button", label: "Button", href: "#" },
  { id: "c", type: "card", element: "div", children: [] },
] } };
const title = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, " ");
const sizeLabels: Record<string, string> = { "13px": "13 px", sm: "14 px", "15px": "15 px", base: "16 px", lg: "18 px", xl: "20 px", "2xl": "24 px", "30px": "30 px", "4xl": "36 px", "6xl": "60 px" };
const cornerLabels: Record<string, string> = { none: "Square", sm: "Slight · 2 px", md: "Soft · 6 px", lg: "Rounded · 8 px", xl: "Rounded · 12 px", "3xl": "Generous · 24 px", full: "Pill" };
const paddingLabels: Record<string, string> = { "": "Keep current", none: "No padding", xs: "4 px", sm: "8 px", md: "16 px", lg: "24 px", xl: "32 px", "2xl": "48 px" };
const fontLabels: Record<string, string> = { "open-sans": "Open Sans", "noto-serif": "Noto Serif", "playfair-display": "Playfair Display", "system": "System font", "monospace": "Monospace" };
const validHex = (value: string) => /^#[\da-f]{6}$/i.test(value);
const colorInputValue = (value: string) => /^#[\da-f]{3}$/i.test(value) ? `#${value.slice(1).split("").map(c => c + c).join("")}` : validHex(value) ? value : "#000000";

export interface StyleKitEditorProps {
  storageNamespace?: string;
  document: ComponentDocument;
  initialPalette?: ThemePaletteName;
  onApply(document: ComponentDocument): void;
  onClose(): void;
  renderDocument?(document: ComponentDocument, palette: ThemePaletteName, breakpoint: Breakpoint): ReactNode;
}

export function StyleKitEditor({ document: current, initialPalette = "light", onApply, onClose, renderDocument, storageNamespace = "" }: StyleKitEditorProps) {
  const [preset, setPreset] = useState<DesignPresetId>(current.root.designPreset ?? "editorial");
  const [options, setOptions] = useState<DesignStyleOptions>(() => structuredClone(current.root.designStyle ?? {}));
  const [restyle, setRestyle] = useState(false);
  const [lastValidOptions, setLastValidOptions] = useState<DesignStyleOptions>(() => structuredClone(current.root.designStyle ?? {}));
  const [tab, setTab] = useState<Tab>("Kits");
  const [palette, setPalette] = useState<ThemePaletteName>(initialPalette);
  const [breakpoint, setBreakpoint] = useState<"desktop" | "mobile">("desktop");
  const [saved, setSaved] = useState<CustomStyleKit[]>(() => loadCustomStyleKits(storageNamespace));
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [storageError, setStorageError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const parsed = useMemo(() => parseDesignStyleOptions(options), [options]);
  const selectedKit = DESIGN_STYLE_KITS.find(kit => kit.id === preset)!;
  const defaults = useMemo(() => applyDesignPreset(SAMPLE, preset).root.children, [preset]);
  const heading = defaults[0].style?.typography;
  const body = defaults[1].style?.typography;
  const button = defaults[2].style;
  const card = defaults[3].style;
  const safeOptions = parsed.success ? parsed.value : lastValidOptions;
  const colors = configuredDesignPaletteStyle(preset, palette, safeOptions);
  const draft = useMemo(() => applyConfiguredDesign(current, preset, safeOptions, !restyle), [current, preset, safeOptions, restyle]);
  const previewDocument = useMemo(() => {
    let sequence = 0;
    return { ...draft, id: `style-preview-${uid}`, root: regenerateNodeIds(draft.root, () => `style-preview-${uid}-${++sequence}`) as ComponentDocument["root"] };
  }, [draft, uid]);

  useEffect(() => {
    const opener = globalThis.document.activeElement;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    return () => {
      if (dialog?.open) {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      }
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => { if (parsed.success) setLastValidOptions(parsed.value); }, [parsed]);
  useEffect(() => { if (panelRef.current) panelRef.current.scrollTop = 0; }, [tab]);

  const change = <K extends keyof DesignStyleOptions>(key: K, value: DesignStyleOptions[K]) => setOptions(previous => ({ ...previous, [key]: value }));
  const choose = (id: DesignPresetId) => { setPreset(id); setOptions({}); setRestyle(true); setMessage(""); setStorageError(""); };
  const updateColor = (token: typeof DESIGN_COLOR_TOKENS[number], value: string) => setOptions(previous => ({ ...previous, colors: { ...previous.colors, [palette]: { ...previous.colors?.[palette], [token]: value } } }));
  const save = () => {
    if (!parsed.success || !name.trim()) return;
    try {
      const existing = saved.find(kit => kit.name.toLowerCase() === name.trim().toLowerCase());
      const kits = saveCustomStyleKit({ version: 1, id: existing?.id ?? crypto.randomUUID(), name: name.trim(), preset, options: parsed.value, updatedAt: new Date().toISOString() }, storageNamespace);
      setSaved(kits); setStorageError(""); setMessage(`Saved “${name.trim()}” in this browser.`);
    } catch (error) { setMessage(""); setStorageError(error instanceof Error ? error.message : "Could not save this kit. Browser storage may be unavailable."); }
  };
  const remove = (kit: CustomStyleKit) => {
    try { setSaved(deleteCustomStyleKit(kit.id, storageNamespace)); setStorageError(""); setMessage(`Deleted “${kit.name}”.`); }
    catch (error) { setMessage(""); setStorageError(error instanceof Error ? error.message : "Could not delete the saved kit."); }
  };
  const colorField = (token: typeof DESIGN_COLOR_TOKENS[number]) => {
    const value = options.colors?.[palette]?.[token] ?? colors[`--theme-${token}`];
    const label = `${title(palette)} ${title(token)} color`;
    const invalid = !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value);
    return <label className="vb-style-color" key={token}>
      <span>{title(token)}</span><div>
        <input type="color" aria-label={`Pick ${label}`} value={colorInputValue(value)} onChange={event => updateColor(token, event.target.value)} />
        <input aria-label={label} value={value} aria-invalid={invalid} spellCheck={false} onChange={event => updateColor(token, event.target.value)} />
        {options.colors?.[palette]?.[token] !== undefined ? <button type="button" aria-label={`Reset ${label}`} onClick={() => setOptions(previous => {
          const next = structuredClone(previous);
          delete next.colors?.[palette]?.[token];
          return next;
        })}>↺</button> : null}
      </div>
    </label>;
  };
  const contrast = [["text", "background"], ["text", "surface"], ["primary-foreground", "primary"]].flatMap(([foreground, background]) => {
    const ratio = contrastRatio(colors[`--theme-${foreground}`], colors[`--theme-${background}`]);
    return ratio !== null && ratio < 4.5 ? [`${title(foreground)} on ${background}: ${ratio.toFixed(1)}:1. Try a stronger contrast.`] : [];
  });

  return <dialog ref={dialogRef} className="vb-style-editor" aria-label="Style Kit editor" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => event.stopPropagation()}>
    <header className="vb-style-editor__header">
      <div><span className="vb-style-editor__eyebrow">DESIGN SYSTEM</span><h2>Style Kit editor</h2><p>Find a look. Make it yours.</p></div>
      <button type="button" className="vb-icon-button" aria-label="Close Style Kit editor" onClick={onClose}><CloseIcon /></button>
    </header>
    <div className="vb-style-editor__body">
      <aside className="vb-style-editor__controls">
        <div className="vb-style-editor__tabs" role="tablist" aria-label="Style settings">
          {tabs.map((item, index) => <button type="button" key={item} role="tab" aria-selected={tab === item} tabIndex={tab === item ? 0 : -1} id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel`} onClick={() => setTab(item)} onKeyDown={event => {
            const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
            const next = direction ? (index + direction + tabs.length) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
            if (next === null) return;
            event.preventDefault(); setTab(tabs[next]); globalThis.document.getElementById(`${uid}-tab-${next}`)?.focus();
          }}>{item}</button>)}
        </div>
        <div ref={panelRef} className="vb-style-editor__panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${tabs.indexOf(tab)}`}>
          {tab === "Kits" ? <>
            <h3>A starting point for every idea</h3><p className="vb-style-editor__hint">Choose a kit, then explore its colors and details. Your content and layout stay in place.</p>
            <div className="vb-style-editor__kits">{DESIGN_STYLE_KITS.map(kit => {
              const c = configuredDesignPaletteStyle(kit.id, "light");
              const type = applyDesignPreset(SAMPLE, kit.id).root.children[0].style?.typography?.family;
              return <button key={kit.id} type="button" aria-label={`Choose ${kit.name}`} aria-pressed={preset === kit.id} className="vb-style-card" onClick={() => choose(kit.id)}>
                <span className={`vb-style-card__sample ${type ? FONT_FAMILY_CLASSES[type] : ""}`} style={{ background: c["--theme-background"], color: c["--theme-text"] }}>Aa<span>{["primary", "accent", "surface-muted"].map(token => <i key={token} style={{ background: c[`--theme-${token}`] }} />)}</span></span>
                <strong>{kit.name}</strong><small>{kit.description}</small>
              </button>;
            })}</div>
          </> : null}
          {tab === "Colors" ? <>
            <h3>Color stories</h3><p className="vb-style-editor__hint">Each palette includes light and dark colors. Fine-tune either version below. Colors update elements using theme roles; custom artwork keeps its own colors.</p>
            <div className="vb-style-palettes">{DESIGN_PALETTES.map(choice => {
              const c = configuredDesignPaletteStyle(preset, palette, { palette: choice.id });
              return <button type="button" key={choice.id} aria-label={`${choice.name} palette`} aria-pressed={(options.palette ?? "original") === choice.id} onClick={() => setOptions(previous => { const { colors, ...rest } = previous; return { ...rest, palette: choice.id }; })}>
                <span>{["background", "primary", "accent", "text"].map(token => <i key={token} style={{ background: c[`--theme-${token}`] }} />)}</span>{choice.name}
              </button>;
            })}</div>
            <div className="vb-style-editor__mode" role="group" aria-label="Edit color mode">{(["light", "dark"] as const).map(mode => <button type="button" key={mode} aria-pressed={mode === palette} onClick={() => setPalette(mode)}>{title(mode)}</button>)}</div>
            <div className="vb-style-editor__fields">{essentialColors.map(colorField)}</div>
            <details className="vb-style-editor__advanced"><summary>More color roles</summary><div className="vb-style-editor__fields">{DESIGN_COLOR_TOKENS.filter(token => !(essentialColors as readonly string[]).includes(token)).map(colorField)}</div></details>
            {contrast.length ? <div className="vb-style-editor__contrast" role="status"><strong>Check readability</strong>{contrast.map(text => <p key={text}>{text}</p>)}</div> : <p className="vb-style-editor__hint">Text and primary button contrast look good.</p>}
          </> : null}
          {tab === "Typography" ? <>
            <h3>Give your words a voice</h3><p className="vb-style-editor__hint">These settings update headings and body copy across this design.</p>
            <div className="vb-style-editor__fields">
              <Choice label="Heading font" values={FONT_FAMILIES} labels={fontLabels} value={options.headingFont ?? heading?.family ?? "geist"} onChange={value => change("headingFont", value)} />
              <Choice label="Body font" values={FONT_FAMILIES} labels={fontLabels} value={options.bodyFont ?? body?.family ?? "geist"} onChange={value => change("bodyFont", value)} />
              <Choice label="Heading size" values={TYPOGRAPHY_SIZES} labels={sizeLabels} value={options.headingSize ?? heading?.size ?? "4xl"} onChange={value => change("headingSize", value)} />
              <Choice label="Body size" values={TYPOGRAPHY_SIZES} labels={sizeLabels} value={options.bodySize ?? body?.size ?? "base"} onChange={value => change("bodySize", value)} />
              <Choice label="Heading weight" values={TYPOGRAPHY_WEIGHTS} value={options.headingWeight ?? heading?.weight ?? "normal"} onChange={value => change("headingWeight", value)} />
              <Choice label="Body line height" values={LEADING_TOKENS} value={options.bodyLeading ?? body?.leading ?? "relaxed"} onChange={value => change("bodyLeading", value)} />
            </div>
          </> : null}
          {tab === "Surfaces" ? <>
            <h3>The finishing touches</h3><p className="vb-style-editor__hint">Shape buttons and cards, including expandable project cards.</p>
            <div className="vb-style-editor__fields">
              <Choice label="Button corners" values={RADIUS_TOKENS} labels={cornerLabels} value={options.buttonRadius ?? button?.border?.radius ?? "full"} onChange={value => change("buttonRadius", value)} />
              <Choice label="Card corners" values={RADIUS_TOKENS} labels={cornerLabels} value={options.cardRadius ?? card?.border?.radius ?? "xl"} onChange={value => change("cardRadius", value)} />
              <Choice label="Shadows" values={SHADOW_TOKENS} labels={{ none: "None", sm: "Subtle", md: "Soft", lg: "Lifted", xl: "Strong" }} value={options.shadow ?? card?.border?.shadow ?? "none"} onChange={value => change("shadow", value)} />
              <Choice label="Border width" values={BORDER_WIDTHS} labels={{ none: "No border", hairline: "1 px", thin: "2 px" }} value={options.borderWidth ?? card?.border?.width ?? "hairline"} onChange={value => change("borderWidth", value)} />
              <Choice label="Button padding" values={["", ...SPACING_TOKENS]} labels={paddingLabels} value={options.buttonPadding ?? ""} onChange={value => setOptions(previous => { const { buttonPadding, ...rest } = previous; return value ? { ...rest, buttonPadding: value } : rest; })} />
              <Choice label="Card padding" values={["", ...SPACING_TOKENS]} labels={paddingLabels} value={options.cardPadding ?? ""} onChange={value => setOptions(previous => { const { cardPadding, ...rest } = previous; return value ? { ...rest, cardPadding: value } : rest; })} />
            </div>
          </> : null}
          {tab === "My kits" ? <>
            <h3>Your own collection</h3><p className="vb-style-editor__hint">Save these settings for another design. Kits are stored in this browser. Saving an existing name updates that kit.</p>
            <form className="vb-style-editor__save" onSubmit={event => { event.preventDefault(); save(); }}><label>Custom kit name<input value={name} maxLength={80} placeholder="e.g. My studio" onChange={event => setName(event.target.value)} /></label><button type="submit" className="vb-button vb-button--primary" disabled={!name.trim() || !parsed.success}>Save custom kit</button></form>
            {saved.length ? <ul className="vb-style-saved">{saved.map(kit => <li key={kit.id}><div><strong>{kit.name}</strong><small>{DESIGN_STYLE_KITS.find(item => item.id === kit.preset)?.name}</small></div><button type="button" className="vb-button" aria-label={`Use ${kit.name}`} onClick={() => { setPreset(kit.preset); setOptions(structuredClone(kit.options)); setRestyle(true); setName(kit.name); setMessage(`Previewing “${kit.name}”.`); setStorageError(""); }}>Use</button><button type="button" className="vb-button" aria-label={`Delete ${kit.name}`} onClick={() => remove(kit)}>Delete</button></li>)}</ul> : <p className="vb-style-editor__empty">Your saved kits will appear here.</p>}
          </> : null}
          {storageError ? <p role="alert" className="vb-style-editor__error">{storageError}</p> : null}
          {message ? <p role="status" className="vb-style-editor__hint">{message}</p> : null}
        </div>
      </aside>
      <section className="vb-style-editor__preview" aria-label="Style preview">
        <div className="vb-style-editor__preview-head"><div><strong>{selectedKit.name}</strong><small>Live preview · {current.name}</small></div>
          <div className="vb-style-editor__mode" role="group" aria-label="Style preview size">{(["desktop", "mobile"] as const).map(size => <button type="button" key={size} aria-pressed={size === breakpoint} onClick={() => setBreakpoint(size)}>{title(size)}</button>)}</div>
          <div className="vb-style-editor__mode" role="group" aria-label="Style preview colors">{(["light", "dark"] as const).map(mode => <button type="button" key={mode} aria-label={`Preview style ${mode}`} aria-pressed={mode === palette} onClick={() => setPalette(mode)}>{title(mode)}</button>)}</div>
        </div>
        <div className="vb-style-editor__preview-scroll"><div className={`vb-style-editor__preview-page vb-style-editor__preview-page--${breakpoint}`}>
          <div inert="" data-testid="style-kit-preview">{renderDocument ? renderDocument(previewDocument, palette, breakpoint) : <ThemeScope palette={palette}><VisualRenderer document={previewDocument} mode="canvas" breakpoint={breakpoint} /></ThemeScope>}</div>
          {current.root.children.length === 0 ? <p className="vb-style-editor__empty">Add content to your design to see its style here.</p> : null}
        </div></div>
      </section>
    </div>
    <footer className="vb-style-editor__footer">
      <div>{parsed.success ? <p>Draft changes apply only when you’re ready.</p> : <p role="alert" className="vb-style-editor__error">{parsed.issues[0]?.message ?? "Check the style settings."}</p>}<button type="button" className="vb-style-editor__reset" aria-label="Reset kit settings" onClick={() => { setOptions({}); setRestyle(true); setStorageError(""); setMessage(""); }}>Reset kit settings</button></div>
      <div><button type="button" className="vb-button" onClick={onClose}>Cancel</button><button type="button" className="vb-button vb-button--primary" disabled={!parsed.success} onClick={() => { if (parsed.success) onApply(draft); }}>Apply style</button></div>
    </footer>
  </dialog>;
}

function Choice<T extends string>({ label, values, labels, value, onChange }: { label: string; values: readonly T[]; labels?: Record<string, string>; value: T; onChange(value: T): void }) {
  return <label className="vb-style-choice"><span>{label}</span><select value={value} onChange={event => onChange(event.target.value as T)}>{values.map(item => <option key={item} value={item}>{labels?.[item] ?? title(item)}</option>)}</select></label>;
}
