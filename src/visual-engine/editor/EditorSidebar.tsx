"use client";

import type { ReactNode } from "react";
import { ShortcutsPanel } from "./ShortcutsPanel";

export type SidebarTab = "layers" | "add";

export interface EditorSidebarProps {
  tab: SidebarTab;
  onTabChange(tab: SidebarTab): void;
  layers: ReactNode;
  library: ReactNode;
}

export function EditorSidebar({ tab, onTabChange, layers, library }: EditorSidebarProps) {
  return (
    <div className="vb-sidebar vb-sidebar--left">
      <div className="vb-tabs" role="tablist" aria-label="Sidebar">
        <button type="button" role="tab" className="vb-tabs__tab" aria-selected={tab === "layers"} onClick={() => onTabChange("layers")}>Layers</button>
        <button type="button" role="tab" className="vb-tabs__tab" aria-selected={tab === "add"} onClick={() => onTabChange("add")}>Add</button>
      </div>
      <div className="vb-sidebar__body" role="tabpanel">
        {tab === "layers" ? layers : library}
      </div>
      <div className="vb-sidebar__footer">
        <ShortcutsPanel />
      </div>
    </div>
  );
}
