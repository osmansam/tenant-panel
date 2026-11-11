"use client";

import type { Breakpoint } from "../model";
import { BreakpointSwitcher } from "./BreakpointSwitcher";
import { DotsIcon, PanelRightIcon, RedoIcon, UndoIcon } from "./icons";
import { Menu, MenuItem, MenuSeparator } from "./Menu";
import type { VisualBuilderState } from "./types";
import type { ThemePaletteName } from "../theme";
import type { DesignPresetId } from "../model/designPresets";
import { DESIGN_STYLE_KITS } from "../operations/designPreset";

export interface EditorToolbarProps {
  documentName: string;
  canCopyStyle?: boolean;
  painterActive?: boolean;
  onCopyStyle?(): void;
  status: VisualBuilderState["status"];
  breakpoint: Breakpoint;
  canUndo: boolean;
  canRedo: boolean;
  inspectorCollapsed: boolean;
  onToggleInspector(): void;
  onBreakpointChange(breakpoint: Breakpoint): void;
  onUndo(): void;
  onRedo(): void;
  onSave(): void;
  onPreview(): void;
  onReset(): void;
  onOpenTemplates(): void;
  onOpenDocumentTools(): void;
  onOpenVersions?(): void;  themePalette?: ThemePaletteName;
  onThemePaletteChange?(palette: ThemePaletteName): void;
  onOpenTheme?(): void;
  onApplyEditorialStyle?(): void;
  onApplyDesignStyle?(preset: DesignPresetId): void;
  onOpenStyleEditor?(): void;
  motionOpen?: boolean;
  onToggleMotion?(): void;
}

export function EditorToolbar({
  documentName,
  canCopyStyle, painterActive, onCopyStyle,
  status,
  breakpoint,
  canUndo,
  canRedo,
  inspectorCollapsed,
  onToggleInspector,
  onBreakpointChange,
  onUndo,
  onRedo,
  onSave,
  onPreview,
  onReset,
  onOpenTemplates,
  onOpenDocumentTools,
  onOpenVersions,  themePalette,
  onThemePaletteChange,
  onOpenTheme,
  onApplyEditorialStyle,
  onApplyDesignStyle,
  onOpenStyleEditor,
  motionOpen,
  onToggleMotion,
}: EditorToolbarProps) {
  return (
    <header className="vb-toolbar">
      <div className="vb-toolbar__identity">
        <p>Visual component engine</p>
        <h1>{documentName}</h1>
      </div>

      <BreakpointSwitcher value={breakpoint} onChange={onBreakpointChange} />

      <div className="vb-toolbar__actions">
        {onToggleMotion ? <button type="button" className="vb-button" aria-pressed={motionOpen ?? false} onClick={onToggleMotion}>Motion</button> : null}
        {onOpenStyleEditor ? <button type="button" className="vb-button" onClick={onOpenStyleEditor}>Styles</button> : null}
        {onApplyDesignStyle || onApplyEditorialStyle ? <Menu label="Design style" trigger="Aa" triggerTitle="Design style">
          {onOpenStyleEditor ? <><MenuItem label="Customize style kits…" onSelect={onOpenStyleEditor} /><MenuSeparator /></> : null}
          {onApplyDesignStyle ? DESIGN_STYLE_KITS.map(kit => <MenuItem key={kit.id} label={`${kit.name} · ${kit.description}`} ariaLabel={`Apply ${kit.name} style`} onSelect={() => onApplyDesignStyle(kit.id)} />)
            : <MenuItem label="Editorial · Geist + Noto Serif" ariaLabel="Apply Editorial style" onSelect={onApplyEditorialStyle!} />}
        </Menu> : null}
        {themePalette !== undefined && onThemePaletteChange !== undefined ? <div className="vb-theme-preview-toggle" role="group" aria-label="Theme preview">
          {(["light", "dark"] as const).map((palette) => <button
            key={palette}
            type="button"
            className="vb-segmented__option"
            aria-label={`Preview ${palette === "light" ? "Light" : "Dark"} theme`}
            aria-pressed={themePalette === palette}
            onClick={() => onThemePaletteChange(palette)}
          >{palette === "light" ? "Light" : "Dark"}</button>)}
        </div> : null}
        <output className={`vb-status vb-status--${status}`} role="status" aria-label="Document status">
          <span className="vb-status__dot" aria-hidden="true" />
          {statusLabel(status)}
        </output>
        <div className="vb-toolbar__group">
          <button type="button" className="vb-icon-button" aria-label="Undo" title="Undo (⌘Z)" disabled={!canUndo} onClick={onUndo}>
            <UndoIcon />
          </button>
          <button type="button" className="vb-icon-button" aria-label="Redo" title="Redo (⇧⌘Z)" disabled={!canRedo} onClick={onRedo}>
            <RedoIcon />
          </button>
        </div>
        <button type="button" className="vb-button" title="Copy styles (⌘/Ctrl+Alt+C)" aria-label="Copy styles" aria-keyshortcuts="Meta+Alt+C Control+Alt+C" aria-pressed={painterActive ?? false} disabled={!canCopyStyle} onClick={onCopyStyle}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m14 3 7 7-9 9-7-7zM5 12l-2 5 4 4 5-2M16 5l3 3" /></svg>Copy styles</button>
        <button type="button" className="vb-button vb-button--primary" onClick={onSave}>Save</button>
        <button type="button" className="vb-button" onClick={onPreview}>Preview</button>
        <button
          type="button"
          className="vb-icon-button"
          aria-label={inspectorCollapsed ? "Show inspector" : "Hide inspector"}
          aria-pressed={!inspectorCollapsed}
          title={inspectorCollapsed ? "Show inspector" : "Hide inspector"}
          onClick={onToggleInspector}
        >
          <PanelRightIcon collapsed={inspectorCollapsed} />
        </button>
        <Menu label="More actions" trigger={<DotsIcon />} triggerTitle="More">
          <MenuItem label="Templates…" onSelect={onOpenTemplates} />
          <MenuItem label="Document JSON…" onSelect={onOpenDocumentTools} />
          {onOpenVersions ? <MenuItem label="Versions…" onSelect={onOpenVersions} /> : null}          {onOpenTheme ? <MenuItem label="Theme…" onSelect={onOpenTheme} /> : null}
          <MenuSeparator />
          <MenuItem label="Reset" ariaLabel="Reset" onSelect={onReset} />
        </Menu>
      </div>
    </header>
  );
}

function statusLabel(status: VisualBuilderState["status"]): string {
  switch (status) {
    case "clean": return "Saved";
    case "dirty": return "Unsaved changes";
    case "saving": return "Saving…";
    case "error": return "Needs attention";
  }
}
