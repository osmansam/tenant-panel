"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ComponentDocument } from "../model";
import type { VersionSnapshot } from "../persistence/versionSnapshots";
import { CloseIcon } from "./icons";

export interface VersionsDialogProps {
  current: ComponentDocument;
  snapshots: VersionSnapshot[];
  onCreate(name: string): void;
  onRestore(snapshotId: string): void;
  onDelete(snapshotId: string): void;
  onClose(): void;
  /** Renders a document read-only exactly as the preview would show it. */
  renderDocument(document: ComponentDocument): ReactNode;
}

export function VersionsDialog({ current, snapshots, onCreate, onRestore, onDelete, onClose, renderDocument }: VersionsDialogProps) {
  const [name, setName] = useState("");
  const [compareId, setCompareId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const compared = snapshots.find((snapshot) => snapshot.id === compareId) ?? null;
  const ordered = [...snapshots].reverse();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }, []);

  const submit = () => {
    const trimmed = name.trim();
    if (trimmed === "") return;
    onCreate(trimmed);
    setName("");
  };

  return (
    <dialog ref={dialogRef} className="vb-versions" aria-label="Versions" onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="vb-versions__header">
        <h2>Versions</h2>
        <button type="button" className="vb-icon-button" aria-label="Close versions" onClick={onClose}><CloseIcon /></button>
      </header>
      <div className="vb-versions__body">
        <aside className="vb-versions__list">
          <form className="vb-versions__create" onSubmit={(event) => { event.preventDefault(); submit(); }}>
            <label className="vb-field vb-field--stacked">
              <span className="vb-field__label">Version name</span>
              <input className="vb-input" value={name} placeholder="e.g. Before launch copy" onChange={(event) => setName(event.target.value)} />
            </label>
            <button type="submit" className="vb-button vb-button--primary" disabled={name.trim() === ""}>Save version</button>
          </form>
          {ordered.length === 0 ? <p className="vb-versions__empty">No saved versions yet. Name one to capture the current state.</p> : (
            <ul>
              {ordered.map((snapshot) => (
                <li key={snapshot.id} className="vb-versions__item" data-selected={snapshot.id === compareId}>
                  <div>
                    <strong>{snapshot.name}</strong>
                    <time dateTime={snapshot.createdAt}>{formatDate(snapshot.createdAt)}</time>
                  </div>
                  <div className="vb-versions__actions">
                    <button type="button" className="vb-button" aria-pressed={snapshot.id === compareId} aria-label={`Compare ${snapshot.name}`} onClick={() => setCompareId(snapshot.id === compareId ? null : snapshot.id)}>Compare</button>
                    <button type="button" className="vb-button" aria-label={`Restore ${snapshot.name}`} onClick={() => onRestore(snapshot.id)}>Restore</button>
                    <button type="button" className="vb-button" aria-label={`Delete ${snapshot.name}`} onClick={() => { if (snapshot.id === compareId) setCompareId(null); onDelete(snapshot.id); }}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
        <section className="vb-versions__compare" aria-label="Version comparison">
          {compared === null ? <p className="vb-versions__empty">Choose Compare on a version to see it next to the current page.</p> : (
            <div className="vb-versions__panes">
              <figure className="vb-versions__pane">
                <figcaption>{compared.name}</figcaption>
                <div className="vb-versions__viewport" data-testid="version-snapshot-view"><div className="vb-versions__scaled">{renderDocument(compared.document)}</div></div>
              </figure>
              <figure className="vb-versions__pane">
                <figcaption>Current</figcaption>
                <div className="vb-versions__viewport" data-testid="version-current-view"><div className="vb-versions__scaled">{renderDocument(current)}</div></div>
              </figure>
            </div>
          )}
        </section>
      </div>
    </dialog>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

