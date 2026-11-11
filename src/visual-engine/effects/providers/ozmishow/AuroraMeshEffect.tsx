"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { colorA: string; colorB: string; colorC: string; speed: number; opacity: number; blur: number };

const GLOWS = [
  { x: "18%", y: "22%", scale: 1.15, delay: "-4s", color: "colorA" },
  { x: "78%", y: "18%", scale: 0.9, delay: "-9s", color: "colorB" },
  { x: "56%", y: "78%", scale: 1.25, delay: "-13s", color: "colorC" },
] as const;

function AuroraMeshEffect({ props, context }: EffectComponentProps<Props>) {
  return (
    <span className="ve-effect-aurora-mesh" data-testid="aurora-mesh-effect" aria-hidden="true">
      {GLOWS.map((glow) => (
        <span
          key={glow.color}
          className="ve-effect-aurora-mesh__glow"
          style={{
            "--ve-aurora-x": glow.x,
            "--ve-aurora-y": glow.y,
            "--ve-aurora-scale": glow.scale,
            "--ve-aurora-delay": glow.delay,
            "--ve-aurora-color": props[glow.color],
            "--ve-aurora-speed": `${props.speed}s`,
            "--ve-aurora-opacity": props.opacity,
            "--ve-aurora-blur": `${props.blur}px`,
            animationPlayState: context.reducedMotion ? "paused" : undefined,
          } as CSSProperties}
        />
      ))}
    </span>
  );
}

export const auroraMeshEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.aurora-mesh",
  provider: "ozmishow",
  name: "Aurora mesh",
  description: "Soft aurora ribbons drifting slowly across the page, inspired by modern product launches.",
  category: "background",
  layer: "background",
  stacking: "multiple",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "colorA", label: "First color", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "color", key: "colorB", label: "Second color", defaultValue: "#a78bfa", required: true, acceptsSemantic: true },
    { kind: "color", key: "colorC", label: "Third color", defaultValue: "#fb7185", required: true, acceptsSemantic: true },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 18, required: true, min: 6, max: 40, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.5, required: true, min: 0.1, max: 0.9, step: 0.01 },
    { kind: "number", key: "blur", label: "Blur", defaultValue: 70, required: true, min: 20, max: 160, step: 5 },
  ],
  component: AuroraMeshEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
