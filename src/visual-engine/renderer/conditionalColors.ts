import type { CSSProperties } from "react";
import type { ComponentNode } from "../model";
import { matchingConditionalColors, supportsConditionalColors } from "../model/conditionalColors";
import { colorCss } from "./paintStyles";

/** Transient presentation only: stored nodes/rules and the item are never modified. */
export function conditionalColorPresentation(node: ComponentNode, item: unknown, suppressBackground = false): { node: ComponentNode; styles?: CSSProperties; textOverride?: boolean } {
  const colors = supportsConditionalColors(node.type) ? matchingConditionalColors(node.conditionalColors, item) : undefined;
  if (!colors) return { node };
  const style = { ...node.style };
  const styles: CSSProperties = {};
  if (colors.text) {
    style.textPaint = colors.text;
    style.color = { ...style.color, text: colors.text.kind === "token" ? colors.text.value : "text" };
    styles.color = colorCss(colors.text);
  }
  if (colors.background && !suppressBackground) {
    // A single inline paint also works on text nodes and preserves alpha exactly.
    delete style.background;
    style.color = { ...style.color, background: colors.background.kind === "token" ? colors.background.value : "transparent" };
    styles.backgroundColor = colorCss(colors.background);
  }
  if (colors.border) styles.borderColor = colorCss(colors.border);
  return { node: { ...node, style }, styles, textOverride: !!colors.text };
}
