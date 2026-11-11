import type { ComponentDocument, ComponentNode, SectionNode } from "../model";
import { isStructuralNode } from "../operations/queryNode";

/** Makes arbitrary text safe and unambiguous inside DOM ids and instance keys. */
export function safeInstanceKey(value: string): string {
  return value.replace(/[^A-Za-z0-9-]/g, (char) => `_${char.codePointAt(0)!.toString(16)}_`);
}

/**
 * Runtime copies keep the saved document untouched while giving every DOM control a unique ID.
 * Node ids get `--<instanceKey>` appended; menu toggle targets and `#anchor` links that point at a
 * node inside the copy follow the new ids.
 */
export function instantiateNode<T extends ComponentNode>(node: T, instanceKey: string): T {
  const ids = new Map<string, string>();
  const collect = (child: ComponentNode) => {
    ids.set(child.id, `${child.id}--${instanceKey}`);
    if (isStructuralNode(child)) child.children.forEach(collect);
  };
  collect(node);
  const copy = (child: ComponentNode): ComponentNode => {
    const result = { ...child, id: ids.get(child.id)! } as ComponentNode;
    if (isStructuralNode(result)) result.children = result.children.map(copy);
    if (result.type === "menu-toggle") result.targetId = ids.get(result.targetId) ?? result.targetId;
    if ((result.type === "link" || result.type === "button") && result.href?.startsWith("#")) {
      const target = ids.get(result.href.slice(1));
      if (target) result.href = `#${target}`;
    }
    if (result.slideLink?.href.startsWith("#")) {
      const target = ids.get(result.slideLink.href.slice(1));
      if (target) result.slideLink = { ...result.slideLink, href: `#${target}` };
    }
    return result;
  };
  return copy(node) as T;
}

/** One placement of a saved design: ids are namespaced so two placements on a page cannot collide. */
export function instantiateDocument(document: ComponentDocument, placementKey: string): ComponentDocument {
  const key = safeInstanceKey(placementKey);
  return { ...document, id: `${document.id}--${key}`, root: instantiateNode<SectionNode>(document.root, key) };
}
