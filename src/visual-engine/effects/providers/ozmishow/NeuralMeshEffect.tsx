"use client";
import { useEffect, useRef } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";

type Props = { color: string; lineColor: string; density: number; linkDistance: number; speed: number; nodeSize: number; opacity: number };

type Node = { x: number; y: number; vx: number; vy: number; size: number; phase: number };

function NeuralMeshEffect({ props, context }: EffectComponentProps<Props>) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try { ctx = canvas.getContext("2d"); } catch { return; }
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let nodes: Node[] = [];
    const count = Math.max(6, Math.round(props.density));
    const linkDistance = Math.max(20, props.linkDistance);

    const seed = () => {
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * props.speed,
        vy: (Math.random() - 0.5) * props.speed,
        size: props.nodeSize * (0.65 + Math.random() * 0.7),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = props.lineColor;
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;
          const strength = 1 - distance / linkDistance;
          ctx.globalAlpha = strength * strength * props.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      for (const node of nodes) {
        const pulse = 0.82 + Math.sin(time * 0.0014 + node.phase) * 0.18;
        ctx.beginPath();
        ctx.fillStyle = props.color;
        ctx.shadowColor = props.color;
        ctx.shadowBlur = node.size * 5;
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const step = (time: number) => {
      const delta = 0.016;
      for (const node of nodes) {
        node.x += node.vx * delta * 60;
        node.y += node.vy * delta * 60;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
      draw(time);
      frame = window.requestAnimationFrame(step);
    };

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    if (observer) observer.observe(host);
    else window.addEventListener("resize", resize);
    resize();
    if (!context.reducedMotion) frame = window.requestAnimationFrame(step);

    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, [context.reducedMotion, props.color, props.lineColor, props.density, props.linkDistance, props.nodeSize, props.opacity, props.speed]);

  return (
    <span ref={hostRef} className="ve-effect-neural-mesh" data-testid="neural-mesh-effect" aria-hidden="true">
      <canvas ref={canvasRef} style={{ opacity: props.opacity }} />
    </span>
  );
}

export const neuralMeshEffect: RegisteredEffect<Props> = {
  id: "ozmishow.background.neural-mesh",
  provider: "ozmishow",
  name: "Neural mesh",
  description: "A living constellation of drifting nodes linked by faint signal lines.",
  category: "background",
  layer: "background",
  stacking: "single",
  compatibleNodes: ["section", "stack", "flex", "grid", "card", "overlay", "form"],
  schemaVersion: 1,
  inputs: [
    { kind: "color", key: "color", label: "Node color", defaultValue: "#7dd3fc", required: true, acceptsSemantic: true },
    { kind: "color", key: "lineColor", label: "Signal line", defaultValue: "#38bdf8", required: true, acceptsSemantic: true },
    { kind: "number", key: "density", label: "Nodes", defaultValue: 44, required: true, min: 8, max: 120, step: 2 },
    { kind: "number", key: "linkDistance", label: "Link distance", defaultValue: 140, required: true, min: 60, max: 260, step: 10 },
    { kind: "number", key: "speed", label: "Drift", defaultValue: 0.35, required: true, min: 0, max: 1.5, step: 0.05 },
    { kind: "number", key: "nodeSize", label: "Node size", defaultValue: 1.8, required: true, min: 0.5, max: 6, step: 0.25 },
    { kind: "number", key: "opacity", label: "Opacity", defaultValue: 0.8, required: true, min: 0.1, max: 1, step: 0.05 },
  ],
  component: NeuralMeshEffect,
  runtime: { kind: "canvas2d", clientRequired: true, usesWebGL: false, performanceCost: "medium", supportsReducedMotion: true, pointerInteraction: "none" },
};
