"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";
type Props = { colorA: string; colorB: string; duration: number; angle: number; opacity: number };
function AnimatedGradientEffect({ props, context }: EffectComponentProps<Props>) {
  const style = { "--ve-gradient-a": props.colorA, "--ve-gradient-b": props.colorB, "--ve-gradient-angle": `${props.angle}deg`, "--ve-gradient-duration": `${props.duration}s`, opacity: props.opacity, animationPlayState: context.reducedMotion ? "paused" : "running" } as CSSProperties;
  return <span className="ve-effect-animated-gradient" data-testid="animated-gradient-effect" aria-hidden="true" style={style} />;
}
export const animatedGradientEffect: RegisteredEffect<Props> = { id: "ozmishow.background.animated-gradient", provider: "ozmishow", name: "Animated gradient", description: "A softly moving two-color background gradient.", category: "background", layer: "background", stacking: "multiple", compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"], schemaVersion: 1, inputs: [
  { kind: "color", key: "colorA", label: "First color", defaultValue: "#2563eb", required: true, acceptsSemantic: true },
  { kind: "color", key: "colorB", label: "Second color", defaultValue: "#a855f7", required: true, acceptsSemantic: true },
  { kind: "number", key: "duration", label: "Duration", defaultValue: 8, required: true, min: 1, max: 30, step: 0.5 },
  { kind: "number", key: "angle", label: "Angle", defaultValue: 120, required: true, min: 0, max: 360, step: 1 },
  { kind: "number", key: "opacity", label: "Opacity", defaultValue: 1, required: true, min: 0, max: 1, step: 0.05 },
], component: AnimatedGradientEffect, runtime: { clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" } };
