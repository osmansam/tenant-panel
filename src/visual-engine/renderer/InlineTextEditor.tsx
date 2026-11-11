"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { inlineTargetId, type InlineEditTarget } from "./inlineTextModel";
export * from "./inlineTextModel";
export { InlineEntryText } from "./InlineEntryText";

export interface InlineEditableTextProps {
  nodeId: string;
  value: string;
  onCommit(nodeId: string, value: string, target?: InlineEditTarget): void;
  onCancel(nodeId: string): void;
  target?: InlineEditTarget;
  multiline?: boolean;
}

/** Editable span rendered in place of the plain text while a node is being edited. */
export function InlineEditableText({ nodeId, value, onCommit, onCancel, target, multiline = false }: InlineEditableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);
  const focusedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.focus();
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } catch {
      // Selection sandboxed; editing still works via focus alone.
    }
  }, []);

  const getText = (): string => {
    const element = ref.current;
    if (!element) return "";
    if (multiline && typeof element.innerText === "string" && element.innerText.length > 0) return element.innerText;
    return element.textContent ?? "";
  };

  const commit = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const text = getText();
    if (text.trim().length === 0) onCancel(nodeId);
    else onCommit(nodeId, text, target);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      if (multiline && !event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      commit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      doneRef.current = true;
      onCancel(nodeId);
    } else if (multiline && event.key === "Tab") {
      event.preventDefault();
      document.execCommand?.("insertText", false, "  ");
    }
  };

  return (
    <span
      ref={ref}
      className="vb-inline-text-editor"
      contentEditable
      spellCheck={false}
      suppressContentEditableWarning
      data-testid={`inline-text-edit-${nodeId}`}
      data-inline-target={target ? inlineTargetId(nodeId, target) : undefined}
      onKeyDown={handleKeyDown}
      onFocus={() => { focusedRef.current = true; }}
      onInput={(event) => { event.stopPropagation(); }}
      onBlur={() => {
        if (focusedRef.current) commit();
      }}
    >{value}</span>
  );
}
