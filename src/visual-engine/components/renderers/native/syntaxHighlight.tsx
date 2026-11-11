import { Fragment, type ReactNode } from "react";

type TokenKind =
  | "boolean"
  | "comment"
  | "header"
  | "key"
  | "keyword"
  | "method"
  | "null"
  | "number"
  | "punctuation"
  | "status"
  | "string";

const token = (kind: TokenKind, value: string, key: number): ReactNode => (
  <span className={`ve-code-token ve-code-token--${kind}`} key={key}>{value}</span>
);

function tokenize(source: string, pattern: RegExp, classify: (value: string, offset: number) => TokenKind | null): ReactNode[] {
  const result: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const match of source.matchAll(pattern)) {
    const offset = match.index ?? 0;
    if (offset > cursor) result.push(source.slice(cursor, offset));
    const kind = classify(match[0], offset);
    result.push(kind ? token(kind, match[0], key++) : match[0]);
    cursor = offset + match[0].length;
  }
  if (cursor < source.length) result.push(source.slice(cursor));
  return result;
}

function highlightJson(source: string): ReactNode[] {
  const pattern = /"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|[{}[\],:]/gi;
  return tokenize(source, pattern, (value, offset) => {
    if (value.startsWith('"')) return /^\s*:/.test(source.slice(offset + value.length)) ? "key" : "string";
    if (value === "true" || value === "false") return "boolean";
    if (value === "null") return "null";
    if (/^[{}[\],:]$/.test(value)) return "punctuation";
    return "number";
  });
}

function highlightScript(source: string): ReactNode[] {
  const keywords = new Set(["as", "async", "await", "break", "case", "catch", "class", "const", "continue", "default", "else", "export", "extends", "false", "finally", "for", "from", "function", "if", "import", "in", "instanceof", "interface", "let", "new", "null", "of", "return", "switch", "throw", "true", "try", "type", "typeof", "undefined", "while"]);
  const pattern = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b/g;
  return tokenize(source, pattern, (value) => {
    if (value.startsWith("//") || value.startsWith("/*")) return "comment";
    if (/^[`'"]/.test(value)) return "string";
    if (/^\d/.test(value)) return "number";
    return keywords.has(value) ? "keyword" : null;
  });
}

function highlightHttp(source: string): ReactNode[] {
  const result: ReactNode[] = [];
  for (const [partIndex, part] of source.split(/(\n)/).entries()) {
    if (part === "\n") {
      result.push(part);
      continue;
    }
    const method = part.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)(?=\s)/);
    if (method) {
      result.push(<Fragment key={`part-${partIndex}`}>{token("method", method[0], 0)}{part.slice(method[0].length)}</Fragment>);
      continue;
    }
    const response = part.match(/^(HTTP\/\d(?:\.\d)?\s)(\d{3})(.*)$/);
    if (response) {
      result.push(<Fragment key={`part-${partIndex}`}>{response[1]}{token("status", response[2], 0)}{response[3]}</Fragment>);
      continue;
    }
    const header = part.match(/^([A-Za-z][\w-]*)(:.*)$/);
    if (header) {
      result.push(<Fragment key={`part-${partIndex}`}>{token("header", header[1], 0)}{header[2]}</Fragment>);
      continue;
    }
    result.push(<Fragment key={`part-${partIndex}`}>{highlightJson(part)}</Fragment>);
  }
  return result;
}

export function highlightCode(source: string, language: string): ReactNode {
  switch (language.trim().toLowerCase()) {
    case "json": return highlightJson(source);
    case "javascript":
    case "js":
    case "typescript":
    case "ts": return highlightScript(source);
    case "http": return highlightHttp(source);
    default: return source;
  }
}
