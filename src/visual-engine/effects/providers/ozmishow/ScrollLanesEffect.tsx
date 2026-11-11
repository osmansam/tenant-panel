"use client";
import { useEffect, useState, type CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { lineColor: string; dotColor: string; lines: number; dots: number; spacing: number; opacity: number };

function ScrollLanesEffect({ props, context }: EffectComponentProps<Props>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (context.reducedMotion) {
      setProgress(0.35);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0);
    };
    const requestUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [context.reducedMotion]);

  const lineCount = Math.max(1, Math.round(props.lines));
  const dotCount = Math.max(1, Math.round(props.dots));

  return (
    <span
      className="ve-effect-scroll-lanes"
      data-testid="scroll-lanes-effect"
      aria-hidden="true"
      style={{
        "--ve-scroll-lines": props.lineColor,
        "--ve-scroll-dots": props.dotColor,
        "--ve-scroll-gap": `${props.spacing}px`,
        "--ve-scroll-opacity": props.opacity,
        "--ve-scroll-progress": progress,
      } as CSSProperties}
    >
      {Array.from({ length: dotCount }, (_, index) => {
        const spread = (index * 0.6180339887498949) % 1;
        const line = index % lineCount;
        return (
          <span
            key={`dot-${index}`}
            className="ve-effect-scroll-lanes__dot"
            data-testid="scroll-lane-dot"
            style={{
              top: `calc(${line} * var(--ve-scroll-gap) + var(--ve-scroll-gap) * .5)`,
              left: `calc(${Math.round(28 + spread * 44)}% + ${(progress * (index % 2 === 0 ? 1 : -1) * (14 + spread * 30)).toFixed(2)}vw)`,
              "--ve-scroll-dot-delay": `${(-spread * 1.8).toFixed(2)}s`,
              animationPlayState: context.reducedMotion ? "paused" : undefined,
            } as CSSProperties}
          />
        );
      })}
      <span className="ve-effect-scroll-lanes__progress" style={{ height: `${Math.round(progress * 100)}%` }} />
    </span>
  );
}

export const scrollLanesEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.scroll-lanes",
  provider: "ozmishow",
  name: "Scroll lanes",
  description: "Runway lines and light dots that advance as visitors scroll down the page.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "lineColor", label: "Line color", defaultValue: "#64748b", required: true, acceptsSemantic: true },
    { kind: "color", key: "dotColor", label: "Dot color", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "lines", label: "Lines", defaultValue: 5, required: true, min: 2, max: 12, step: 1 },
    { kind: "number", key: "dots", label: "Dots", defaultValue: 12, required: true, min: 4, max: 30, step: 1 },
    { kind: "number", key: "spacing", label: "Line spacing", defaultValue: 86, required: true, min: 36, max: 180, step: 4 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.72, required: true, min: 0.1, max: 1, step: 0.05 },
  ],
  component: ScrollLanesEffect,
  runtime: { kind: "dom", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "none" },
};
