export const ANIMATION_PRESETS = [
  "none",
  "fade",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "scale-in",
  "slide-up",
  "slide-left",
  "slide-right",
] as const;
export type AnimationPreset = (typeof ANIMATION_PRESETS)[number];

export const ANIMATION_TRIGGERS = ["load", "in-view", "hover"] as const;
export type AnimationTrigger = (typeof ANIMATION_TRIGGERS)[number];

export const ANIMATION_EASINGS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"] as const;
export type AnimationEasing = (typeof ANIMATION_EASINGS)[number];

export const ANIMATION_LIMITS = {
  duration: { min: 0, max: 5000 },
  delay: { min: 0, max: 5000 },
  stagger: { min: 0, max: 2000 },
} as const;

/**
 * Renderer-neutral animation description. Stored on nodes as `animation`.
 * Durations are milliseconds. `stagger` is only valid on structural nodes and
 * applies the preset to each direct child with an incremental delay instead of
 * animating the container itself.
 */
export interface AnimationSpec {
  preset: AnimationPreset;
  trigger: AnimationTrigger;
  duration: number;
  delay: number;
  easing: AnimationEasing;
  once: boolean;
  stagger?: number;
  shuffle?: ShuffleAnimationSpec;
}

export const DEFAULT_ANIMATION: AnimationSpec = {
  preset: "fade-up",
  trigger: "in-view",
  duration: 500,
  delay: 0,
  easing: "ease-out",
  once: true,
};

export function isActiveAnimation(animation: AnimationSpec | undefined): animation is AnimationSpec {
  return animation !== undefined && animation.preset !== "none";
}
import type { ShuffleAnimationSpec } from "./shuffle";
