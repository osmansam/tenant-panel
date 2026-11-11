import type { CSSProperties } from "react";
import type { BackgroundLayer } from "../model/paint";
import { normalizeImageUrl, normalizeVideoUrl } from "../model/urls";
import { colorCss, gradientCss } from "./paintStyles";

export function BackgroundLayers({ layers }: { layers: BackgroundLayer[] | undefined }) {
  if (layers === undefined || layers.length === 0) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0, borderRadius: "inherit" }}>
      {[...layers].reverse().map((layer, reverseIndex) => {
        const index = layers.length - reverseIndex - 1;
        if (layer.kind === "video") {
          const safeVideo = normalizeVideoUrl(layer.src);
          if (!safeVideo.success) return null;
          return (
            <span
              key={index}
              data-background-layer="video"
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: layer.opacity ?? 1 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full"
                style={{
                  objectFit: layer.fit,
                  objectPosition: layer.position,
                }}
              >
                <source src={safeVideo.value} />
              </video>
            </span>
          );
        }
        return (
          <span
            key={index}
            data-background-layer={layer.kind === "image" ? "image" : layer.kind === "svg" ? "svg" : layer.kind}
            className="absolute inset-0"
            style={layerStyle(layer as NonVideoLayer)}
          />
        );
      })}
    </div>
  );
}

type NonVideoLayer = Exclude<BackgroundLayer, { kind: "video" }>;

function layerStyle(layer: NonVideoLayer): CSSProperties {
  if (layer.kind === "solid") return { backgroundColor: colorCss(layer.color), opacity: layer.opacity ?? 1 };
  if (layer.kind === "linear-gradient" || layer.kind === "radial-gradient") {
    return { backgroundImage: gradientCss(layer), opacity: layer.opacity ?? 1 };
  }
  if (layer.kind === "svg") {
    const safe = normalizeImageUrl(layer.src);
    return {
      backgroundImage: safe.success ? `url("${safe.value.replace(/["\\]/g, "\\$&")}")` : undefined,
      backgroundSize: layer.fit,
      backgroundPosition: layer.position,
      backgroundRepeat: "no-repeat",
      opacity: layer.opacity ?? 1,
    };
  }
  // image
  const safe = normalizeImageUrl(layer.src);
  return {
    backgroundImage: safe.success ? `url("${safe.value.replace(/["\\]/g, "\\$&")}")` : undefined,
    backgroundSize: layer.fit,
    backgroundPosition: layer.position,
    backgroundRepeat: layer.repeat,
    opacity: layer.opacity ?? 1,
  };
}
