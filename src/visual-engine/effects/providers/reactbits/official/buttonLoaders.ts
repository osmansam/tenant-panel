import type { ComponentType } from "react";

type Loader = () => Promise<{ default: ComponentType<any> }>;

export const OFFICIAL_BUTTON_LOADERS: Record<string, Loader> = {
  "animated-content": () => import("./buttons/AnimatedContent/AnimatedContent"),
  "fade-content": () => import("./buttons/FadeContent/FadeContent"),
  "border-glow": () => import("./buttons/BorderGlow/BorderGlow"),
  "click-spark": () => import("./buttons/ClickSpark/ClickSpark"),
  "electric-border": () => import("./buttons/ElectricBorder/ElectricBorder"),
  "glare-hover": () => import("./buttons/GlareHover/GlareHover"),
  "halftone-reveal": () => import("./buttons/HalftoneReveal/HalftoneReveal"),
  "magnet-lines": () => import("./buttons/MagnetLines/MagnetLines"),
  "magnet": () => import("./buttons/Magnet/Magnet"),
  "noise": () => import("./buttons/Noise/Noise"),
  "pixel-swap": () => import("./buttons/PixelSwap/PixelSwap"),
  "pixel-transition": () => import("./buttons/PixelTransition/PixelTransition"),
  "shape-blur": () => import("./buttons/ShapeBlur/ShapeBlur"),
  "sticker-peel": () => import("./buttons/StickerPeel/StickerPeel"),
  "specular-button": () => import("./buttons/SpecularButton/SpecularButton"),
  "star-border": () => import("./buttons/StarBorder/StarBorder"),
};
