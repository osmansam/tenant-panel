export interface GuideRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** A line shared by edges/centres of the dragged rect and one or more other components. */
export interface AlignmentLine {
  axis: "x" | "y";
  /** Coordinate on the axis (x for vertical lines, y for horizontal lines). */
  position: number;
  start: number;
  end: number;
  kind: "edge" | "center";
}

/** A measured gap that matches another gap, drawn between two rects. */
export interface SpacingGuide {
  axis: "x" | "y";
  start: number;
  end: number;
  /** Cross-axis coordinate where the measurement is drawn. */
  cross: number;
  size: number;
}

export interface AlignmentGuides {
  lines: AlignmentLine[];
  spacing: SpacingGuide[];
}

export const GUIDE_THRESHOLD = 4;

export function computeAlignmentGuides(moving: GuideRect, others: GuideRect[], threshold = GUIDE_THRESHOLD): AlignmentGuides {
  const candidates = others.filter((rect) => rect.width > 0 && rect.height > 0);
  return {
    lines: [...alignmentLines(moving, candidates, "x", threshold), ...alignmentLines(moving, candidates, "y", threshold)],
    spacing: [...spacingGuides(moving, candidates, "x", threshold), ...spacingGuides(moving, candidates, "y", threshold)],
  };
}

export function hasGuides(guides: AlignmentGuides): boolean {
  return guides.lines.length > 0 || guides.spacing.length > 0;
}

function alignmentLines(moving: GuideRect, others: GuideRect[], axis: "x" | "y", threshold: number): AlignmentLine[] {
  const lines = new Map<string, AlignmentLine>();
  const movingStops = stops(moving, axis);
  const [crossStart, crossEnd] = crossRange(moving, axis);
  for (const other of others) {
    const [otherCrossStart, otherCrossEnd] = crossRange(other, axis);
    for (const movingStop of movingStops) {
      for (const otherStop of stops(other, axis)) {
        if (movingStop.kind !== otherStop.kind) continue;
        if (Math.abs(movingStop.value - otherStop.value) > threshold) continue;
        const key = `${otherStop.kind}:${round(otherStop.value)}`;
        const start = Math.min(crossStart, otherCrossStart);
        const end = Math.max(crossEnd, otherCrossEnd);
        const existing = lines.get(key);
        lines.set(key, existing
          ? { ...existing, start: Math.min(existing.start, start), end: Math.max(existing.end, end) }
          : { axis, position: otherStop.value, start, end, kind: otherStop.kind });
      }
    }
  }
  return [...lines.values()];
}

function spacingGuides(moving: GuideRect, others: GuideRect[], axis: "x" | "y", threshold: number): SpacingGuide[] {
  const m = project(moving, axis);
  const peers = others
    .filter((other) => overlaps(crossRange(moving, axis), crossRange(other, axis)))
    .map((other) => project(other, axis))
    .sort((a, b) => a.start - b.start);
  const before = peers.filter((peer) => peer.end <= m.start).sort((a, b) => b.end - a.end);
  const after = peers.filter((peer) => peer.start >= m.end).sort((a, b) => a.start - b.start);
  const left = before[0];
  const right = after[0];
  const cross = (crossRange(moving, axis)[0] + crossRange(moving, axis)[1]) / 2;
  const guide = (start: number, end: number): SpacingGuide => ({ axis, start, end, cross, size: end - start });
  const near = (a: number, b: number) => Math.abs(a - b) <= threshold;

  if (left && right) {
    const gapBefore = m.start - left.end;
    const gapAfter = right.start - m.end;
    if (near(gapBefore, gapAfter)) return [guide(left.end, m.start), guide(m.end, right.start)];
  }
  if (left) {
    const gap = m.start - left.end;
    const further = before.find((peer) => peer !== left && peer.end <= left.start);
    if (further && near(left.start - further.end, gap)) return [guide(further.end, left.start), guide(left.end, m.start)];
  }
  if (right) {
    const gap = right.start - m.end;
    const further = after.find((peer) => peer !== right && peer.start >= right.end);
    if (further && near(further.start - right.end, gap)) return [guide(m.end, right.start), guide(right.end, further.start)];
  }
  return [];
}

interface Stop { value: number; kind: "edge" | "center" }

function stops(rect: GuideRect, axis: "x" | "y"): Stop[] {
  const { start, end } = project(rect, axis);
  return [{ value: start, kind: "edge" }, { value: end, kind: "edge" }, { value: (start + end) / 2, kind: "center" }];
}

function project(rect: GuideRect, axis: "x" | "y"): { start: number; end: number } {
  return axis === "x"
    ? { start: rect.left, end: rect.left + rect.width }
    : { start: rect.top, end: rect.top + rect.height };
}

function crossRange(rect: GuideRect, axis: "x" | "y"): [number, number] {
  const { start, end } = project(rect, axis === "x" ? "y" : "x");
  return [start, end];
}

function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.min(a[1], b[1]) - Math.max(a[0], b[0]) > 0;
}

function round(value: number): number {
  return Math.round(value * 2) / 2;
}
