"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { count: number; size: number; speed: number; opacity: number; blur: number; colorA: string; colorB: string };

function FloatingBubblesEffect({ props, context }: EffectComponentProps<Props>) {
  const count = Math.max(1, Math.round(props.count));
  return (
    <span className="ve-effect-floating-bubbles" data-testid="floating-bubbles-effect" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="ve-effect-floating-bubbles__bubble" data-testid="floating-bubble" style={bubbleStyle(index, count, props, context.reducedMotion)} />
      ))}
    </span>
  );
}

function bubbleStyle(index: number, count: number, props: Props, reducedMotion: boolean): CSSProperties {
  const spread = (index * 0.6180339887498949) % 1;
  const wobble = ((index * 37) % 29) / 29;
  const scale = 0.55 + (((index * 17) % 23) / 23) * 0.85;
  const duration = Math.max(3, props.speed * (0.75 + spread * 0.6));
  const delay = -((index * duration) / count);
  return {
    "--ve-bubble-left": `${Math.round(spread * 96)}%`,
    "--ve-bubble-size": `${Math.round(props.size * scale)}px`,
    "--ve-bubble-duration": `${duration.toFixed(2)}s`,
    "--ve-bubble-delay": `${delay.toFixed(2)}s`,
    "--ve-bubble-drift": `${Math.round((wobble - 0.5) * 90)}px`,
    "--ve-bubble-opacity": `${(props.opacity * (0.55 + wobble * 0.7)).toFixed(3)}`,
    "--ve-bubble-blur": `${props.blur}px`,
    "--ve-bubble-color": index % 2 === 0 ? props.colorA : props.colorB,
    animationPlayState: reducedMotion ? "paused" : undefined,
  } as CSSProperties;
}

export const floatingBubblesEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.floating-bubbles",
  provider: "ozmishow",
  name: "Floating bubbles",
  description: "Soft bubbles drifting upward across the page, behind its content.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "number", key: "count", label: "Bubbles", defaultValue: 18, required: true, min: 4, max: 40, step: 1 },
    { kind: "number", key: "size", label: "Size", defaultValue: 42, required: true, min: 8, max: 140, step: 2 },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 16, required: true, min: 4, max: 40, step: 0.5 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.28, required: true, min: 0.05, max: 0.8, step: 0.01 },
    { kind: "number", key: "blur", label: "Blur", defaultValue: 1, required: true, min: 0, max: 12, step: 0.5 },
    { kind: "color", key: "colorA", label: "First color", defaultValue: "#ffffff", required: true, acceptsSemantic: true },
    { kind: "color", key: "colorB", label: "Second color", defaultValue: "#93c5fd", required: true, acceptsSemantic: true },
  ],
  component: FloatingBubblesEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
