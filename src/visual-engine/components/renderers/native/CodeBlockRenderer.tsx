"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactElement } from "react";
import type { CodeNode } from "../../../model";
import { InlineEditableText, type InlineEditableTextProps } from "../../../renderer/InlineTextEditor";
import { highlightCode } from "./syntaxHighlight";

export interface CodeBlockRendererProps {
  node: CodeNode;
  className?: string;
  style?: CSSProperties;
  inlineEdit?: Pick<InlineEditableTextProps, "onCommit" | "onCancel">;
}

export function CodeBlockRenderer({ node, className, style, inlineEdit }: CodeBlockRendererProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showHeader = node.showLanguage || node.showCopy;

  useEffect(() => () => {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
  }, []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) return;
      await navigator.clipboard.writeText(node.code);
      setCopied(true);
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={["ve-code-block", className].filter(Boolean).join(" ")} style={style} data-wrap={String(node.wrap)}>
      {showHeader ? (
        <div className="ve-code-block__header" data-code-header>
          {node.showLanguage ? <span className="ve-code-block__language">{node.language.trim() || "Text"}</span> : <span />}
          {node.showCopy ? (
            <button type="button" className="ve-code-block__copy" aria-label="Copy code" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          ) : null}
        </div>
      ) : null}
      <pre className="ve-code-block__pre"><code>{inlineEdit === undefined ? highlightCode(node.code, node.language) : <InlineEditableText nodeId={node.id} value={node.code} onCommit={inlineEdit.onCommit} onCancel={inlineEdit.onCancel} multiline />}</code></pre>
      <span className="sr-only" aria-live="polite">{copied ? "Code copied" : ""}</span>
    </div>
  );
}
