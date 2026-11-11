import { useState } from "react";
import type { ComponentNode, InfiniteSliderNode } from "../../../model";
import { InfiniteSliderRuntime } from "../../../renderer/InfiniteSliderRuntime";
import type { SemanticRendererContext } from "../types";

function containsSelection(children: ComponentNode[], selectedId: string | undefined): boolean {
  return selectedId !== undefined && children.some(child => child.id === selectedId || ("children" in child && containsSelection(child.children, selectedId)));
}

export function InfiniteSliderRenderer({ node, context }: { node: InfiniteSliderNode; context: SemanticRendererContext }) {
  const [editing, setEditing] = useState(false);
  const canvas = context.mode === "canvas";
  const playOnCanvas = canvas && node.autoPlay && !editing && !containsSelection(node.children, context.selectedNodeId);
  const controls = canvas && node.autoPlay ? (
    <button
      type="button"
      className="ve-infinite-slider__canvas-toggle"
      onPointerDown={event => event.stopPropagation()}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        context.onSelect?.(node.id);
        setEditing(playOnCanvas);
      }}
    >{playOnCanvas ? "Edit slides" : "Play on canvas"}</button>
  ) : undefined;

  return (
    <InfiniteSliderRuntime
      key={playOnCanvas ? "playing" : "editing"}
      node={node}
      mode={playOnCanvas ? "preview" : context.mode}
      className={context.className}
      style={context.combineNodeStyles(node)}
      backgrounds={context.backgrounds}
      reducedMotion={context.reducedMotion}
      linksEnabled={!canvas}
      renderSlide={playOnCanvas ? context.renderPreviewNode : context.renderNode}
      controls={controls}
    />
  );
}
