"use client";
import type { ColorToken } from "../model/styles";
import type { GradientPaint } from "../model/paint";
import { gradientCss } from "../renderer/paintStyles";
import { ColorPaintControl } from "./ColorPaintControl";
import { InspectorNumber, InspectorSelect } from "./InspectorSection";

export const DEFAULT_GRADIENT: GradientPaint = { kind: "linear-gradient", angle: 90, stops: [{ color: { kind: "custom", value: "#3478ff" }, position: 0 }, { color: { kind: "custom", value: "#9b43f5" }, position: 100 }] };

export function GradientPaintControl({ label, value, resolvedTokenColors, onChange }: { label: string; value: GradientPaint; resolvedTokenColors?: Partial<Record<ColorToken, string>>; onChange(value: GradientPaint): void }) {
  const stops = value.stops;
  const preview = resolvedTokenColors === undefined ? gradientCss(value) : gradientCss({
    ...value,
    stops: value.stops.map((stop) => ({
      ...stop,
      color: stop.color.kind === "token" && resolvedTokenColors[stop.color.value]
        ? { kind: "custom", value: resolvedTokenColors[stop.color.value] as string }
        : stop.color,
    })),
  });
  return <div className="vb-paint-gradient">
    <div className="vb-paint-preview" aria-label={`${label} preview`} style={{ backgroundImage: preview }} />
    <InspectorSelect label={`${label} gradient type`} value={value.kind} options={["linear-gradient", "radial-gradient"]} onChange={(kind) => onChange(kind === "radial-gradient" ? { kind, shape: "ellipse", stops } : { kind: "linear-gradient", angle: 90, stops })} />
    {value.kind === "linear-gradient" ? <InspectorNumber label={`${label} angle`} value={value.angle} min={0} max={360} unit="°" onChange={(angle) => onChange({ ...value, angle })} /> : <InspectorSelect label={`${label} shape`} value={value.shape} options={["ellipse", "circle"]} onChange={(shape) => onChange({ ...value, shape: shape as "ellipse" | "circle" })} />}
    {stops.map((stop, index) => <fieldset className="vb-paint-stop" key={index}>
      <legend>Stop {index + 1}</legend>
      <ColorPaintControl label={`${label} stop ${index + 1} color`} value={stop.color} resolvedTokenColors={resolvedTokenColors} onChange={(color) => onChange({ ...value, stops: stops.map((current, i) => i === index ? { ...current, color } : current) })} />
      <InspectorNumber label={`${label} stop ${index + 1} position`} value={stop.position} min={stops[index - 1]?.position ?? 0} max={stops[index + 1]?.position ?? 100} unit="%" onChange={(position) => onChange({ ...value, stops: stops.map((current, i) => i === index ? { ...current, position } : current) })} />
      <button type="button" className="vb-button" disabled={stops.length <= 2} aria-label={`${label} remove stop ${index + 1}`} onClick={() => onChange({ ...value, stops: stops.filter((_, i) => i !== index) })}>Remove stop</button>
    </fieldset>)}
    <button type="button" className="vb-button" aria-label={`${label} add stop`} onClick={() => {
      let index = 0;
      for (let i = 1; i < stops.length - 1; i++) if (stops[i + 1].position - stops[i].position > stops[index + 1].position - stops[index].position) index = i;
      const next = [...stops];
      next.splice(index + 1, 0, { color: { kind: "custom", value: "#ffffff" }, position: (stops[index].position + stops[index + 1].position) / 2 });
      onChange({ ...value, stops: next });
    }}>Add color stop</button>
  </div>;
}
