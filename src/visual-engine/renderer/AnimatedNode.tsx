"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { AnimationSpec } from "../model";
import "./animations.css";

type AnimationState = "idle" | "play" | "hover";

export interface AnimatedNodeProps {
  animation: AnimationSpec;
  /** Overrides the spec delay (used for container stagger). */
  delay?: number;
  /** Editor-only shared clock in milliseconds. Undefined restores runtime triggers. */
  motionTime?: number;
  children: ReactNode;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function AnimatedNode({ animation, delay, motionTime, children }: AnimatedNodeProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimationState>(() => initialState(animation));
  const [reducedMotion, setReducedMotion] = useState(false);
  const clockActive = motionTime !== undefined;
  const clockWasActive = useRef(false);
  // Malformed runtime input still previews the shared zero; never emit NaN/Infinity CSS.
  const clockTime = typeof motionTime === "number" && Number.isFinite(motionTime) ? Math.max(0, motionTime) : 0;

  useLayoutEffect(() => {
    const resetEpoch = clockActive || clockWasActive.current;
    clockWasActive.current = clockActive;
    if (!resetEpoch) return;
    // Reusing an already-running CSS animation would add its old elapsed time to
    // the negative delay. Reset only this wrapper, without remounting its content.
    elementRef.current?.getAnimations?.().forEach((animation) => { animation.currentTime = 0; });
  }, [clockActive]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (clockActive || animation.trigger !== "in-view") return;
    const element = elementRef.current;
    if (element === null) return;
    if (typeof IntersectionObserver === "undefined") {
      setState("play");
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setState("play");
          if (animation.once) observer.unobserve(entry.target);
        } else if (!animation.once) {
          setState("idle");
        }
      });
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [animation.trigger, animation.once, clockActive]);

  const style = {
    "--ve-keyframes": `ve-${animation.preset}`,
    "--ve-duration": `${animation.duration}ms`,
    "--ve-delay": `${delay ?? animation.delay}ms`,
    "--ve-easing": animation.easing,
    ...(clockActive ? {
      animationName: `ve-${animation.preset}`,
      animationDuration: `${animation.duration}ms`,
      animationDelay: `${(delay ?? animation.delay) - clockTime}ms`,
      animationTimingFunction: animation.easing,
      animationFillMode: "both",
      animationPlayState: "paused",
    } : {}),
  } as CSSProperties;

  const className = [
    "ve-anim",
    animation.trigger === "hover" ? "ve-anim--hover" : null,
    reducedMotion ? "ve-anim--reduced" : null,
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={elementRef}
      className={className}
      style={style}
      data-anim-preset={animation.preset}
      data-anim-trigger={animation.trigger}
      data-anim-state={clockActive ? "play" : state}
    >
      {children}
    </div>
  );
}

function initialState(animation: AnimationSpec): AnimationState {
  switch (animation.trigger) {
    case "load": return "play";
    case "hover": return "hover";
    case "in-view": return "idle";
  }
}
