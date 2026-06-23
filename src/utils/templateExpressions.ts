export type TemplateContext = Record<string, unknown>;

export type TemplateColorRule = {
  condition?: string;
  color?: string;
};

const getPathValue = (source: unknown, path: string): unknown => {
  if (!path) return "";
  return path.split(".").reduce<unknown>((current, key) => {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current) && /^\d+$/.test(key)) {
      return current[Number(key)];
    }
    if (typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
};

const stringifyValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
};

const splitOutsideQuotes = (value: string, separator: string) => {
  let quote: '"' | "'" | "" = "";
  let depth = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (quote) {
      if (char === quote && value[index - 1] !== "\\") quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (depth === 0 && value.startsWith(separator, index)) {
      return [value.slice(0, index), value.slice(index + separator.length)];
    }
  }

  return undefined;
};

const findComparison = (value: string) => {
  const operators = [">=", "<=", "==", "!=", ">", "<"];
  for (const operator of operators) {
    const parts = splitOutsideQuotes(value, operator);
    if (parts) return { left: parts[0], operator, right: parts[1] };
  }
  return undefined;
};

const stripWrappingParentheses = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed.startsWith("(") || !trimmed.endsWith(")")) return trimmed;
  return trimmed.slice(1, -1).trim();
};

const parseLiteral = (value: string, context: TemplateContext): unknown => {
  const trimmed = stripWrappingParentheses(value);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric) && trimmed !== "") return numeric;
  return getPathValue(context, trimmed);
};

const parseComparableValue = (
  value: string,
  context: TemplateContext,
): string | number | boolean => {
  const parsed = parseTemplateExpression(value, context);
  if (typeof parsed === "number" || typeof parsed === "boolean") return parsed;
  const stringValue = stringifyValue(parsed).trim();
  const numeric = Number(stringValue);
  return Number.isNaN(numeric) || stringValue === "" ? stringValue : numeric;
};

const evaluateComparison = (expression: string, context: TemplateContext) => {
  const comparison = findComparison(expression);
  if (!comparison) return Boolean(parseTemplateExpression(expression, context));

  const left = parseComparableValue(comparison.left, context);
  const right = parseComparableValue(comparison.right, context);

  if (typeof left === "number" && typeof right === "number") {
    if (comparison.operator === ">") return left > right;
    if (comparison.operator === ">=") return left >= right;
    if (comparison.operator === "<") return left < right;
    if (comparison.operator === "<=") return left <= right;
  }

  if (comparison.operator === "==") return String(left) === String(right);
  if (comparison.operator === "!=") return String(left) !== String(right);
  return false;
};

const evaluateConcatenation = (
  expression: string,
  context: TemplateContext,
): unknown => {
  const parts: string[] = [];
  let remaining = expression;
  let split = splitOutsideQuotes(remaining, "+");
  while (split) {
    parts.push(split[0]);
    remaining = split[1];
    split = splitOutsideQuotes(remaining, "+");
  }
  if (parts.length === 0) return parseLiteral(expression, context);
  parts.push(remaining);
  return parts
    .map((part) => stringifyValue(parseTemplateExpression(part, context)))
    .join("");
};

export const parseTemplateExpression = (
  expression: string,
  context: TemplateContext,
): unknown => {
  const trimmed = stripWrappingParentheses(expression);
  const ternaryCondition = splitOutsideQuotes(trimmed, "?");
  if (ternaryCondition) {
    const branches = splitOutsideQuotes(ternaryCondition[1], ":");
    if (branches) {
      return evaluateComparison(ternaryCondition[0], context)
        ? parseTemplateExpression(branches[0], context)
        : parseTemplateExpression(branches[1], context);
    }
  }

  const comparison = findComparison(trimmed);
  if (comparison) return evaluateComparison(trimmed, context);

  return evaluateConcatenation(trimmed, context);
};

export const resolveTemplate = (
  template: string | undefined,
  context: TemplateContext,
) => {
  if (!template) return "";
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, expression) =>
    stringifyValue(parseTemplateExpression(String(expression), context)),
  );
};

export const resolveConditionalColor = (
  rules: TemplateColorRule[] | undefined,
  context: TemplateContext,
) => {
  let defaultColor = "";

  for (const rule of rules || []) {
    const condition = rule.condition?.trim();
    const color = rule.color?.trim();
    if (!condition || !color) continue;
    if (condition.toLowerCase() === "default") {
      defaultColor = color;
      continue;
    }
    if (evaluateComparison(resolveTemplate(condition, context), context)) {
      return color;
    }
  }

  return defaultColor || undefined;
};
