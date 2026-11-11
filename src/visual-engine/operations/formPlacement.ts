import { canAcceptChild } from "../model/capabilities";
import { isFormFieldNode, type ComponentNode, type NodeType, type StructuralNode } from "../model/nodes";
import { findAncestors, findNode, isStructuralNode } from "./queryNode";

export function canInsertTypeAt(root: ComponentNode, parentId: string, type: NodeType): boolean {
  const parent = findNode(root, parentId);
  if (!parent || !isStructuralNode(parent) || !canAcceptChild(parent.type, type)) return false;
  const ancestry = [...findAncestors(root, parentId), parent];
  const insideForm = ancestry.some((node) => node.type === "form");
  const insideRepeater = ancestry.some((node) => node.type === "repeater");
  if (type === "input" || type === "textarea" || type === "select" || type === "checkbox") return insideForm;
  if (type === "form") return !insideForm && !insideRepeater;
  if (type === "repeater") return !insideForm;
  return true;
}

export function canInsertNodeAt(root: ComponentNode, parentId: string, node: ComponentNode): boolean {
  const parent = findNode(root, parentId);
  if (!parent || !isStructuralNode(parent) || !canAcceptChild(parent.type, node.type)) return false;
  const ancestry = [...findAncestors(root, parentId), parent];
  return validSubtreePlacement(
    node,
    ancestry.some((candidate) => candidate.type === "form"),
    ancestry.some((candidate) => candidate.type === "repeater"),
  );
}

export function prepareFormNodeForDestination(
  root: ComponentNode,
  parentId: string,
  node: ComponentNode,
  excludedNodeId?: string,
): ComponentNode {
  if (node.type === "form") return node;
  const parent = findNode(root, parentId);
  if (!parent || !isStructuralNode(parent)) return node;
  const ancestry = [...findAncestors(root, parentId), parent];
  const destinationForm = [...ancestry].reverse().find((candidate) => candidate.type === "form");
  if (!destinationForm || destinationForm.type !== "form") return node;

  const used = new Set<string>();
  collectScopedFieldNames(destinationForm, used, excludedNodeId, true);
  const clone = structuredClone(node) as ComponentNode;
  return renameIncomingFields(clone, used, true);
}

function validSubtreePlacement(node: ComponentNode, insideForm: boolean, insideRepeater: boolean): boolean {
  if (node.type === "form") {
    if (insideForm || insideRepeater) return false;
    insideForm = true;
  }
  if (node.type === "repeater") {
    if (insideForm) return false;
    insideRepeater = true;
  }
  if ((isFormFieldNode(node) || (node.type === "button" && node.submit === true)) && !insideForm) return false;
  return !isStructuralNode(node) || node.children.every((child) => validSubtreePlacement(child, insideForm, insideRepeater));
}

function collectScopedFieldNames(node: ComponentNode, names: Set<string>, excludedNodeId: string | undefined, isRoot = false): void {
  if (node.id === excludedNodeId) return;
  if (!isRoot && node.type === "form") return;
  if (isFormFieldNode(node)) names.add(node.fieldName);
  if (isStructuralNode(node)) node.children.forEach((child) => collectScopedFieldNames(child, names, excludedNodeId));
}

function renameIncomingFields(node: ComponentNode, used: Set<string>, isRoot = false): ComponentNode {
  if (!isRoot && node.type === "form") return node;
  if (isFormFieldNode(node)) {
    const fieldName = nextFieldName(node.fieldName, used);
    used.add(fieldName);
    return fieldName === node.fieldName ? node : { ...node, fieldName };
  }
  if (!isStructuralNode(node)) return node;
  return { ...node, children: node.children.map((child) => renameIncomingFields(child, used)) } as StructuralNode;
}

function nextFieldName(base: string, used: Set<string>): string {
  if (!used.has(base)) return base;
  for (let suffix = 2; ; suffix += 1) {
    const candidate = `${base}_${suffix}`;
    if (!used.has(candidate)) return candidate;
  }
}
