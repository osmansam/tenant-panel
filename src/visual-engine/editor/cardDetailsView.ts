import type { ComponentDocument, ExpandableCardNode, SlotNode } from "../model";
import { findNode, findParent } from "../operations/queryNode";

/** Selection changes the editing viewport; the saved document always keeps both slots. */
export function cardDetailsView(document: ComponentDocument, selectedId: string | null): { document: ComponentDocument; card: ExpandableCardNode; details: SlotNode } | null {
  let current = selectedId ? findNode(document.root, selectedId) : undefined;
  while (current) {
    const parent = findParent(document.root, current.id);
    if (current.type === "slot" && current.name === "details" && parent?.type === "expandable-card") {
      return { card: parent, details: current, document: { ...document, root: {
        id: document.root.id, type: "section", designPreset: document.root.designPreset,
        style: { typography: document.root.style?.typography, color: { background: "background", text: "text" }, spacing: { padding: "lg" } },
        children: [current],
      } } };
    }
    current = parent;
  }
  return null;
}
