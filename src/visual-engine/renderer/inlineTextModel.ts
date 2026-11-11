import type { ComponentNode, NodeType } from "../model";

type TextFieldKey = "text" | "label" | "body" | "code";

/** Node types the canvas supports for direct text editing, mapped to the field they render. */
export const INLINE_TEXT_KEYS: Partial<Record<NodeType, TextFieldKey>> = {
  heading: "text",
  text: "text",
  code: "code",
  button: "label",
  link: "label",
  badge: "text",
  alert: "body",
  progress: "label",
};

/** A specific editable string inside a node: a simple field, an array entry, an entry subfield, or a matrix cell. */
export interface InlineEditTarget {
  base: string;
  index?: number;
  sub?: string | number;
}

const ARRAY_ITEM_FIELDS: Partial<Record<NodeType, readonly string[]>> = {
  list: ["items"],
  steps: ["items"],
  tags: ["items"],
  kbd: ["keys"],
  table: ["headers"],
};

const ENTRY_SUB_FIELDS: Partial<Record<NodeType, readonly { base: string; subs: readonly string[] }[]>> = {
  timeline: [{ base: "entries", subs: ["title", "description"] }],
  "bar-chart": [{ base: "bars", subs: ["label"] }],
};

const MATRIX_FIELDS: Partial<Record<NodeType, readonly string[]>> = {
  table: ["rows"],
};

const SIMPLE_TARGET_FIELDS: Partial<Record<NodeType, readonly string[]>> = {
  quote: ["quote", "author", "role"],
  stat: ["prefix", "value", "suffix", "label"],
  input: ["label"],
  textarea: ["label"],
  select: ["label"],
  checkbox: ["label"],
  "theme-switcher": ["labels.light", "labels.dark", "labels.system"],
  alert: ["title"],
  table: ["caption"],
};

/** Whether this node type supports editing the given target in the canvas. */
export function isInlineTargetEditable(node: ComponentNode, target: InlineEditTarget): boolean {
  if (target.index === undefined) {
    const fields = SIMPLE_TARGET_FIELDS[node.type];
    if (target.sub !== undefined) {
      return typeof target.sub === "string" && !!fields?.includes(`${target.base}.${target.sub}`);
    }
    return !!fields?.includes(target.base);
  }
  if (target.sub === undefined) {
    const itemFields = ARRAY_ITEM_FIELDS[node.type];
    return !!itemFields?.includes(target.base);
  }
  if (typeof target.sub === "number") {
    const matrixFields = MATRIX_FIELDS[node.type];
    return !!matrixFields?.includes(target.base);
  }
  const entryFields = ENTRY_SUB_FIELDS[node.type];
  return !!entryFields?.some((spec) => spec.base === target.base && spec.subs.includes(target.sub as string));
}

export function inlineTargetId(nodeId: string, target: InlineEditTarget): string {
  return `${nodeId}|${target.base}${target.index ?? ""}|${target.sub ?? ""}`;
}

export function targetMatches(active: InlineEditTarget | null | undefined, target: InlineEditTarget): boolean {
  if (!active) return false;
  return active.base === target.base && active.index === target.index && active.sub === target.sub;
}

/** The current string rendered at this target, or null when the target holds no visible text. */
export function inlineTargetValue(node: ComponentNode, target: InlineEditTarget): string | null {
  const container = (node as unknown as Record<string, unknown>)[target.base];
  if (target.index === undefined) {
    if (target.sub === undefined) return typeof container === "string" ? container : null;
    if (Array.isArray(container)) return null;
    const value = (container as Record<string, unknown> | undefined)?.[target.sub];
    return typeof value === "string" ? value : null;
  }
  if (!Array.isArray(container) || target.index < 0 || target.index >= container.length) return null;
  const entry = container[target.index];
  if (target.sub === undefined) return typeof entry === "string" ? entry : null;
  if (typeof target.sub === "number") {
    const cell = (entry as string[] | undefined)?.[target.sub];
    return typeof cell === "string" ? cell : null;
  }
  const value = (entry as Record<string, unknown> | undefined)?.[target.sub];
  return typeof value === "string" ? value : null;
}

/** Builds the shallow node patch that writes `value` at the given target. Assumes a valid editable target. */
export function inlineTargetPatch(node: ComponentNode, value: string, target: InlineEditTarget): Record<string, unknown> {
  const container = (node as unknown as Record<string, unknown>)[target.base];
  if (target.index === undefined && target.sub === undefined) {
    return { [target.base]: value };
  }
  if (target.index === undefined) {
    const nested = { ...((container as Record<string, unknown>) ?? {}), [target.sub as string]: value };
    return { [target.base]: nested };
  }
  if (!Array.isArray(container)) return {};
  if (typeof target.sub === "number") {
    const rows = container.map((row, rowIndex) => rowIndex === target.index ? (row as string[]).map((cell, cellIndex) => cellIndex === target.sub ? value : cell) : row);
    return { [target.base]: rows };
  }
  if (target.sub !== undefined) {
    const entries = container.map((entry, entryIndex) => entryIndex === target.index ? { ...(entry as Record<string, unknown>), [target.sub as string]: value } : entry);
    return { [target.base]: entries };
  }
  const items = container.map((item, itemIndex) => itemIndex === target.index ? value : item);
  return { [target.base]: items };
}

export function inlineTextField(node: ComponentNode): TextFieldKey | null {
  return INLINE_TEXT_KEYS[node.type] ?? null;
}

export function inlineTextValue(node: ComponentNode): string | null {
  const field = inlineTextField(node);
  if (!field) return null;
  const value = (node as unknown as Record<string, unknown>)[field];
  return typeof value === "string" ? value : null;
}

