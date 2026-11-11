"use client";

import { useEffect, useMemo, type ReactNode, type CSSProperties } from "react";
import type { EffectAttachment, JsonObject } from "../../model/effects";
import type { NodeType } from "../../model/nodes";
import { DEFAULT_SITE_THEME, useOptionalActiveTheme, type ResolvedThemePalette } from "../../theme";
import { resolveNodeEffects, type EffectDiagnostic, type ResolvedEffect } from "./resolver";
import type { EffectComponentProps, EffectRegistry } from "./types";
import { EffectBoundary } from "./EffectBoundary";
import { resolveEffectColorProps } from "./themeColors";
import "../../renderer/effects.css";

export function EffectHost({ nodeId, nodeType, attachments, registry, reducedMotion, children, onDiagnostic, className, style }: {
  nodeId: string;
  nodeType: NodeType;
  attachments: EffectAttachment[];
  registry: EffectRegistry;
  reducedMotion: boolean;
  children: ReactNode;
  onDiagnostic?: (diagnostic: EffectDiagnostic) => void;
  className?: string;
  style?: CSSProperties;
}) {
  const activeTheme = useOptionalActiveTheme();
  const palette = activeTheme?.values ?? DEFAULT_SITE_THEME.palettes.light;
  const resolved = useMemo(
    () => resolveNodeEffects({ id: nodeId, type: nodeType, effects: attachments }, registry, { allowWebGL: true, allowPointerInteraction: true, reducedMotion }),
    [attachments, nodeId, nodeType, reducedMotion, registry],
  );
  const diagnostics = useMemo(() => resolved.all.flatMap((effect) => effect.diagnostics), [resolved]);
  useEffect(() => {
    if (!onDiagnostic) return;
    diagnostics.forEach((diagnostic) => onDiagnostic(diagnostic));
  }, [diagnostics, onDiagnostic]);
  const content = wrap(resolved.content, children, nodeId, nodeType, reducedMotion, palette, onDiagnostic);
  const interactive = wrap(resolved.interaction, content, nodeId, nodeType, reducedMotion, palette, onDiagnostic);
  return (
    <div data-effect-host={nodeId} className={`ve-effect-host relative isolate overflow-hidden${nodeType === "button" ? " inline-flex" : ""}${className ? ` ${className}` : ""}`} style={{ borderRadius: "inherit", ...style }}>
      <Layer name="background" effects={resolved.background} nodeId={nodeId} nodeType={nodeType} reducedMotion={reducedMotion} palette={palette} onDiagnostic={onDiagnostic} />
      <div className="relative z-10">{interactive}</div>
      <Layer name="overlay" effects={resolved.overlay} nodeId={nodeId} nodeType={nodeType} reducedMotion={reducedMotion} palette={palette} onDiagnostic={onDiagnostic} />
    </div>
  );
}

function Layer({ name, effects, nodeId, nodeType, reducedMotion, palette, onDiagnostic }: { name: "background" | "overlay"; effects: ResolvedEffect[]; nodeId: string; nodeType: NodeType; reducedMotion: boolean; palette: ResolvedThemePalette; onDiagnostic?: (diagnostic: EffectDiagnostic) => void }) {
  if (effects.length === 0) return null;
  return (
    <div data-effect-layer={name} className={`absolute inset-0 overflow-hidden ${name === "background" ? "z-0" : "z-20"} ${effects.every((effect) => effect.registration?.runtime.pointerInteraction === "none") ? "pointer-events-none" : ""}`} style={{ borderRadius: "inherit" }}>
      {effects.map((effect) => renderEffect(effect, undefined, nodeId, nodeType, reducedMotion, palette, onDiagnostic))}
    </div>
  );
}

function wrap(effects: ResolvedEffect[], children: ReactNode, nodeId: string, nodeType: NodeType, reducedMotion: boolean, palette: ResolvedThemePalette, onDiagnostic?: (diagnostic: EffectDiagnostic) => void): ReactNode {
  return effects.reduceRight<ReactNode>((inner, effect) => (
    <div key={effect.attachment.attachmentId} data-effect-layer={effect.registration?.layer}>
      {renderEffect(effect, inner, nodeId, nodeType, reducedMotion, palette, onDiagnostic)}
    </div>
  ), children);
}

function renderEffect(effect: ResolvedEffect, children: ReactNode, nodeId: string, nodeType: NodeType, reducedMotion: boolean, palette: ResolvedThemePalette, onDiagnostic?: (diagnostic: EffectDiagnostic) => void): ReactNode {
  const registration = effect.registration;
  if (!registration) return children ?? null;
  const Component = effect.status === "ready" ? registration.component : registration.fallback;
  if (!Component) return children ?? null;
  const sourceProps = effect.validatedProps ?? effect.attachment.props as JsonObject;
  const props: EffectComponentProps = { props: resolveEffectColorProps(registration, sourceProps, palette), context: { nodeId, nodeType, layer: registration.layer, reducedMotion }, children };
  const Fallback = registration.fallback;
  const fallback = Fallback && Component !== Fallback ? <Fallback {...props} /> : (children ?? null);
  return (
    <EffectBoundary key={effect.attachment.attachmentId} resetKey={`${effect.attachment.attachmentId}:${effect.attachment.version}`} fallback={fallback} onError={() => onDiagnostic?.({ attachmentId: effect.attachment.attachmentId, effectId: effect.attachment.effectId, status: "invalid-config", code: "effect.runtime_failed", message: "Effect failed to render" })}>
      <span data-effect-id={effect.attachment.effectId} data-effect-attachment-id={effect.attachment.attachmentId} className={registration.layer === "background" || registration.layer === "overlay" ? "absolute inset-0" : undefined}>
        <Component {...props} />
      </span>
    </EffectBoundary>
  );
}
