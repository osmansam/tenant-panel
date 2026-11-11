import type { ComponentDocument } from "../model/document";
import { parseComponentDocument } from "../model/validation";

export type OperationResult =
  | { success: true; document: ComponentDocument; selectedNodeId?: string; createdNodeId?: string }
  | { success: false; code: string; message: string };

export function failure(code: string, message: string): OperationResult {
  return { success: false, code, message };
}

export function finalizeDocument(
  document: ComponentDocument,
  metadata: Pick<Extract<OperationResult, { success: true }>, "selectedNodeId" | "createdNodeId"> = {},
): OperationResult {
  const parsed = parseComponentDocument(document);
  if (!parsed.success) return failure("operation.validation_failed", parsed.issues.map((issue) => issue.message).join(" "));
  return { success: true, document: parsed.value, ...metadata };
}
