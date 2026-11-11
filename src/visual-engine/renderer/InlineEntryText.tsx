import type { ReactNode } from "react";
import type { ComponentNode } from "../model";
import { inlineTargetValue, isInlineTargetEditable, targetMatches, type InlineEditTarget } from "./inlineTextModel";
import { InlineEditableText } from "./InlineTextEditor";

interface InlineEntryTextContext {
  readonly mode: "preview" | "canvas";
  readonly inlineEditingNodeId?: string | null;
  readonly inlineEditingTarget?: InlineEditTarget | null;
  onInlineTextCommit?(nodeId: string, value: string, target?: InlineEditTarget): void;
  onInlineTextCancel?(nodeId: string): void;
  onInlineTextEditStart?(nodeId: string, target?: InlineEditTarget): void;
}

interface InlineEntryTextProps {
  node: ComponentNode;
  context: InlineEntryTextContext;
  target: InlineEditTarget;
  className?: string;
  render?: (value: string) => ReactNode;
}

/** Plain text up front on preview; double-click-to-edit span on the canvas. Renders nothing when the text is absent. */
export function InlineEntryText({ node, context, target, className, render }: InlineEntryTextProps) {
  const value = inlineTargetValue(node, target);
  if (value === null) return null;
  const renderValue = render ?? ((text) => text);
  if (context.mode !== "canvas" || context.onInlineTextCommit === undefined || context.onInlineTextCancel === undefined || !isInlineTargetEditable(node, target)) {
    return renderValue(value) as ReactNode;
  }
  const active = context.inlineEditingNodeId === node.id && targetMatches(context.inlineEditingTarget, target);
  if (active) {
    return <InlineEditableText nodeId={node.id} value={value} target={target} onCommit={context.onInlineTextCommit} onCancel={context.onInlineTextCancel} />;
  }
  return (
    <span
      className={`ve-canvas-editable-text${className ? ` ${className}` : ""}`}
      onDoubleClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        context.onInlineTextEditStart?.(node.id, target);
      }}
    >{renderValue(value)}</span>
  );
}
