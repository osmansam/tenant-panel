import { componentRegistry } from "../components/core";
import type { ComponentNode } from "../model";

export interface LayerLabel {
  type: string;
  content: string;
}

function findPrimaryText(node: ComponentNode): string | undefined {
  if (node.type === "heading" && node.text?.trim()) return node.text.trim();
  if (node.type === "text" && node.text?.trim()) return node.text.trim();
  if ((node.type === "button" || node.type === "link") && node.label?.trim()) return node.label.trim();
  if (node.type === "badge" && node.text?.trim()) return node.text.trim();
  if (Array.isArray((node as { children?: unknown }).children)) {
    for (const child of (node as { children: ComponentNode[] }).children) {
      const found = findPrimaryText(child);
      if (found) return found;
    }
  }
  return undefined;
}

export function layerLabel(node: ComponentNode): LayerLabel {
  const type = componentRegistry.get(node.type).label;
  switch (node.type) {
    case "heading":
    case "text":
      return { type, content: node.text };
    case "code":
      return { type, content: node.language.trim() ? `Code: ${node.language.trim()}` : "Code block" };
    case "image":
      return { type, content: node.alt };
    case "image-comparison":
      return { type, content: node.accessibleLabel };
    case "button":
    case "link":
      return { type, content: node.label };
    case "badge":
      return { type, content: node.text };
    case "icon":
      return { type, content: node.accessibleLabel ?? node.iconId };
    case "avatar":
      return { type, content: node.alt };
    case "list":
      return { type, content: node.items[0] ?? "List" };
    case "stat":
      return { type, content: `${node.value} ${node.label}` };
    case "rating":
      return { type, content: node.accessibleLabel };
    case "quote":
      return { type, content: node.author };
    case "divider":
      return { type, content: "Line" };
    case "video":
      return { type, content: node.title };
    case "audio":
      return { type, content: node.accessibleLabel };
    case "embed":
      return { type, content: node.title };
    case "table":
      return { type, content: node.caption?.trim() || (node.headers[0] ? `${node.headers.length} columns` : "Table") };
    case "progress":
      return { type, content: node.label ?? `${node.value}%` };
    case "steps":
      return { type, content: node.items[node.current] ?? `Step ${node.current + 1}` };
    case "timeline":
      return { type, content: node.entries[0]?.title ?? "Timeline" };
    case "alert":
      return { type, content: node.title?.trim() || node.body };
    case "tags":
      return { type, content: node.items.join(", ") };
    case "kbd":
      return { type, content: node.keys.join(" + ") };
    case "bar-chart":
      return { type, content: node.bars[0] ? `${node.bars[0].label}: ${node.bars[0].value}` : "Chart" };
    case "sparkline":
      return { type, content: node.ariaLabel };
    case "slot":
      return { type: node.name === "preview" ? "Card face" : node.name === "details" ? "Full-screen details" : node.name === "item" ? "Item template" : node.name === "trigger" ? "Trigger" : node.name === "background" ? "Background" : node.name === "stage" ? "Stage" : "Content", content: node.id };
    case "scroll-story":
      return { type, content: node.accessibleLabel ?? `${node.children.length - 1} scenes` };
    case "infinite-slider":
      return { type, content: node.accessibleLabel };
    case "scroll-scene":
      return { type, content: `${node.length} screen${node.length === 1 ? "" : "s"}` };
    case "repeater":
      return { type, content: node.source.schemaName };
    case "card":
    case "expandable-card":
      return { type, content: findPrimaryText(node) ?? node.id };
    case "overlay":
      return { type, content: findPrimaryText(node) ?? node.id };
    case "form":
      return { type, content: node.action };
    case "input":
    case "textarea":
    case "select":
    case "checkbox":
      return { type, content: node.label };
    default:
      return { type, content: node.id };
  }
}

export function describeLayer(node: ComponentNode): string {
  const { type, content } = layerLabel(node);
  return `${type} · ${content}`;
}
