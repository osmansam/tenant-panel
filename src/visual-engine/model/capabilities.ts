import { componentRegistry } from "../components/core";
import type { ComponentDefinition } from "../components/core";
import type { NodeType } from "./nodes";

export type PropertyGroup = "layout" | "content" | "typography" | "media" | "spacing" | "color" | "border" | "sizing" | "behavior" | "data";
export type NodeDefinition = ComponentDefinition;

export const NODE_DEFINITIONS = Object.freeze(
  Object.fromEntries(
    componentRegistry.list().map((definition) => [definition.type, definition]),
  ),
) as Readonly<Record<NodeType, ComponentDefinition>>;

export function canAcceptChild(parent: NodeType, child: NodeType): boolean {
  return componentRegistry.get(parent).allowedChildren.includes(child);
}
