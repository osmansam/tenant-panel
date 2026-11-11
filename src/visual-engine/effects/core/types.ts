import type { ComponentType, ReactNode } from "react";
import type { EffectAttachment, JsonObject, JsonValue } from "../../model/effects";
import type { NodeType } from "../../model/nodes";
import type { ColorValue } from "../../model/paint";

export type EffectCategory = "background" | "button" | "text" | "border" | "hover" | "cursor" | "decoration";
export type EffectLayer = "background" | "content" | "overlay" | "interaction";
export type EffectStacking = "single" | "multiple";
export type EffectRuntimeKind = "css" | "dom" | "canvas2d" | "webgl" | "three" | "ogl";
export type EffectColorValue = string | ColorValue;

export interface EffectSourceMetadata {
  provider: "reactbits";
  component: string;
  revision: string;
}

interface EffectInputBase<Value extends JsonValue> {
  key: string;
  label: string;
  defaultValue: Value;
  required: boolean;
}

export type EffectInput =
  | (EffectInputBase<number> & { kind: "number"; min: number; max: number; step: number })
  | (EffectInputBase<boolean> & { kind: "boolean" })
  | (EffectInputBase<EffectColorValue> & { kind: "color"; acceptsSemantic?: boolean })
  | (EffectInputBase<string> & { kind: "text"; minLength?: number; maxLength?: number })
  | (EffectInputBase<string> & { kind: "select"; options: ReadonlyArray<{ value: string; label: string }> })
  | (EffectInputBase<string> & { kind: "image" });

export interface EffectRuntimeMetadata {
  kind?: EffectRuntimeKind;
  clientRequired: boolean;
  usesWebGL: boolean;
  performanceCost: "low" | "medium" | "high";
  supportsReducedMotion: boolean;
  pointerInteraction: "none" | "optional" | "required";
}

export interface EffectRenderContext {
  nodeId: string;
  nodeType: NodeType;
  layer: EffectLayer;
  reducedMotion: boolean;
}

export interface EffectComponentProps<Props extends JsonObject = JsonObject> {
  props: Props;
  context: EffectRenderContext;
  children?: ReactNode;
}

export type EffectComponent<Props extends JsonObject = JsonObject> = ComponentType<EffectComponentProps<Props>>;
export type EffectMigration = (attachment: EffectAttachment) => EffectAttachment;

export interface RegisteredEffect<Props extends JsonObject = JsonObject> {
  id: string;
  provider: string;
  name: string;
  description?: string;
  source?: EffectSourceMetadata;
  category: EffectCategory;
  layer: EffectLayer;
  stacking: EffectStacking;
  compatibleNodes: readonly NodeType[];
  conflictsWith?: readonly string[];
  requires?: readonly string[];
  schemaVersion: number;
  inputs: readonly EffectInput[];
  migrations?: Readonly<Record<number, EffectMigration>>;
  component: EffectComponent<Props>;
  fallback?: EffectComponent<Props>;
  runtime: EffectRuntimeMetadata;
}

export interface EffectConfigIssue { key: string; code: string; message: string }
export type EffectPropValidationResult =
  | { success: true; value: JsonObject }
  | { success: false; issues: EffectConfigIssue[] };

export interface EffectRegistry {
  get(id: string): RegisteredEffect | undefined;
  list(): readonly RegisteredEffect[];
}
