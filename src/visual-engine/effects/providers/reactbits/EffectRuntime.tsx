"use client";

import { useRef, type ReactNode } from "react";
import { EffectBoundary } from "../../core/EffectBoundary";
import { useEffectActivity } from "./useEffectActivity";

export type EffectQuality = "low" | "medium" | "high";

export function qualityFor(cost: "low" | "medium" | "high", reducedMotion: boolean): EffectQuality {
  if (reducedMotion || cost === "high") return "low";
  return cost === "medium" ? "medium" : "high";
}

export function EffectRuntime({ children, fallback, cost, reducedMotion }: {
  children: ReactNode;
  fallback: ReactNode;
  cost: "low" | "medium" | "high";
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const active = useEffectActivity(ref);
  const quality = qualityFor(cost, reducedMotion);
  const content = reducedMotion || !active ? fallback : children;
  return (
    <span ref={ref} className="absolute inset-0" data-effect-active={active && !reducedMotion} data-effect-quality={quality}>
      <EffectBoundary resetKey={`${cost}:${reducedMotion}`} fallback={fallback}>{content}</EffectBoundary>
    </span>
  );
}
