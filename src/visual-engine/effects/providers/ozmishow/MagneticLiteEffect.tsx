"use client";
import { useState, type PointerEvent } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";
type Props = { strength: number };
function MagneticLiteEffect({ props, context, children }: EffectComponentProps<Props>) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const move = (event: PointerEvent<HTMLSpanElement>) => { if (context.reducedMotion) return; const rect = event.currentTarget.getBoundingClientRect(); const width = rect.width || 40; const height = rect.height || 40; setOffset({ x: ((event.clientX - rect.left) / width - 0.5) * props.strength, y: ((event.clientY - rect.top) / height - 0.5) * props.strength }); };
  const transform = context.reducedMotion ? "none" : `translate3d(${offset.x}px, ${offset.y}px, 0)`;
  const reset = () => setOffset({ x: 0, y: 0 });
  return <span className="ve-effect-magnetic-lite" data-testid="magnetic-lite-effect" style={{ transform }} onPointerMove={move} onPointerLeave={reset} onBlur={reset} onFocus={() => { if (!context.reducedMotion) setOffset({ x: props.strength * 0.25, y: 0 }); }}>{children}</span>;
}
export const magneticLiteEffect: RegisteredEffect<Props> = { id: "ozmishow.button.magnetic-lite", provider: "ozmishow", name: "Magnetic lite", description: "A lightweight pointer-following button interaction.", category: "button", layer: "interaction", stacking: "single", compatibleNodes: ["button"], schemaVersion: 1, inputs: [{ kind: "number", key: "strength", label: "Strength", defaultValue: 10, required: true, min: 0, max: 30, step: 1 }], component: MagneticLiteEffect, runtime: { clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "optional" } };
