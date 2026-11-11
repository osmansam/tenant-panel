"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; glowColor: string; horizon: number; speed: number; gridSize: number; opacity: number };

function VectorHorizonEffect({ props, context }: EffectComponentProps<Props>) {
  return (
    <span
      className="ve-effect-vector-horizon"
      data-testid="vector-horizon-effect"
      aria-hidden="true"
      data-reduced-motion={context.reducedMotion ? "true" : undefined}
      style={{
        "--ve-horizon-line": props.lineColor,
        "--ve-horizon-glow": props.glowColor,
        "--ve-horizon-top": `${props.horizon}%`,
        "--ve-horizon-speed": `${props.speed}s`,
        "--ve-horizon-grid": `${props.gridSize}px`,
        "--ve-horizon-opacity": props.opacity,
      } as CSSProperties}
    >
      <span className="ve-effect-vector-horizon__glow" />
      <span className="ve-effect-vector-horizon__floor" />
      <span className="ve-effect-vector-horizon__line" />
    </span>
  );
}

export const vectorHorizonEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.vector-horizon",
  provider: "ozmishow",
  name: "Vector horizon",
  description: "A perspective vector floor receding into a cool horizon glow.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Grid line", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "color", key: "glowColor", label: "Horizon glow", defaultValue: "#0ea5e9", required: true, acceptsSemantic: true },
    { kind: "number", key: "horizon", label: "Horizon height", defaultValue: 64, required: true, min: 35, max: 86, step: 1 },
    { kind: "number", key: "speed", label: "Flow speed", defaultValue: 9, required: true, min: 2, max: 24, step: 1 },
    { kind: "number", key: "gridSize", label: "Grid size", defaultValue: 64, required: true, min: 24, max: 160, step: 4 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.55, required: true, min: 0.1, max: 1, step: 0.05 },
  ],
  component: VectorHorizonEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
