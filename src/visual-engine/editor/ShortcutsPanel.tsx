"use client";

const SHORTCUTS: { label: string; keys: string }[] = [
  { label: "Undo", keys: "⌘/Ctrl + Z" },
  { label: "Redo", keys: "⌘/Ctrl + Shift + Z" },
  { label: "Copy component", keys: "⌘/Ctrl + C" },
  { label: "Cut component", keys: "⌘/Ctrl + X" },
  { label: "Paste component", keys: "⌘/Ctrl + V" },
  { label: "Duplicate component", keys: "⌘/Ctrl + D" },
  { label: "Delete component", keys: "Delete / Backspace" },
  { label: "Move / reorder", keys: "↑ ↓ ← →" },
  { label: "Align in a vertical Flex/Stack", keys: "← →" },
  { label: "Resize grid span", keys: "Alt + ← →" },
  { label: "Copy styles", keys: "⌘/Ctrl + Alt + C" },
  { label: "Paste styles", keys: "⌘/Ctrl + Alt + V" },
  { label: "Exit preview / cancel painter", keys: "Esc" },
];

export function ShortcutsPanel() {
  return (
    <details className="vb-shortcuts">
      <summary>Keyboard shortcuts</summary>
      <dl className="vb-shortcuts__list">
        {SHORTCUTS.map((shortcut) => (
          <div key={shortcut.label} className="vb-shortcuts__row">
            <dt>{shortcut.label}</dt>
            <dd><kbd>{shortcut.keys}</kbd></dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
