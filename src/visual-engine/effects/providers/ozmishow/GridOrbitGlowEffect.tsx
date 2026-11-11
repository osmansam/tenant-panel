"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

/**
 * First-party hero background: a fading technical line grid with brand-tinted
 * corner glows, a giant slow-spinning orbit ring in the top-right, a subtle
 * dot texture, and a cursor spotlight.
 */
type Props = {
  brandColor: string;
  accentColor: string;
  gridColor: string;
  ringColor: string;
  spacing: number;
  orbitSpeed: number;
  spotlightRadius: number;
  spotlight: boolean;
};

function GridOrbitGlowEffect({ props, context }: EffectComponentProps<Props>) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !props.spotlight) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        host.style.setProperty("--ve-gogmx", `${Math.round(event.clientX - rect.left)}px`);
        host.style.setProperty("--ve-gogmy", `${Math.round(event.clientY - rect.top)}px`);
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [props.spotlight]);

  const style = {
    "--ve-gog-brand": props.brandColor,
    "--ve-gog-accent": props.accentColor,
    "--ve-gog-grid": props.gridColor,
    "--ve-gog-ring": props.ringColor,
    "--ve-gog-spacing": `${props.spacing}px`,
    "--ve-gog-speed": `${props.orbitSpeed}s`,
    "--ve-gog-radius": `${props.spotlightRadius}px`,
  } as CSSProperties;

  return (
    <span
      ref={hostRef}
      className="ve-effect-grid-orbit-glow"
      data-testid="grid-orbit-glow-effect"
      aria-hidden="true"
      data-reduced-motion={context.reducedMotion ? "true" : undefined}
      style={style}
    >
      <span className="ve-effect-grid-orbit-glow__grid" />
      <span className="ve-effect-grid-orbit-glow__orbit" />
      <span className="ve-effect-grid-orbit-glow__dots" />
      {props.spotlight ? <span className="ve-effect-grid-orbit-glow__spot" /> : null}
    </span>
  );
}

export const gridOrbitGlowEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.grid-orbit-glow",
  provider: "ozmishow",
  name: "Grid & orbit glow",
  description: "A technical hero background: glowing grid wash, brand corner glows, a giant slow orbit ring, and a cursor spotlight.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "brandColor", label: "Brand glow", defaultValue: "#d51f4d", required: true, acceptsSemantic: true },
    { kind: "color", key: "accentColor", label: "Secondary glow", defaultValue: "#d97706", required: true, acceptsSemantic: true },
    { kind: "color", key: "gridColor", label: "Grid color", defaultValue: "#1212100b", required: true, acceptsSemantic: true },
    { kind: "color", key: "ringColor", label: "Ring line color", defaultValue: "#dfdbd1", required: true, acceptsSemantic: true },
    { kind: "number", key: "spacing", label: "Grid size", defaultValue: 62, required: true, min: 24, max: 120, step: 2 },
    { kind: "number", key: "orbitSpeed", label: "Ring speed (s)", defaultValue: 48, required: true, min: 10, max: 120, step: 2 },
    { kind: "number", key: "spotlightRadius", label: "Spotlight size", defaultValue: 230, required: true, min: 80, max: 500, step: 10 },
    { kind: "boolean", key: "spotlight", label: "Cursor spotlight", defaultValue: true, required: true },
  ],
  component: GridOrbitGlowEffect,
  runtime: { kind: "css", clientRequired: true, usesWebGL: false, performanceCost: "low", supportsReducedMotion: true, pointerInteraction: "optional" },
};
