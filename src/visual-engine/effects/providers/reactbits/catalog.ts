import type { EffectRuntimeKind, RegisteredEffect } from "../../core";

export const REACT_BITS_PIN = {
  inspectedAt: "2026-09-11",
  revision: "main@2026-09-11",
} as const;

export const REACT_BITS_BACKGROUND_INVENTORY = [
  "AcidSquares", "AeroShards", "Aurora", "Balatro", "Ballpit", "Beams", "CRTWarp",
  "ColorBends", "DarkVeil", "Dither", "DotField", "DotGrid", "EvilEye", "FaultyTerminal",
  "Ferrofluid", "FloatingLines", "Galaxy", "GhostFibers", "GradientBlinds", "GradientWaves",
  "Grainient", "GridDistortion", "GridMotion", "GridScan", "Hyperspeed", "Iridescence",
  "LetterGlitch", "LightPillar", "LightRays", "LightTunnel", "Lightfall", "Lightning",
  "LineWaves", "LiquidChrome", "LiquidEther", "MoltenMetal", "Orb", "Particles", "PixelBlast",
  "PixelSnow", "Plasma", "PlasmaWave", "Prism", "PrismaticBurst", "Radar", "RippleGrid",
  "Scanner", "ShapeGrid", "SideRays", "Silk", "SlicedWaves", "SoftAurora", "Squares",
  "Threads", "Topography", "Waves", "WebThreads",
] as const;

export const REACT_BITS_TEXT_INVENTORY = [
  "ASCIIText", "BlurText", "CircularText", "CountUp", "CurvedLoop", "DecryptedText", "DepthText",
  "EchoText", "FallingText", "FoldText", "FuzzyText", "GlitchText", "GradientText",
  "MaskedHeading", "ParticleText", "RotatingText", "ScrambledText", "ScrollFloat", "ScrollReveal",
  "ScrollVelocity", "ShinyText", "Shuffle", "SplitFlapText", "SplitText", "StrokeText",
  "TextCursor", "TextLoop", "TextPressure", "TextType", "TrueFocus", "VariableProximity", "WarpText",
] as const;

const canvasBackgrounds = new Set([
  "beams", "grid-motion", "grid-distortion", "hyperspeed", "letter-glitch", "squares", "waves", "pixel-blast",
]);

function componentName(effect: RegisteredEffect): string {
  return effect.id.split(".").at(-1)!.split("-").map(part => part === "crt" ? "CRT" : part === "ascii" ? "ASCII" : part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

function runtimeKind(effect: RegisteredEffect): EffectRuntimeKind {
  if (effect.runtime.usesWebGL) return "webgl";
  const slug = effect.id.split(".").at(-1)!;
  if (effect.category === "background" && canvasBackgrounds.has(slug)) return "canvas2d";
  return effect.category === "text" || effect.category === "button" ? "dom" : "css";
}

export function withReactBitsMetadata(effect: RegisteredEffect): RegisteredEffect {
  return {
    ...effect,
    source: { provider: "reactbits", component: componentName(effect), revision: REACT_BITS_PIN.revision },
    runtime: { ...effect.runtime, kind: runtimeKind(effect) },
  };
}

export function assertReactBitsCatalogComplete(effects: readonly RegisteredEffect[]): void {
  const names = new Set(effects.map(effect => effect.source?.component));
  const missing = [...REACT_BITS_BACKGROUND_INVENTORY, ...REACT_BITS_TEXT_INVENTORY].filter(name => !names.has(name));
  if (missing.length > 0) throw new Error(`Missing React Bits effects: ${missing.join(", ")}`);
}
