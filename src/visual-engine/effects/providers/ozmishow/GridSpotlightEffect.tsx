"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; glowColor: string; spacing: number; speed: number; opacity: number };

function GridSpotlightEffect({ props, context }: EffectComponentProps<Props>) {
  const style = {
    "--ve-grid-line": props.lineColor,
    "--ve-grid-glow": props.glowColor,
    "--ve-grid-size": `${props.spacing}px`,
    "--ve-grid-speed": `${props.speed}s`,
    "--ve-grid-opacity": props.opacity,
  } as CSSProperties;

  return (
    <span className="ve-effect-grid-spotlight" data-testid="grid-spotlight-effect" aria-hidden="true" data-reduced-motion={context.reducedMotion ? "true" : undefined} style={style}>
      <span className="ve-effect-grid-spotlight__grid" />
      <span className="ve-effect-grid-spotlight__beam" />
    </span>
  );
}

export const gridSpotlightEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.grid-spotlight",
  provider: "ozmishow",
  name: "Spotlight grid",
  description: "A precise technical grid with a slow spotlight sweeping across it.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Grid color", defaultValue: "#94a3b8", required: true, acceptsSemantic: true },
    { kind: "color", key: "glowColor", label: "Spotlight color", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "spacing", label: "Grid size", defaultValue: 44, required: true, min: 16, max: 120, step: 2 },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 14, required: true, min: 4, max: 40, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.7, required: true, min: 0.1, max: 1, step: 0.05 },
  ],
  component: GridSpotlightEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
