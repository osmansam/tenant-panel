import type { ComponentDocument, DisclosureNode, SidebarNode } from "../model";
import { createSidebarPanel, sidebarLabelNode, sidebarPanelLabel } from "../model/sidebar";
import { regenerateNodeIds, type IdFactory } from "./duplicateNode";
import { findNode, mapNode } from "./queryNode";
import { failure, finalizeDocument, type OperationResult } from "./result";

export type SidebarItemAction = { type: "add" } | { type: "rename"; itemId: string; label: string } | { type: "default" | "duplicate" | "remove"; itemId: string } | { type: "move"; itemId: string; direction: "up" | "down" };

export function changeSidebarItem(document: ComponentDocument, sidebarId: string, action: SidebarItemAction, ids: IdFactory = () => crypto.randomUUID()): OperationResult {
  const sidebar = findNode(document.root, sidebarId);
  if (sidebar?.type !== "sidebar") return failure("operation.sidebar_required", "Select a Sidebar component");
  const children = sidebar.children.filter((child): child is DisclosureNode => child.type === "disclosure");
  if (children.length !== sidebar.children.length) return failure("operation.sidebar_invalid", "Sidebar contains an invalid panel");
  const selectedNodeId = sidebar.id;
  if (action.type === "add") children.push(createSidebarPanel(ids, `Item ${children.length + 1}`));
  else {
    const index = children.findIndex(child => child.id === action.itemId);
    const item = children[index];
    if (!item) return failure("operation.sidebar_item_required", "This sidebar item no longer exists");
    if (action.type === "remove") {
      if (children.length <= 1) return failure("operation.sidebar_minimum", "Keep at least one sidebar item");
      children.splice(index, 1);
      if (item.defaultOpen) children[0] = { ...children[0], defaultOpen: true };
    } else if (action.type === "default") children.forEach((child, i) => { children[i] = { ...child, defaultOpen: child.id === item.id }; });
    else if (action.type === "rename") {
      if (!action.label.trim()) return failure("operation.sidebar_label_required", "Enter a sidebar item label");
      const trigger = item.children.find(child => child.type === "slot" && child.name === "trigger");
      const label = trigger && sidebarLabelNode(trigger);
      if (!trigger || trigger.type !== "slot") return failure("operation.sidebar_label_missing", "This item is missing its menu slot");
      children[index] = label
        ? mapNode(item, label.id, node => ({ ...node, text: action.label })) as DisclosureNode
        : mapNode(item, trigger.id, () => ({ ...trigger, children: [...trigger.children, { id: ids(), type: "text", text: action.label }] })) as DisclosureNode;
    } else if (action.type === "duplicate") {
      const copy = regenerateNodeIds({ ...item, defaultOpen: false }, ids) as DisclosureNode;
      const trigger = copy.children.find(child => child.type === "slot" && child.name === "trigger");
      const label = trigger && sidebarLabelNode(trigger);
      children.splice(index + 1, 0, label ? mapNode(copy, label.id, node => ({ ...node, text: `${sidebarPanelLabel(item)} copy` })) as DisclosureNode : copy);
    } else if (action.type === "move") {
      const next = index + (action.direction === "up" ? -1 : 1);
      if (next < 0 || next >= children.length) return failure("operation.sidebar_move_invalid", "This item cannot move further");
      [children[index], children[next]] = [children[next], children[index]];
    }
  }
  const updated: SidebarNode = { ...sidebar, children };
  return finalizeDocument({ ...document, root: mapNode(document.root, sidebar.id, () => updated) as ComponentDocument["root"] }, { selectedNodeId });
}
