"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; accentColor: string; spacing: number; speed: number; opacity: number; frame: boolean; reticle: boolean };

function HudScanEffect({ props, context }: EffectComponentProps<Props>) {
  return (
    <span
      className="ve-effect-hud-scan"
      data-testid="hud-scan-effect"
      aria-hidden="true"
      data-reduced-motion={context.reducedMotion ? "true" : undefined}
      style={{
        "--ve-hud-line": props.lineColor,
        "--ve-hud-accent": props.accentColor,
        "--ve-hud-gap": `${props.spacing}px`,
        "--ve-hud-speed": `${props.speed}s`,
        "--ve-hud-opacity": props.opacity,
      } as CSSProperties}
    >
      <span className="ve-effect-hud-scan__grid" />
      <span className="ve-effect-hud-scan__scan" />
      {props.frame && (
        <span className="ve-effect-hud-scan__frame">
          <span className="ve-effect-hud-scan__corner ve-effect-hud-scan__corner--tl" />
          <span className="ve-effect-hud-scan__corner ve-effect-hud-scan__corner--tr" />
          <span className="ve-effect-hud-scan__corner ve-effect-hud-scan__corner--bl" />
          <span className="ve-effect-hud-scan__corner ve-effect-hud-scan__corner--br" />
        </span>
      )}
      {props.reticle && <span className="ve-effect-hud-scan__reticle" />}
    </span>
  );
}

export const hudScanEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.hud-scan",
  provider: "ozmishow",
  name: "HUD scan",
  description: "A restrained interface grid with a scanning band, framing brackets, and a central reticle.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Interface line", defaultValue: "#94a3b8", required: true, acceptsSemantic: true },
    { kind: "color", key: "accentColor", label: "Scan accent", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "spacing", label: "Grid spacing", defaultValue: 52, required: true, min: 24, max: 140, step: 4 },
    { kind: "number", key: "speed", label: "Scan speed", defaultValue: 11, required: true, min: 3, max: 30, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.6, required: true, min: 0.1, max: 1, step: 0.05 },
    { kind: "boolean", key: "frame", label: "Frame brackets", defaultValue: true, required: true },
    { kind: "boolean", key: "reticle", label: "Center reticle", defaultValue: true, required: true },
  ],
  component: HudScanEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
