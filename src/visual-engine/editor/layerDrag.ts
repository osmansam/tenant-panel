"use client";

import type { DragEvent } from "react";
import type { NodeType } from "../model";

export type LayerDragPayload =
  | { kind: "node"; nodeId: string }
  | { kind: "library"; nodeType: NodeType };

/** Marks a drag as a visual-engine layer/library drag so drop targets can recognize it via dataTransfer. */
export function setLayerDragPayload(event: DragEvent, payload: LayerDragPayload): void {
  event.dataTransfer.setData("text/plain", `visual-engine:${payload.kind}:${payload.kind === "node" ? payload.nodeId : (payload as { nodeType: string }).nodeType}`);
  event.dataTransfer.effectAllowed = "move";
}
