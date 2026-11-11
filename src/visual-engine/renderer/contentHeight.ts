import type { ComponentNode } from "../model";

export function hasExpandableContent(node: ComponentNode): boolean {
  return node.type === "disclosure" || ("children" in node && node.children.some(hasExpandableContent));
}

export function growingSectionStyle(node: ComponentNode, style: Record<string, unknown> = {}): Record<string, unknown> {
  if (!hasExpandableContent(node)) return style;
  const { height, maxHeight: _maxHeight, ...rest } = style;
  return { ...rest, ...(height !== undefined && height !== "auto" ? { minHeight: style.minHeight ?? height } : {}), height: "auto" };
}

const GROWING_HEIGHTS: Record<string, string> = {
  "h-[4rem]": "min-h-[4rem]",
  "h-[7.5rem]": "min-h-[7.5rem]",
  "h-[10rem]": "min-h-[10rem]",
  "h-[15rem]": "min-h-[15rem]",
  "h-[20rem]": "min-h-[20rem]",
  "h-[30rem]": "min-h-[30rem]",
  "h-[40rem]": "min-h-[40rem]",
  "h-[50rem]": "min-h-[50rem]",
  "h-[60rem]": "min-h-[60rem]",
  "h-full": "min-h-full",
  "h-[64px]": "min-h-[64px]",
  "h-[120px]": "min-h-[120px]",
  "h-[160px]": "min-h-[160px]",
  "h-[240px]": "min-h-[240px]",
  "h-[320px]": "min-h-[320px]",
  "h-[480px]": "min-h-[480px]",
  "h-[640px]": "min-h-[640px]",
  "h-[800px]": "min-h-[800px]",
  "h-[960px]": "min-h-[960px]",
  "h-[25svh]": "min-h-[25svh]",
  "h-[50svh]": "min-h-[50svh]",
  "h-[75svh]": "min-h-[75svh]",
  "h-[100svh]": "min-h-[100svh]",
};

/** Dynamic content must contribute its full height to the surrounding page flow. */
export function expandableHeightClasses(node: ComponentNode, classes: string): string {
  if (!hasExpandableContent(node)) return classes;
  return classes.split(" ").map((value) => GROWING_HEIGHTS[value] ?? value).join(" ");
}
