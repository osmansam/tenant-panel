export type UrlPolicyFailureReason = "control_character" | "encoded_obfuscation" | "scheme_unsupported";

export type UrlPolicyResult =
  | { success: true; value: string }
  | { success: false; reason: UrlPolicyFailureReason };

const hasControlCharacters = (value: string) => Array.from(value).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127);
const encodedOctet = /%[0-9a-f]{2}/i;
const malformedEncodedOctet = /%(?![0-9a-f]{2})/i;
const schemePrefix = /^([a-z][a-z0-9+.-]*):/i;

export function normalizeLinkUrl(input: unknown): UrlPolicyResult {
  return normalizeUrl(input, "link");
}

export function normalizeImageUrl(input: unknown): UrlPolicyResult {
  return normalizeUrl(input, "image");
}

export function normalizeVideoUrl(input: unknown): UrlPolicyResult {
  return normalizeUrl(input, "video");
}

export function normalizeFormActionUrl(input: unknown): UrlPolicyResult {
  const result = normalizeUrl(input, "form");
  if (result.success && /^[/\\]{2}/.test(result.value)) return { success: false, reason: "scheme_unsupported" };
  return result;
}

function normalizeUrl(input: unknown, kind: "link" | "image" | "video" | "form"): UrlPolicyResult {
  if (typeof input !== "string") return { success: false, reason: "scheme_unsupported" };
  if (hasControlCharacters(input)) return { success: false, reason: "control_character" };

  const value = input.trim();
  if (value.length === 0) return { success: false, reason: "scheme_unsupported" };
  if (malformedEncodedOctet.test(value)) return { success: false, reason: "encoded_obfuscation" };

  const rawScheme = schemePrefix.exec(value)?.[1]?.toLowerCase();
  let decoded = value;
  for (let pass = 0; pass < 8 && encodedOctet.test(decoded); pass += 1) {
    let next: string;
    try {
      next = decodeURIComponent(decoded);
    } catch {
      return { success: false, reason: "encoded_obfuscation" };
    }
    if (next === decoded) break;
    if (hasControlCharacters(next)) return { success: false, reason: "encoded_obfuscation" };
    const decodedScheme = schemePrefix.exec(next)?.[1]?.toLowerCase();
    if (decodedScheme !== undefined && decodedScheme !== rawScheme) {
      return { success: false, reason: "encoded_obfuscation" };
    }
    decoded = next;
  }

  if (rawScheme === undefined) {
    const firstPathDelimiter = value.search(/[/?#]/);
    const firstColon = value.indexOf(":");
    if (firstColon >= 0 && (firstPathDelimiter < 0 || firstColon < firstPathDelimiter)) {
      return { success: false, reason: "scheme_unsupported" };
    }
    return { success: true, value };
  }

  if (kind === "link" && ["http", "https", "mailto", "tel"].includes(rawScheme)) {
    return { success: true, value };
  }
  if (kind === "image" && (rawScheme === "http" || rawScheme === "https" || /^data:image\//i.test(value))) {
    return { success: true, value };
  }
  if (kind === "video" && (rawScheme === "http" || rawScheme === "https")) {
    return { success: true, value };
  }
  if (kind === "form" && (rawScheme === "http" || rawScheme === "https")) {
    return { success: true, value };
  }
  return { success: false, reason: "scheme_unsupported" };
}
