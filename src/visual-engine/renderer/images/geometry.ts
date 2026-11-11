import type { ImageNode } from "../../model";

export interface ImageDeliveryGeometry { width: number; height: number; sizes: string }
const aspectRatios = { square: 1, landscape: 4 / 3, wide: 16 / 9, portrait: 3 / 4 } as const;

function pixels(value: string | undefined): number | undefined {
  if (!value || !/^\d+(?:\.\d+)?px$/.test(value.trim())) return undefined;
  const number = Number.parseFloat(value);
  return number > 0 && Number.isFinite(number) ? number : undefined;
}

/** Supply delivery dimensions only when CSS already determines the displayed box. */
export function imageDeliveryGeometry(node: ImageNode): ImageDeliveryGeometry | undefined {
  const authoredWidth = node.style?.custom?.width ?? node.style?.sizing?.width;
  const authoredHeight = node.style?.custom?.height ?? node.style?.sizing?.height;
  const width = pixels(authoredWidth);
  const height = pixels(authoredHeight);
  if (width && height) return { width, height, sizes: `(max-width: ${width}px) 100vw, ${width}px` };
  const ratio = node.aspectRatio && node.aspectRatio !== "original" ? aspectRatios[node.aspectRatio] : undefined;
  if (!ratio || authoredHeight !== undefined && authoredHeight !== "auto") return undefined;
  if (width) return { width, height: Math.round(width / ratio), sizes: `(max-width: ${width}px) 100vw, ${width}px` };
  if (authoredWidth === "full" || authoredWidth === "100%") return { width: 1920, height: Math.round(1920 / ratio), sizes: "100vw" };
  return undefined;
}

