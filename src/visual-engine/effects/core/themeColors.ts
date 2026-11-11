import type { JsonObject, JsonValue } from "../../model/effects";
import { isSafeCustomColor } from "../../model/paint";
import {
  THEME_COLOR_TOKENS,
  themeColorCss,
  type ResolvedThemePalette,
} from "../../theme";
import type { EffectColorValue, RegisteredEffect } from "./types";

export type { EffectColorValue } from "./types";
export type EffectColorDelivery = "css" | "concrete";

export function isEffectColorValue(value: JsonValue): value is EffectColorValue {
  if (typeof value === "string") return isSafeCustomColor(value);
  if (!isRecord(value) || Object.keys(value).some((key) => key !== "kind" && key !== "value")) return false;
  if (value.kind === "custom") return typeof value.value === "string" && isSafeCustomColor(value.value);
  return value.kind === "token"
    && typeof value.value === "string"
    && THEME_COLOR_TOKENS.includes(value.value as (typeof THEME_COLOR_TOKENS)[number]);
}

export function resolveEffectColor(
  value: EffectColorValue,
  palette: ResolvedThemePalette,
  delivery: EffectColorDelivery,
): string {
  if (typeof value === "string") return value;
  if (value.kind === "custom") return value.value.trim();
  if (value.value === "transparent") return "transparent";
  return delivery === "css" ? themeColorCss(value) : palette[value.value];
}

export function resolveEffectColorProps(
  effect: RegisteredEffect,
  props: JsonObject,
  palette: ResolvedThemePalette,
): JsonObject {
  const delivery = effectColorDelivery(effect);
  let resolved: JsonObject | undefined;
  for (const input of effect.inputs) {
    if (input.kind !== "color" || input.acceptsSemantic !== true) continue;
    const value = props[input.key];
    if (!isEffectColorValue(value)) continue;
    resolved ??= { ...props };
    resolved[input.key] = resolveEffectColor(value, palette, delivery);
  }
  return resolved ?? props;
}

function effectColorDelivery(effect: RegisteredEffect): EffectColorDelivery {
  const runtime = effect.runtime.kind ?? (effect.runtime.usesWebGL ? "webgl" : "dom");
  return runtime === "css" || runtime === "dom" ? "css" : "concrete";
}

function isRecord(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
