import type { NodeType } from "./nodes";
import type { ColorValue } from "./paint";
import { isSafeCustomColor } from "./paint";
import { COLOR_TOKENS } from "./styles";

export const CONDITIONAL_COLOR_OPERATORS = ["eq", "neq", "lt", "lte", "gt", "gte", "between"] as const;
export type ConditionalColorOperator = (typeof CONDITIONAL_COLOR_OPERATORS)[number];
export interface ConditionalColors { text?: ColorValue; background?: ColorValue; border?: ColorValue }
export interface ConditionalColorRule {
  id: string;
  path: string[];
  operator: ConditionalColorOperator;
  value: string | number | boolean;
  /** Exclusive upper bound for Between; value is its inclusive lower bound. */
  upper?: number;
  colors: ConditionalColors;
}
export const MAX_CONDITIONAL_COLOR_RULES = 20;
const unsupported = new Set<NodeType>(["slot", "disclosure", "accordion", "tabs", "sidebar", "scroll-story", "scroll-scene", "repeater"]);
export const supportsConditionalColors = (type: NodeType): boolean => !unsupported.has(type);
const blocked = new Set(["__proto__", "prototype", "constructor"]);
const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
const only = (value: Record<string, unknown>, keys: string[]) => Object.keys(value).every(key => keys.includes(key));
const number = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
export const validConditionalColorPath = (path: unknown): path is string[] => Array.isArray(path) && path.length > 0 && path.length <= 16 && path.every(part => typeof part === "string" && part.length <= 128 && /^[A-Za-z0-9_$-]+$/.test(part) && !blocked.has(part));
function color(value: unknown): value is ColorValue {
  return object(value) && only(value, ["kind", "value"]) && typeof value.value === "string" && (value.kind === "token" ? (COLOR_TOKENS as readonly string[]).includes(value.value) : value.kind === "custom" && isSafeCustomColor(value.value));
}
export function isConditionalColorRules(value: unknown): value is ConditionalColorRule[] {
  if (!Array.isArray(value) || value.length > MAX_CONDITIONAL_COLOR_RULES) return false;
  const ids = new Set<string>();
  return value.every(rule => {
    if (!object(rule) || !only(rule, ["id", "path", "operator", "value", "upper", "colors"]) || typeof rule.id !== "string" || !/^[A-Za-z0-9_-]{1,128}$/.test(rule.id) || ids.has(rule.id) || !validConditionalColorPath(rule.path) || !(CONDITIONAL_COLOR_OPERATORS as readonly unknown[]).includes(rule.operator)) return false;
    ids.add(rule.id);
    if (rule.operator === "between") { if (!number(rule.value) || !number(rule.upper) || rule.upper <= rule.value) return false; }
    else if (rule.upper !== undefined) return false;
    if (["lt", "lte", "gt", "gte"].includes(String(rule.operator)) && !number(rule.value)) return false;
    if (!(number(rule.value) || typeof rule.value === "boolean" || typeof rule.value === "string" && rule.value.length <= 512)) return false;
    return object(rule.colors) && Object.keys(rule.colors).length > 0 && only(rule.colors, ["text", "background", "border"]) && Object.values(rule.colors).every(color);
  });
}

/** Strict comparisons on the original item; no coercion, expressions or inherited fields. */
export function matchingConditionalColors(rules: readonly ConditionalColorRule[] | undefined, item: unknown): ConditionalColors | undefined {
  if (item === undefined || !rules) return undefined;
  for (const rule of rules) {
    let value: unknown = item;
    for (const part of rule.path) {
      if (blocked.has(part) || !value || typeof value !== "object" || !Object.prototype.hasOwnProperty.call(value, part)) { value = undefined; break; }
      value = (value as Record<string, unknown>)[part];
    }
    if (!(number(value) || typeof value === "string" || typeof value === "boolean")) continue;
    const matches = rule.operator === "eq" ? value === rule.value
      : rule.operator === "neq" ? typeof value === typeof rule.value && value !== rule.value
      : !number(value) || !number(rule.value) ? false
      : rule.operator === "lt" ? value < rule.value
      : rule.operator === "lte" ? value <= rule.value
      : rule.operator === "gt" ? value > rule.value
      : rule.operator === "gte" ? value >= rule.value
      : rule.operator === "between" && rule.upper !== undefined && value >= rule.value && value < rule.upper;
    if (matches) return rule.colors;
  }
  return undefined;
}
