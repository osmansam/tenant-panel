"use client";
import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";
type Props = { color: string; highlight: string; duration: number; width: number };

type ClassedElementProps = {
  className?: string;
  children?: ReactNode;
};

function markNestedTextTarget(children: ReactNode): ReactNode {
  if (!isValidElement<ClassedElementProps>(children)) return children;
  const nested = Children.map(children.props.children, (child) => {
    if (!isValidElement<ClassedElementProps>(child)) return child;
    const className = child.props.className ?? "";
    if (!className.split(/\s+/).includes("z-10")) return child;
    return cloneElement(child, {
      className: `${className} ve-effect-text-shimmer-target`.trim(),
    });
  });
  return cloneElement(children, undefined, nested);
}

function TextShimmerEffect({ props, context, children }: EffectComponentProps<Props>) {
  const style = { "--ve-shimmer-color": props.color, "--ve-shimmer-highlight": props.highlight, "--ve-shimmer-duration": `${props.duration}s`, "--ve-shimmer-width": `${props.width}%`, animationPlayState: context.reducedMotion ? "paused" : "running" } as CSSProperties;
  return <span className="ve-effect-text-shimmer" data-testid="text-shimmer-effect" style={style}>{markNestedTextTarget(children)}</span>;
}
export const textShimmerEffect: RegisteredEffect<Props> = { id: "ozmishow.text.shimmer", provider: "ozmishow", name: "Text shimmer", description: "A moving highlight across heading or text content.", category: "text", layer: "content", stacking: "single", compatibleNodes: ["heading", "text"], schemaVersion: 1, inputs: [
  { kind: "color", key: "color", label: "Text color", defaultValue: "#ffffff", required: true, acceptsSemantic: true },
  { kind: "color", key: "highlight", label: "Highlight", defaultValue: "#60a5fa", required: true, acceptsSemantic: true },
  { kind: "number", key: "duration", label: "Duration", defaultValue: 2, required: true, min: 0.5, max: 10, step: 0.1 },
  { kind: "number", key: "width", label: "Highlight width", defaultValue: 24, required: true, min: 5, max: 80, step: 1 },
], component: TextShimmerEffect, runtime: { clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" } };
