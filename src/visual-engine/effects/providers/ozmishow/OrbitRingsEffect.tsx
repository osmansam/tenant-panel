"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; dotColor: string; rings: number; speed: number; opacity: number; dotSize: number };

const TILTS = [-14, 16, -22, 27, -8];

function OrbitRingsEffect({ props, context }: EffectComponentProps<Props>) {
  const count = Math.max(1, Math.round(props.rings));
  return (
    <span className="ve-effect-orbit-rings" data-testid="orbit-rings-effect" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="ve-effect-orbit-rings__ring"
          style={{
            width: `${86 - index * (58 / Math.max(1, count))}%`,
            "--ve-orbit-tilt": `${TILTS[index % TILTS.length]}deg`,
            "--ve-orbit-speed": `${(props.speed * (0.82 + index * 0.12)).toFixed(2)}s`,
            "--ve-orbit-opacity": props.opacity,
            "--ve-orbit-line": props.lineColor,
            "--ve-orbit-dot": props.dotColor,
            "--ve-orbit-dot-size": `${props.dotSize}px`,
            animationPlayState: context.reducedMotion ? "paused" : undefined,
          } as CSSProperties}
        >
          <span className="ve-effect-orbit-rings__track" />
          <span className="ve-effect-orbit-rings__dot" />
        </span>
      ))}
    </span>
  );
}

export const orbitRingsEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.orbit-rings",
  provider: "ozmishow",
  name: "Orbit rings",
  description: "Thin elliptical tracks with glowing orbs circling them, like an orbital interface.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Track color", defaultValue: "#94a3b8", required: true, acceptsSemantic: true },
    { kind: "color", key: "dotColor", label: "Orb color", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "rings", label: "Rings", defaultValue: 3, required: true, min: 1, max: 5, step: 1 },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 28, required: true, min: 8, max: 60, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.6, required: true, min: 0.1, max: 1, step: 0.05 },
    { kind: "number", key: "dotSize", label: "Orb size", defaultValue: 7, required: true, min: 3, max: 18, step: 1 },
  ],
  component: OrbitRingsEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
