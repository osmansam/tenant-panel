import type { ComponentDocument } from "../model/document";
import type { ChildLayoutSpec } from "../model/responsive";
import type { ComponentNode, FlexNode, StructuralNode } from "../model/nodes";
import { canInsertNodeAt, prepareFormNodeForDestination } from "./formPlacement";
import { collectNodeIds, findNode, findParent, isProtectedSlot, isStructuralNode, mapNode } from "./queryNode";
import { failure, finalizeDocument, type OperationResult } from "./result";

export type BesideSide = "left" | "right";

/** True when the container already puts its children side by side. */
export function laysOutChildrenHorizontally(node: StructuralNode): boolean {
  return node.type === "grid" || ((node.type === "flex" || node.type === "stack") && node.direction === "row");
}

export function isBesideDropTarget(target: ComponentNode, parent: StructuralNode | undefined): boolean {
  if (parent === undefined || isStructuralNode(target)) return false;
  if (target.layout?.placement !== undefined) return false;
  return parent.type === "grid" || !laysOutChildrenHorizontally(parent);
}

/** Wraps a new component and an existing target in a Flex row. */
export function wrapNewNodeBeside(document: ComponentDocument, targetNodeId: string, side: BesideSide, node: ComponentNode, flexId: string): OperationResult {
  const target = findNode(document.root, targetNodeId);
  if (!target) return failure("operation.node_not_found", "The target node does not exist");
  const parent = findParent(document.root, targetNodeId);
  if (!parent) return failure("operation.parent_not_found", "The target node has no parent");
  if (collectNodeIds(document.root).has(flexId)) return failure("operation.id_duplicate", "Node IDs must be unique");

  const preparedNode = prepareFormNodeForDestination(document.root, parent.id, node);
  const incomingIds = collectNodeIds(preparedNode);
  const existingIds = collectNodeIds(document.root);
  if ([...incomingIds].some((id) => existingIds.has(id))) return failure("operation.id_duplicate", "Node IDs must be unique");

  const flex = buildFlex(flexId, side, targetForFlex(target, parent.type === "grid"), withoutLayout(preparedNode), wrapperLayout(target, parent));
  if (!canInsertNodeAt(document.root, parent.id, flex)) return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  const root = mapNode(document.root, parent.id, (container) => replaceWithFlex(container, targetNodeId, flex));
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: preparedNode.id, createdNodeId: preparedNode.id });
}

/** Moves an existing component next to another one by wrapping both in a Flex row. */
export function wrapNodeBeside(document: ComponentDocument, targetNodeId: string, side: BesideSide, nodeId: string, flexId: string): OperationResult {
  if (targetNodeId === nodeId) return failure("operation.cycle", "A node cannot be placed beside itself");
  const target = findNode(document.root, targetNodeId);
  if (!target) return failure("operation.node_not_found", "The target node does not exist");
  const dragged = findNode(document.root, nodeId);
  if (!dragged) return failure("operation.node_not_found", "The target node does not exist");
  if (dragged.id === document.root.id) return failure("operation.root_protected", "The document root cannot be moved");
  if (isProtectedSlot(document, nodeId)) return failure("operation.slot_protected", "Compound slots cannot be moved independently");
  if (findNode(dragged, targetNodeId)) return failure("operation.cycle", "A node cannot be moved into itself or one of its descendants");
  if (collectNodeIds(document.root).has(flexId)) return failure("operation.id_duplicate", "Node IDs must be unique");

  const sourceParent = findParent(document.root, nodeId);
  const parent = findParent(document.root, targetNodeId);
  if (!sourceParent || !parent) return failure("operation.parent_not_found", "The target node has no parent");

  const withoutDragged = mapNode(document.root, sourceParent.id, (container) => {
    if (!isStructuralNode(container)) return container;
    return { ...container, children: container.children.filter((child) => child.id !== nodeId) };
  });
  const targetAfterRemoval = findNode(withoutDragged, targetNodeId);
  const parentAfterRemoval = findParent(withoutDragged, targetNodeId);
  if (!targetAfterRemoval || !parentAfterRemoval) return failure("operation.node_not_found", "The target node does not exist after removal");

  const prepared = prepareFormNodeForDestination(withoutDragged, parentAfterRemoval.id, dragged);
  const flex = buildFlex(flexId, side, targetForFlex(targetAfterRemoval, parentAfterRemoval.type === "grid"), withoutLayout(prepared), wrapperLayout(targetAfterRemoval, parentAfterRemoval));
  if (!canInsertNodeAt(withoutDragged, parentAfterRemoval.id, flex)) return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  const root = mapNode(withoutDragged, parentAfterRemoval.id, (container) => replaceWithFlex(container, targetNodeId, flex));
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: nodeId });
}

function buildFlex(id: string, side: BesideSide, target: ComponentNode, incoming: ComponentNode, layout: ChildLayoutSpec | undefined): FlexNode {
  return {
    id,
    type: "flex",
    direction: "row",
    alignment: "center",
    distribution: "start",
    wrap: true,
    gap: "md",
    layout,
    children: side === "left" ? [incoming, target] : [target, incoming],
  };
}

/** The Flex replaces the target inside its Grid cell, so it inherits the target's slot. */
function wrapperLayout(target: ComponentNode, parent: StructuralNode): ChildLayoutSpec | undefined {
  if (parent.type !== "grid") return undefined;
  const layout: ChildLayoutSpec = {
    span: target.layout?.span ?? { mobile: 12, tablet: 12, desktop: 12 },
  };
  if (target.layout?.start !== undefined) layout.start = target.layout.start;
  return layout;
}

function targetForFlex(target: ComponentNode, insideGrid: boolean): ComponentNode {
  return insideGrid ? withoutLayout(target) : target;
}

function withoutLayout(node: ComponentNode): ComponentNode {
  if (node.layout === undefined) return node;
  const copy = { ...node };
  delete copy.layout;
  return copy;
}

function replaceWithFlex(container: ComponentNode, targetNodeId: string, flex: FlexNode): ComponentNode {
  if (!isStructuralNode(container)) return container;
  const index = container.children.findIndex((child) => child.id === targetNodeId);
  if (index < 0) return container;
  const children = [...container.children];
  children.splice(index, 1, flex);
  return { ...container, children };
}
