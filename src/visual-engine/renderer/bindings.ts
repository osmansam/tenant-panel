import type { ComponentNode, FieldBinding } from "../model";
import { normalizeImageUrl, normalizeLinkUrl } from "../model/urls";

const unsafeSegments = new Set(["__proto__", "prototype", "constructor"]);

export function resolveFieldBinding(record: unknown, path: readonly string[]): unknown {
  let current: unknown = record;
  for (const segment of path) {
    if (unsafeSegments.has(segment) || typeof current !== "object" || current === null || !Object.prototype.hasOwnProperty.call(current, segment)) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

export function resolveBoundNodeValue(fallback: string, binding: FieldBinding | undefined, record: unknown, kind: "text" | "url"): string {
  if (!binding) return interpolateItemTemplate(fallback, record, kind);
  const value = resolveFieldBinding(record, binding.path);
  if (kind === "text" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) return String(value);
  if (kind === "url" && typeof value === "string") return value;
  return interpolateItemTemplate(fallback, record, kind);
}

/** Single-pass field substitution only; record values are never evaluated or re-expanded. */
function interpolateItemTemplate(template: string, record: unknown, kind: "text" | "url"): string {
  if (record === undefined && kind === "text") return template;
  let complete = true;
  const value = template.replace(/\{\{\s*item\.([A-Za-z0-9_$-]+(?:\.[A-Za-z0-9_$-]+)*)\s*\}\}/g, (_token, path: string) => {
    const field = resolveFieldBinding(record, path.split("."));
    if (typeof field === "string" || typeof field === "number" || typeof field === "boolean") {
      if (field === "") complete = false;
      return String(field);
    }
    complete = false;
    return "";
  });
  return kind === "url" && !complete ? "" : value;
}

export function bindNode(node: ComponentNode, record: unknown): ComponentNode {
  if (!node.bindings && !Object.values(node).some(value => typeof value === "string" && value.includes("{{"))) return node;
  const bindings = node.bindings ?? {};
  switch (node.type) {
    case "heading":
    case "text":
      return { ...node, text: resolveBoundNodeValue(node.text, bindings.text, record, "text") };
    case "image":
      return {
        ...node,
        src: resolveSafeBoundUrl(node.src, bindings.src, record, "image"),
        alt: resolveBoundNodeValue(node.alt, bindings.alt, record, "text"),
      };
    case "button":
      return {
        ...node,
        label: resolveBoundNodeValue(node.label, bindings.label, record, "text"),
        ...(node.href === undefined ? {} : { href: resolveSafeBoundUrl(node.href, bindings.href, record, "link") }),
        ...(node.accessibleLabel === undefined ? {} : { accessibleLabel: resolveBoundNodeValue(node.accessibleLabel, bindings.accessibleLabel, record, "text") }),
      };
    case "badge":
      return { ...node, text: resolveBoundNodeValue(node.text, bindings.text, record, "text") };
    case "link":
      return {
        ...node,
        label: resolveBoundNodeValue(node.label, bindings.label, record, "text"),
        href: resolveSafeBoundUrl(node.href, bindings.href, record, "link"),
        ...(node.accessibleLabel === undefined ? {} : { accessibleLabel: resolveBoundNodeValue(node.accessibleLabel, bindings.accessibleLabel, record, "text") }),
      };
    case "avatar":
      return {
        ...node,
        src: resolveSafeBoundUrl(node.src, bindings.src, record, "image"),
        alt: resolveBoundNodeValue(node.alt, bindings.alt, record, "text"),
        fallback: resolveBoundNodeValue(node.fallback, bindings.fallback, record, "text"),
      };
    case "icon":
      return node.decorative || node.accessibleLabel === undefined ? node : {
        ...node,
        accessibleLabel: resolveBoundNodeValue(node.accessibleLabel, bindings.accessibleLabel, record, "text"),
      };
    case "stat":
      return {
        ...node,
        value: resolveBoundNodeValue(node.value, bindings.value, record, "text"),
        label: resolveBoundNodeValue(node.label, bindings.label, record, "text"),
        ...(node.prefix === undefined ? {} : { prefix: resolveBoundNodeValue(node.prefix, bindings.prefix, record, "text") }),
        ...(node.suffix === undefined ? {} : { suffix: resolveBoundNodeValue(node.suffix, bindings.suffix, record, "text") }),
      };
    case "quote":
      return {
        ...node,
        quote: resolveBoundNodeValue(node.quote, bindings.quote, record, "text"),
        author: resolveBoundNodeValue(node.author, bindings.author, record, "text"),
        ...(node.role === undefined ? {} : { role: resolveBoundNodeValue(node.role, bindings.role, record, "text") }),
        ...(node.avatarSrc === undefined ? {} : { avatarSrc: resolveSafeBoundUrl(node.avatarSrc, bindings.avatarSrc, record, "image") }),
        ...(node.avatarAlt === undefined ? {} : { avatarAlt: resolveBoundNodeValue(node.avatarAlt, bindings.avatarAlt, record, "text") }),
      };
    default:
      return node;
  }
}

function resolveSafeBoundUrl(fallback: string, binding: FieldBinding | undefined, record: unknown, kind: "link" | "image"): string {
  if (!binding && !fallback.includes("{{")) return fallback;
  const candidate = resolveBoundNodeValue(fallback, binding, record, "url");
  const templated = fallback.includes("{{");
  const inert = kind === "image" ? "" : "#";
  // Do not turn unresolved templates (including tokens returned by an API) into requests.
  if (templated && /[{}]/.test(candidate)) return inert;
  const normalized = kind === "link" ? normalizeLinkUrl(candidate) : normalizeImageUrl(candidate);
  if (normalized.success) return normalized.value;
  if (!templated) return fallback;
  const resolvedFallback = interpolateItemTemplate(fallback, record, "url");
  if (/[{}]/.test(resolvedFallback)) return inert;
  const safeFallback = kind === "link" ? normalizeLinkUrl(resolvedFallback) : normalizeImageUrl(resolvedFallback);
  return safeFallback.success ? safeFallback.value : inert;
}
