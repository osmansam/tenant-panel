/**
 * Canvas zoom arithmetic. The frame keeps its real breakpoint width and is
 * scaled with a CSS transform, so every measured rect stays in screen pixels:
 * callers divide screen measurements by the zoom factor to get frame units.
 */
export const CANVAS_ZOOM_MIN = 0.25;
export const CANVAS_ZOOM_MAX = 2;
export const CANVAS_ZOOM_STEP = 0.1;
/** Matches the horizontal padding of the scrollable canvas viewport. */
export const CANVAS_FIT_PADDING = 40;

export function clampZoom(zoom: number): number {
  if (!Number.isFinite(zoom)) return 1;
  return Math.min(CANVAS_ZOOM_MAX, Math.max(CANVAS_ZOOM_MIN, zoom));
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Zoom that keeps the whole frame visible inside the viewport, capped at 100%. */
export function fitZoom(viewport: number, frameWidth: number, padding: number = CANVAS_FIT_PADDING): number {
  if (!(viewport > 0) || !(frameWidth > 0)) return 1;
  return clampZoom(Math.min(1, round2((viewport - padding * 2) / frameWidth)));
}

export function stepZoom(zoom: number, direction: 1 | -1): number {
  return round2(clampZoom(zoom + direction * CANVAS_ZOOM_STEP));
}

/** Converts a screen-pixel measurement into frame (layout) units. */
export function screenToFrame(value: number, zoom: number): number {
  return zoom === 1 ? value : value / zoom;
}

/** "fit" tracks the viewport (auto re-fit on resize/breakpoint change); "custom" is manual. */
export type ZoomMode = "fit" | "custom";
