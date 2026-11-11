"use client";

import { lazy, useEffect, useState, type ReactNode } from "react";
import type { VisualTemplate } from "../templates/types";
import { CloseIcon } from "./icons";
import type { TemplatePanelProps } from "./TemplatePanel";
import { DeferredEditorTool } from "./DeferredEditorTool";

const TemplatePanel = lazy(() => import("./TemplatePanel").then(module => ({ default: module.TemplatePanel })));

export type DocumentToolsTab = "templates" | "document" | "theme";

export interface DocumentToolsDrawerProps extends TemplatePanelProps {
  tab: DocumentToolsTab;
  templates: VisualTemplate[];
  onTabChange(tab: DocumentToolsTab): void;
  onClose(): void;
  onImportDocument(serialized: string): void;
  onExportDocument(): string | null;
  themeEditor?: ReactNode;
}

export function DocumentToolsDrawer({ tab, onTabChange, onClose, onImportDocument, onExportDocument, themeEditor, ...templateProps }: DocumentToolsDrawerProps) {
  const [documentJson, setDocumentJson] = useState("");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <aside className="vb-drawer" role="dialog" aria-label="Document tools" aria-modal="false">
      <header className="vb-drawer__header">
        <div className="vb-tabs" role="tablist" aria-label="Document tools">
          <button type="button" role="tab" className="vb-tabs__tab" aria-selected={tab === "templates"} onClick={() => onTabChange("templates")}>Templates</button>
          <button type="button" role="tab" className="vb-tabs__tab" aria-selected={tab === "document"} onClick={() => onTabChange("document")}>Document</button>
          {themeEditor !== undefined ? <button type="button" role="tab" className="vb-tabs__tab" aria-selected={tab === "theme"} onClick={() => onTabChange("theme")}>Theme</button> : null}
        </div>
        <button type="button" className="vb-icon-button" aria-label="Close document tools" onClick={onClose}><CloseIcon /></button>
      </header>

      <div className="vb-drawer__body">
        {tab === "templates" ? <DeferredEditorTool key="templates" name="Templates" onClose={onClose}><TemplatePanel {...templateProps} /></DeferredEditorTool> : tab === "theme" && themeEditor !== undefined ? themeEditor : (
          <section aria-label="Document data" className="vb-document-tools">
            <p className="vb-hint">Paste a component document to import it, or export the current document as JSON.</p>
            <label className="vb-field vb-field--stacked">
              <span className="vb-field__label">Document JSON</span>
              <textarea
                className="vb-code"
                aria-label="Document JSON"
                spellCheck={false}
                value={documentJson}
                onChange={(event) => setDocumentJson(event.target.value)}
              />
            </label>
            <div className="vb-button-row">
              <button type="button" className="vb-button vb-button--primary" disabled={documentJson.trim().length === 0} onClick={() => onImportDocument(documentJson)}>Import document</button>
              <button type="button" className="vb-button" onClick={() => setDocumentJson(onExportDocument() ?? "")}>Export document</button>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
