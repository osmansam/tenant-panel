import type { HeightToken } from "./styles";

export function heightScale(from: HeightToken | undefined, to: HeightToken | undefined): number | null {
  const parse = (value: HeightToken | undefined) => {
    const aliases: Record<string, string> = { compact: "24rem", medium: "36rem", tall: "48rem" };
    return /^(\d+(?:\.\d+)?)(rem|px|vh)$/.exec(aliases[value ?? ""] ?? value ?? "");
  };
  const start = parse(from);
  const end = parse(to);
  if (!start || !end || start[2] !== end[2]) return null;
  return Number(end[1]) / Number(start[1]);
}
