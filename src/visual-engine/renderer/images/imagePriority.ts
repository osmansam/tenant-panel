import type { Breakpoint, ComponentNode } from "../../model";
import { normalizeImageUrl } from "../../model/urls";
import { boundedCollection, collectionSourceKey, type ResolvedCollectionMap } from "../repeaters";

/** Select source identities before slider copies or hidden detail trees are rendered. */
export function leadingImageId(node: ComponentNode, breakpoint?: Breakpoint, resolvedCollections?: ResolvedCollectionMap): string | undefined {
  const visibility = node.responsive?.visibility;
  if (visibility && (breakpoint ? visibility[breakpoint] === false : Object.values(visibility).includes(false))) return undefined;
  if (node.type === "repeater" && boundedCollection(resolvedCollections?.[collectionSourceKey(node.source)] ?? resolvedCollections?.[node.source.schemaName], node.source.limit).length === 0) return undefined;
  if (node.type === "image") return normalizeImageUrl(node.src).success ? node.id : undefined;
  if (node.type === "image-comparison") return node.id;
  if (!("children" in node) || node.type === "menu-panel") return undefined;
  const children = node.type === "expandable-card"
    ? node.children.filter(child => child.type === "slot" && child.name === "preview")
    : node.type === "disclosure"
      ? node.children.filter(child => child.type === "slot" && child.name === "trigger")
      : node.children;
  for (const child of children) {
    const id = leadingImageId(child, breakpoint, resolvedCollections);
    if (id) return id;
  }
  return undefined;
}
