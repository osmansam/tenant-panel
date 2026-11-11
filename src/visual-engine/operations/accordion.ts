import type { ComponentDocument } from "../model/document";
import type { AccordionNode, DisclosureNode } from "../model/nodes";
import { addNode } from "./addNode";
import { regenerateNodeIds, type IdFactory } from "./duplicateNode";
import { failure, type OperationResult } from "./result";
import { findNode } from "./queryNode";

export function addAccordionItem(document: ComponentDocument, accordionId: string, idFactory?: IdFactory): OperationResult {
  const accordion = findNode(document.root, accordionId);
  if (accordion?.type !== "accordion") return failure("operation.accordion_required", "The target node is not an Accordion");
  const starter = accordion.children.find((child): child is DisclosureNode => child.type === "disclosure");
  if (!starter) return failure("operation.accordion_item_required", "The Accordion has no item to duplicate");
  const copy = regenerateNodeIds({ ...starter, defaultOpen: false }, idFactory);
  return addNode(document, accordion.id, copy, accordion.children.length);
}

export function isAccordion(node: unknown): node is AccordionNode {
  return typeof node === "object" && node !== null && (node as AccordionNode).type === "accordion";
}
