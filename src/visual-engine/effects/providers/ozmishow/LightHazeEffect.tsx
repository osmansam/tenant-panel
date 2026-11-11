"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { colorA: string; colorB: string; speed: number; opacity: number; blur: number };

function LightHazeEffect({ props, context }: EffectComponentProps<Props>) {
  const style = {
    "--ve-haze-a": props.colorA,
    "--ve-haze-b": props.colorB,
    "--ve-haze-speed": `${props.speed}s`,
    "--ve-haze-opacity": props.opacity,
    "--ve-haze-blur": `${props.blur}px`,
  } as CSSProperties;

  return (
    <span className="ve-effect-light-haze" data-testid="light-haze-effect" aria-hidden="true" data-reduced-motion={context.reducedMotion ? "true" : undefined} style={style}>
      <span className="ve-effect-light-haze__beam ve-effect-light-haze__beam--one" />
      <span className="ve-effect-light-haze__beam ve-effect-light-haze__beam--two" />
      <span className="ve-effect-light-haze__beam ve-effect-light-haze__beam--three" />
    </span>
  );
}

export const lightHazeEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.light-haze",
  provider: "ozmishow",
  name: "Light haze",
  description: "Soft prismatic light beams that drift behind the page like morning sun.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "colorA", label: "First color", defaultValue: "#fef3c7", required: true, acceptsSemantic: true },
    { kind: "color", key: "colorB", label: "Second color", defaultValue: "#bfdbfe", required: true, acceptsSemantic: true },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 20, required: true, min: 6, max: 48, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.38, required: true, min: 0.08, max: 0.8, step: 0.01 },
    { kind: "number", key: "blur", label: "Blur", defaultValue: 60, required: true, min: 10, max: 140, step: 5 },
  ],
  component: LightHazeEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
