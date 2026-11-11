import type { ImgHTMLAttributes } from "react";
import { normalizeImageUrl } from "../../model/urls";
import type { ImageDeliveryGeometry } from "./geometry";
export { imageDeliveryGeometry } from "./geometry";
interface VisualImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "loading" | "decoding" | "fetchPriority" | "width" | "height"> {
  src: string; alt: string; priority?: boolean; geometry?: ImageDeliveryGeometry;
}
/** Browser-native delivery; authored styles continue to determine the layout. */
export function VisualImage({ src, alt, priority = false, geometry, ...props }: VisualImageProps) {
  const normalized = normalizeImageUrl(src);
  return <img {...props} src={normalized.success ? normalized.value : undefined} alt={alt} width={geometry?.width} height={geometry?.height} loading={priority ? "eager" : "lazy"} decoding="async" {...{ fetchpriority: priority ? "high" : undefined }} />;
}
