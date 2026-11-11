"use client";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; dotColor: string; spacing: number; dots: number; speed: number; dotSize: number; opacity: number };

function TravelingDotsEffect({ props, context }: EffectComponentProps<Props>) {
  const count = Math.max(1, Math.round(props.dots));
  const lines = Math.max(1, Math.floor(count / 3));
  return (
    <span
      className="ve-effect-traveling-dots"
      data-testid="traveling-dots-effect"
      aria-hidden="true"
      style={{
        "--ve-lanes-gap": `${props.spacing}px`,
        "--ve-lanes-line": props.lineColor,
        "--ve-lanes-dot": props.dotColor,
        "--ve-lanes-opacity": props.opacity,
      } as CSSProperties}
    >
      {Array.from({ length: count }, (_, index) => {
        const spread = (index * 0.6180339887498949) % 1;
        const line = index % lines;
        const duration = props.speed * (0.7 + spread * 0.65);
        return (
          <span
            key={index}
            className="ve-effect-traveling-dots__dot"
            data-testid="traveling-dot"
            style={{
              top: `calc(${line} * var(--ve-lanes-gap) + var(--ve-lanes-gap) * .5)`,
              "--ve-lane-duration": `${duration.toFixed(2)}s`,
              "--ve-lane-delay": `${(-spread * duration).toFixed(2)}s`,
              "--ve-lane-size": `${props.dotSize}px`,
              animationPlayState: context.reducedMotion ? "paused" : undefined,
            } as CSSProperties}
          />
        );
      })}
    </span>
  );
}

export const travelingDotsEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.traveling-dots",
  provider: "ozmishow",
  name: "Traveling dots",
  description: "Horizontal runway lines with small light dots gliding along each lane.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Line color", defaultValue: "#64748b", required: true, acceptsSemantic: true },
    { kind: "color", key: "dotColor", label: "Dot color", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "spacing", label: "Line spacing", defaultValue: 72, required: true, min: 28, max: 160, step: 4 },
    { kind: "number", key: "dots", label: "Dots", defaultValue: 15, required: true, min: 3, max: 30, step: 1 },
    { kind: "number", key: "speed", label: "Speed", defaultValue: 9, required: true, min: 3, max: 24, step: 0.5 },
    { kind: "number", key: "dotSize", label: "Dot size", defaultValue: 5, required: true, min: 2, max: 14, step: 1 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.8, required: true, min: 0.1, max: 1, step: 0.05 },
  ],
  component: TravelingDotsEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
