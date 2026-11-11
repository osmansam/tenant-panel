import type { ComponentDocument } from "../model/document";
import type { DisclosureNode, TabsNode } from "../model/nodes";
import { addNode } from "./addNode";
import { regenerateNodeIds, type IdFactory } from "./duplicateNode";
import { findNode, findParent } from "./queryNode";
import { removeNode } from "./removeNode";
import { failure, type OperationResult } from "./result";

export function addTabItem(document: ComponentDocument, tabsId: string, idFactory?: IdFactory): OperationResult {
  const tabs = findNode(document.root, tabsId);
  if (tabs?.type !== "tabs") return failure("operation.tabs_required", "The target node is not a Tabs component");
  const starter = tabs.children.find((child): child is DisclosureNode => child.type === "disclosure");
  if (!starter) return failure("operation.tabs_item_required", "The Tabs component has no tab to duplicate");
  const regenerated = regenerateNodeIds({ ...starter, defaultOpen: false }, idFactory) as DisclosureNode;
  const copy = withTabLabel(regenerated, `Tab ${tabs.children.length + 1}`);
  return addNode(document, tabs.id, copy, tabs.children.length);
}

export function removeTabItem(document: ComponentDocument, tabId: string): OperationResult {
  const tab = findNode(document.root, tabId);
  if (tab?.type !== "disclosure") return failure("operation.tab_required", "The target node is not a tab");
  const parent = findParent(document.root, tabId);
  if (parent?.type !== "tabs") return failure("operation.tabs_parent_required", "The tab does not belong to a Tabs component");
  if (parent.children.length <= 2) return failure("operation.tabs_minimum", "Tabs must contain at least two tab panels");
  return removeNode(document, tabId);
}

export function isTabs(node: unknown): node is TabsNode {
  return typeof node === "object" && node !== null && (node as TabsNode).type === "tabs";
}

function withTabLabel(tab: DisclosureNode, label: string): DisclosureNode {
  const triggerIndex = tab.children.findIndex((child) => child.type === "slot" && child.name === "trigger");
  const trigger = tab.children[triggerIndex];
  if (!trigger || trigger.type !== "slot") return tab;
  const textIndex = trigger.children.findIndex((child) => child.type === "text" || child.type === "heading");
  if (textIndex < 0) return tab;
  const children = trigger.children.map((child, index) => index === textIndex ? { ...child, text: label } : child);
  return {
    ...tab,
    children: tab.children.map((child, index) => index === triggerIndex ? { ...trigger, children } : child),
  };
}
