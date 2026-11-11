import { cloneJsonObject, type JsonObject, type JsonValue } from "../../model/effects";
import { isSafeCustomColor } from "../../model/paint";
import { normalizeImageUrl } from "../../model/urls";
import type { EffectConfigIssue, EffectInput, EffectPropValidationResult, RegisteredEffect } from "./types";
import { isEffectColorValue } from "./themeColors";

export function defaultsForEffect(effect: RegisteredEffect): JsonObject {
  return Object.fromEntries(effect.inputs.map((input) => [input.key, cloneValue(input.defaultValue)]));
}

export function validateEffectProps(effect: RegisteredEffect, props: JsonObject): EffectPropValidationResult {
  const issues: EffectConfigIssue[] = [];
  const inputs = new Map(effect.inputs.map((input) => [input.key, input]));
  Object.keys(props).forEach((key) => {
    if (!inputs.has(key)) issues.push(configIssue(key, "effect.prop_unknown", "Effect property is not supported"));
  });
  const value = defaultsForEffect(effect);
  effect.inputs.forEach((input) => {
    const candidate = props[input.key];
    if (candidate === undefined) {
      if (input.required) issues.push(configIssue(input.key, "effect.prop_required", `${input.label} is required`));
      return;
    }
    if (!validInputValue(input, candidate)) {
      issues.push(configIssue(input.key, "effect.prop_invalid", `${input.label} is invalid`));
      return;
    }
    value[input.key] = cloneValue(candidate);
  });
  return issues.length === 0 ? { success: true, value } : { success: false, issues };
}

export function assertValidInputSchema(effect: RegisteredEffect): void {
  if (!effect.id.trim()) throw new Error("Effect ID is required");
  if (!effect.provider.trim()) throw new Error(`Provider is required for ${effect.id}`);
  if (!Number.isInteger(effect.schemaVersion) || effect.schemaVersion < 1) throw new Error(`Schema version is invalid for ${effect.id}`);
  const keys = new Set<string>();
  effect.inputs.forEach((input) => {
    if (!input.key.trim()) throw new Error(`Input key is required for ${effect.id}`);
    if (keys.has(input.key)) throw new Error(`Duplicate input key ${input.key} in ${effect.id}`);
    keys.add(input.key);
    if (!validInputValue(input, input.defaultValue)) throw new Error(`Invalid default for ${effect.id}.${input.key}`);
    if (input.kind === "number" && (!Number.isFinite(input.min) || !Number.isFinite(input.max) || !Number.isFinite(input.step) || input.min > input.max || input.step <= 0)) {
      throw new Error(`Invalid number bounds for ${effect.id}.${input.key}`);
    }
    if (input.kind === "select" && (input.options.length === 0 || new Set(input.options.map((option) => option.value)).size !== input.options.length)) {
      throw new Error(`Invalid select options for ${effect.id}.${input.key}`);
    }
  });
}

function validInputValue(input: EffectInput, value: JsonValue): boolean {
  if (input.kind === "boolean") return typeof value === "boolean";
  if (input.kind === "number") return typeof value === "number" && Number.isFinite(value) && value >= input.min && value <= input.max;
  if (input.kind === "color") return typeof value === "string"
    ? isSafeCustomColor(value)
    : input.acceptsSemantic === true && isEffectColorValue(value);
  if (typeof value !== "string") return false;
  if (input.kind === "image") return normalizeImageUrl(value).success;
  if (input.kind === "select") return input.options.some((option) => option.value === value);
  return (!input.required || value.length > 0) && (input.minLength === undefined || value.length >= input.minLength) && (input.maxLength === undefined || value.length <= input.maxLength);
}

function cloneValue(value: JsonValue): JsonValue {
  return value !== null && typeof value === "object" ? cloneJsonObject({ value }).value : value;
}

function configIssue(key: string, code: string, message: string): EffectConfigIssue { return { key, code, message }; }
