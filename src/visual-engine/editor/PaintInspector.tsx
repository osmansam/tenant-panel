"use client";
import type { ComponentNode } from "../model/nodes";
import type { BackgroundLayer, ColorValue, GradientPaint } from "../model/paint";
import type { NodePatch } from "../operations";
import { InspectorInput, InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";
import { ColorPaintControl } from "./ColorPaintControl";
import { DEFAULT_GRADIENT, GradientPaintControl } from "./GradientPaintControl";

const VIDEO_POSITIONS = ["center", "top", "right", "bottom", "left"] as const;
const IMAGE_POSITIONS = ["center", "top", "right", "bottom", "left"] as const;
const VIDEO_FIT_OPTIONS = ["cover", "contain"] as const;
const IMAGE_FIT_OPTIONS = ["cover", "contain", "fill"] as const;

export function PaintInspector({ node, onUpdate }: { node: ComponentNode; onUpdate(patch: NodePatch): void }) {
  const paint = node.style?.textPaint;
  const textKind = isGradient(paint) ? paint.kind : "solid";
  const layers = node.style?.background ?? [];
  const patchStyle = (patch: Record<string, unknown>) => onUpdate({ style: { ...node.style, ...patch } });
  const updateLayer = (index: number, layer: BackgroundLayer) => patchStyle({ background: layers.map((current, i) => i === index ? layer : current) });
  const addBackground = (layer: BackgroundLayer) => patchStyle({ background: [layer, ...layers] });
  const moveLayer = (index: number, direction: number) => { const next = [...layers]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; patchStyle({ background: next }); };
  return <InspectorSection title="Paint">
    {["heading", "text", "button"].includes(node.type) ? <>
      <InspectorSelect label="Text fill" value={textKind} options={["solid", "linear-gradient", "radial-gradient"]} onChange={(kind) => patchStyle({ textPaint: kind === "solid" ? undefined : kind === "radial-gradient" ? { kind, shape: "ellipse", stops: isGradient(paint) ? paint.stops : DEFAULT_GRADIENT.stops } : { ...DEFAULT_GRADIENT, stops: isGradient(paint) ? paint.stops : DEFAULT_GRADIENT.stops } })} />
      {isGradient(paint) ? <GradientPaintControl label="Text" value={paint} onChange={(textPaint) => patchStyle({ textPaint })} /> : <ColorPaintControl label="Text color value" value={paint ?? { kind: "token", value: node.style?.color?.text ?? "text" }} onChange={(textPaint) => patchStyle({ textPaint })} />}
      {paint ? <button type="button" className="vb-button" onClick={() => { const style = { ...node.style }; delete style.textPaint; onUpdate({ style }); }}>Reset text fill</button> : null}
    </> : null}
    {layers.length ? <p className="vb-paint-hint">Background layers, front to back</p> : null}
    {layers.map((layer, index) => <fieldset className="vb-paint-layer" key={index}>
      <legend>Background {index + 1}</legend>
      {layer.kind === "solid" ? (
        <ColorPaintControl label={`Background ${index + 1} color`} value={layer.color} onChange={(color) => updateLayer(index, { ...layer, color })} />
      ) : layer.kind === "image" ? <>
        <InspectorInput label={`Background ${index + 1} image URL`} value={layer.src} onChange={(src) => updateLayer(index, { ...layer, src })} />
        <InspectorSelect label={`Background ${index + 1} fit`} value={layer.fit} options={[...IMAGE_FIT_OPTIONS]} onChange={(fit) => updateLayer(index, { ...layer, fit: fit as typeof layer.fit })} />
        <InspectorSelect label={`Background ${index + 1} position`} value={layer.position} options={[...IMAGE_POSITIONS]} onChange={(position) => updateLayer(index, { ...layer, position: position as typeof layer.position })} />
      </> : layer.kind === "video" ? <>
        <InspectorInput label={`Background ${index + 1} video URL (.mp4 / .webm)`} value={layer.src} onChange={(src) => updateLayer(index, { ...layer, src })} />
        <InspectorSelect label={`Background ${index + 1} fit`} value={layer.fit} options={[...VIDEO_FIT_OPTIONS]} onChange={(fit) => updateLayer(index, { ...layer, fit: fit as typeof layer.fit })} />
        <InspectorSelect label={`Background ${index + 1} position`} value={layer.position} options={[...VIDEO_POSITIONS]} onChange={(position) => updateLayer(index, { ...layer, position: position as typeof layer.position })} />
      </> : layer.kind === "svg" ? <>
        <InspectorInput label={`Background ${index + 1} SVG URL`} value={layer.src} onChange={(src) => updateLayer(index, { ...layer, src })} />
        <InspectorSelect label={`Background ${index + 1} fit`} value={layer.fit} options={[...IMAGE_FIT_OPTIONS]} onChange={(fit) => updateLayer(index, { ...layer, fit: fit as typeof layer.fit })} />
        <InspectorSelect label={`Background ${index + 1} position`} value={layer.position} options={[...IMAGE_POSITIONS]} onChange={(position) => updateLayer(index, { ...layer, position: position as typeof layer.position })} />
      </> : <GradientPaintControl label={`Background ${index + 1}`} value={layer} onChange={(gradient) => updateLayer(index, { ...gradient, ...(layer.opacity !== undefined ? { opacity: layer.opacity } : {}) })} />}
      <InspectorNumber label={`Background ${index + 1} opacity`} value={Math.round((layer.opacity ?? 1) * 100)} min={0} max={100} unit="%" onChange={(opacity) => updateLayer(index, { ...layer, opacity: opacity / 100 })} />
      <div className="vb-paint-layer__actions">
        <button type="button" className="vb-button" disabled={index === 0} aria-label={`Move background ${index + 1} forward`} onClick={() => moveLayer(index, -1)}>Forward</button>
        <button type="button" className="vb-button" disabled={index === layers.length - 1} aria-label={`Move background ${index + 1} backward`} onClick={() => moveLayer(index, 1)}>Backward</button>
        <button type="button" className="vb-button" aria-label={`Remove background ${index + 1}`} onClick={() => patchStyle({ background: layers.filter((_, i) => i !== index) })}>Remove</button>
      </div>
    </fieldset>)}
    <div className="vb-paint-layer__actions">
      <button type="button" className="vb-button" onClick={() => addBackground({ kind: "solid", color: { kind: "custom", value: "#ffffff" } })}>Add solid background</button>
      <button type="button" className="vb-button" onClick={() => addBackground(DEFAULT_GRADIENT)}>Add gradient background</button>
      <button type="button" className="vb-button" onClick={() => addBackground({ kind: "image", src: "/visual-builder/placeholder.svg", fit: "cover", position: "center", repeat: "no-repeat" })}>Add image background</button>
      <button type="button" className="vb-button" onClick={() => addBackground({ kind: "video", src: "", fit: "cover", position: "center", muted: true, loop: true })}>Add video background</button>
      <button type="button" className="vb-button" onClick={() => addBackground({ kind: "svg", src: "", fit: "cover", position: "center" })}>Add SVG background</button>
    </div>
  </InspectorSection>;
}
function isGradient(paint: ColorValue | GradientPaint | undefined): paint is GradientPaint { return paint?.kind === "linear-gradient" || paint?.kind === "radial-gradient"; }
