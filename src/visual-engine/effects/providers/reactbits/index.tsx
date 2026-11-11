"use client";

import type { CSSProperties } from "react";
import type { EffectComponentProps, RegisteredEffect } from "../../core";
import { REACT_BITS_CONTENT_EFFECTS } from "./content";
import { lazyEffect } from "./LazyEffect";
import { withReactBitsMetadata } from "./catalog";
import { OFFICIAL_BACKGROUND_LOADERS } from "./official/backgroundLoaders";
import { OFFICIAL_BACKGROUND_INPUTS } from "./official/backgroundInputs";

const nodes = ["section", "grid", "stack", "flex", "card", "overlay", "form"] as const;
const runtime = { clientRequired: true, usesWebGL: true, performanceCost: "medium", supportsReducedMotion: true, pointerInteraction: "optional" } as const;
const nonInteractiveRuntime = { ...runtime, pointerInteraction: "none" } as const;

function StaticFallback({ props }: EffectComponentProps) {
  const color = String(props.colorA ?? props.color ?? props.waveColor ?? props.particleColor ?? "#ffffff");
  return <span className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 45%, ${color}55, transparent 65%)` } as CSSProperties} data-reactbits-fallback="true" />;
}

const Aurora = lazyEffect(() => import("./ShaderBackground").then(module => ({ default: module.ShaderBackground })), ({ props, context }) => ({
  mode: "aurora",
  colorA: String(props.colorA),
  colorB: String(props.colorB),
  speed: Number(props.speed),
  intensity: Number(props.intensity),
  blend: Number(props.blend),
  pointerStrength: 0,
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const Threads = lazyEffect(() => import("./ShaderBackground").then(module => ({ default: module.ShaderBackground })), ({ props, context }) => ({
  mode: "threads",
  colorA: String(props.colorA),
  intensity: Number(props.amplitude),
  distance: Number(props.distance),
  pointerStrength: props.enableMouseInteraction === true ? 1 : 0,
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const LightRays = lazyEffect(() => import("./ShaderBackground").then(module => ({ default: module.ShaderBackground })), ({ props, context }) => ({
  mode: "rays",
  colorA: String(props.colorA),
  speed: Number(props.speed),
  intensity: Number(props.intensity),
  rayLength: Number(props.rayLength),
  fadeDistance: Number(props.fadeDistance),
  pointerStrength: props.followMouse === true ? Number(props.pointerStrength) : 0,
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const SilkEffect = lazyEffect(() => import("./Silk"), ({ props, context }) => ({
  speed: Number(props.speed),
  scale: Number(props.scale),
  color: String(props.color),
  noiseIntensity: Number(props.noiseIntensity),
  rotation: Number(props.rotation),
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const DitherEffect = lazyEffect(() => import("./Dither"), ({ props, context }) => ({
  waveSpeed: props.waveSpeed !== undefined ? Number(props.waveSpeed) : 0.05,
  waveFrequency: props.waveFrequency !== undefined ? Number(props.waveFrequency) : 3,
  waveAmplitude: props.waveAmplitude !== undefined ? Number(props.waveAmplitude) : 0.3,
  waveColor: hexTuple(props.waveColor ? String(props.waveColor) : "#808080", [0.5, 0.5, 0.5]),
  backgroundColor: hexTuple(props.backgroundColor ? String(props.backgroundColor) : "#000000", [0, 0, 0]),
  colorNum: props.colorNum !== undefined ? Number(props.colorNum) : 4,
  pixelSize: props.pixelSize !== undefined ? Number(props.pixelSize) : 2,
  disableAnimation: context.reducedMotion,
  enableMouseInteraction: !context.reducedMotion && props.enableMouseInteraction !== false,
  mouseRadius: props.mouseRadius !== undefined ? Number(props.mouseRadius) : 1,
}), StaticFallback);

function hexTuple(value?: string | null, fallback: [number, number, number] = [0.5, 0.5, 0.5]): [number, number, number] {
  if (!value || typeof value !== "string") return fallback;
  const clean = value.replace(/^#/, "").trim();
  if (clean.length === 3) {
    const r = Number.parseInt(clean[0] + clean[0], 16) / 255;
    const g = Number.parseInt(clean[1] + clean[1], 16) / 255;
    const b = Number.parseInt(clean[2] + clean[2], 16) / 255;
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b];
  }
  if (clean.length === 6) {
    const r = Number.parseInt(clean.slice(0, 2), 16) / 255;
    const g = Number.parseInt(clean.slice(2, 4), 16) / 255;
    const b = Number.parseInt(clean.slice(4, 6), 16) / 255;
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b];
  }
  return fallback;
}
const ParticlesEffect = lazyEffect(() => import("./Particles"), ({ props, context }) => ({
  particleCount: Number(props.particleCount),
  particleSpread: Number(props.particleSpread),
  speed: Number(props.speed),
  particleColors: [String(props.particleColor)],
  moveParticlesOnHover: !context.reducedMotion && props.moveParticlesOnHover === true,
  particleHoverFactor: Number(props.particleHoverFactor),
  alphaParticles: props.alphaParticles === true,
  particleBaseSize: Number(props.particleBaseSize),
  sizeRandomness: Number(props.sizeRandomness),
  cameraDistance: Number(props.cameraDistance),
  disableRotation: context.reducedMotion || props.disableRotation === true,
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const GalaxyEffect = lazyEffect(() => import("./Galaxy"), ({ props, context }) => ({
  starSpeed: Number(props.starSpeed),
  density: Number(props.density),
  hueShift: Number(props.hueShift),
  disableAnimation: context.reducedMotion,
  speed: Number(props.speed),
  mouseInteraction: !context.reducedMotion && props.mouseInteraction === true,
  glowIntensity: Number(props.glowIntensity),
  saturation: Number(props.saturation),
  mouseRepulsion: props.mouseRepulsion === true,
  repulsionStrength: Number(props.repulsionStrength),
  twinkleIntensity: Number(props.twinkleIntensity),
  rotationSpeed: Number(props.rotationSpeed),
  autoCenterRepulsion: Number(props.autoCenterRepulsion),
  transparent: props.transparent === true,
  lightMode: props.lightMode === true,
}), StaticFallback);
const DotGridEffect = lazyEffect(() => import("./DotGrid"), ({ props, context }) => ({
  dotSize: Number(props.dotSize),
  gap: Number(props.gap),
  baseColor: String(props.baseColor),
  activeColor: String(props.activeColor),
  proximity: Number(props.proximity),
  speedTrigger: Number(props.speedTrigger),
  shockRadius: Number(props.shockRadius),
  shockStrength: Number(props.shockStrength),
  maxSpeed: Number(props.maxSpeed),
  resistance: Number(props.resistance),
  returnDuration: Number(props.returnDuration),
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const LightningEffect = lazyEffect(() => import("./Lightning"), ({ props, context }) => ({
  hue: Number(props.hue),
  xOffset: Number(props.xOffset),
  speed: Number(props.speed),
  intensity: Number(props.intensity),
  size: Number(props.size),
  reducedMotion: context.reducedMotion,
}), StaticFallback);
const AcidSquaresEffect = lazyEffect(() => import("./AcidSquares"), ({ props, context }) => ({
  color1: String(props.color1),
  color2: String(props.color2),
  color3: String(props.color3),
  detail: String(props.detail) as "low"|"medium"|"high",
  speed: Number(props.speed),
  waveDepth: Number(props.waveDepth),
  zoom: Number(props.zoom),
  density: Number(props.density),
  glow: Number(props.glow),
  exposure: Number(props.exposure),
  spread: Number(props.spread),
  stepSize: Number(props.stepSize),
  colorShift: Number(props.colorShift),
  contrast: Number(props.contrast),
  brightness: Number(props.brightness),
  opacity: Number(props.opacity),
  mouseInteraction: !context.reducedMotion && props.mouseInteraction === true,
  mouseStrength: Number(props.mouseStrength),
  mouseRadius: Number(props.mouseRadius),
  blur: Number(props.blur),
  grain: props.grain === true,
  grainIntensity: Number(props.grainIntensity),
  lightMode: props.lightMode === true,
  reducedMotion: context.reducedMotion,
}), StaticFallback);

const BalatroEffect=lazyEffect(()=>import("./Balatro"),({props,context})=>({...props,spinSpeed:context.reducedMotion?0:Number(props.spinSpeed),mouseInteraction:!context.reducedMotion&&props.mouseInteraction===true}),StaticFallback);
const DarkVeilEffect=lazyEffect(()=>import("./DarkVeil"),({props,context})=>({...props,speed:context.reducedMotion?0:Number(props.speed)}),StaticFallback);
const FaultyTerminalEffect=lazyEffect(()=>import("./FaultyTerminal"),({props,context})=>({...props,pause:context.reducedMotion||props.pause===true,mouseReact:!context.reducedMotion&&props.mouseReact===true}),StaticFallback);
const IridescenceEffect=lazyEffect(()=>import("./Iridescence"),({props,context})=>({...props,color:hexTuple(String(props.color)),speed:context.reducedMotion?0:Number(props.speed),mouseReact:!context.reducedMotion&&props.mouseReact===true}),StaticFallback);
const LiquidChromeEffect=lazyEffect(()=>import("./LiquidChrome"),({props,context})=>({...props,baseColor:hexTuple(String(props.baseColor)),speed:context.reducedMotion?0:Number(props.speed),interactive:!context.reducedMotion&&props.interactive===true}),StaticFallback);
const OrbEffect=lazyEffect(()=>import("./Orb"),({props,context})=>({...props,rotateOnHover:!context.reducedMotion&&props.rotateOnHover===true}),StaticFallback);
const PlasmaEffect=lazyEffect(()=>import("./Plasma"),({props,context})=>({...props,speed:context.reducedMotion?0:Number(props.speed),mouseInteractive:!context.reducedMotion&&props.mouseInteractive===true}),StaticFallback);
const RippleGridEffect=lazyEffect(()=>import("./RippleGrid"),({props,context})=>({...props,mouseInteraction:!context.reducedMotion&&props.mouseInteraction===true}),StaticFallback);
const ColorBendsEffect=lazyEffect(()=>import("./ColorBends"),({props,context})=>({...props,colors:[String(props.color1),String(props.color2),String(props.color3)],speed:context.reducedMotion?0:Number(props.speed),mouseInfluence:context.reducedMotion?0:Number(props.mouseInfluence)}),StaticFallback);
const GradientBlindsEffect=lazyEffect(()=>import("./GradientBlinds"),({props,context})=>({...props,gradientColors:[String(props.color1),String(props.color2),String(props.color3)],paused:context.reducedMotion||props.paused===true,mouseDampening:context.reducedMotion?0:Number(props.mouseDampening)}),StaticFallback);
const GrainientEffect=lazyEffect(()=>import("./Grainient"),({props,context})=>({...props,timeSpeed:context.reducedMotion?0:Number(props.timeSpeed),warpSpeed:context.reducedMotion?0:Number(props.warpSpeed),grainAnimated:!context.reducedMotion&&props.grainAnimated===true}),StaticFallback);
const PrismEffect=lazyEffect(()=>import("./Prism"),({props,context})=>({...props,animationType:context.reducedMotion?"rotate":props.animationType,timeScale:context.reducedMotion?0:Number(props.timeScale),offset:{x:Number(props.offsetX),y:Number(props.offsetY)}}),StaticFallback);
const SoftAuroraEffect=lazyEffect(()=>import("./SoftAurora"),({props,context})=>({...props,speed:context.reducedMotion?0:Number(props.speed),colorSpeed:context.reducedMotion?0:Number(props.colorSpeed),enableMouseInteraction:!context.reducedMotion&&props.enableMouseInteraction===true}),StaticFallback);
const TopographyEffect=lazyEffect(()=>import("./Topography"),({props,context})=>({...props,speed:context.reducedMotion?0:Number(props.speed),morphSpeed:context.reducedMotion?0:Number(props.morphSpeed),grain:!context.reducedMotion&&props.grain===true,mouseInteraction:!context.reducedMotion&&props.mouseInteraction===true}),StaticFallback);

function motionBackgroundEffect(mode: "beams" | "grid-motion" | "grid-distortion" | "hyperspeed" | "letter-glitch" | "squares" | "waves" | "pixel-blast") {
  const loader = OFFICIAL_BACKGROUND_LOADERS[mode];
  if (!loader) throw new Error(`Missing official React Bits background loader: ${mode}`);
  return lazyEffect(loader, ({ props }) => ({ ...props }), StaticFallback);
}



const heavyBackgroundIds = ["reactbits.background.aurora", "reactbits.background.threads", "reactbits.background.light-rays", "reactbits.background.silk", "reactbits.background.dither", "reactbits.background.particles", "reactbits.background.galaxy", "reactbits.background.dot-grid", "reactbits.background.lightning", "reactbits.background.acid-squares", "reactbits.background.balatro", "reactbits.background.dark-veil", "reactbits.background.faulty-terminal", "reactbits.background.iridescence", "reactbits.background.liquid-chrome", "reactbits.background.orb", "reactbits.background.plasma", "reactbits.background.ripple-grid", "reactbits.background.color-bends", "reactbits.background.gradient-blinds", "reactbits.background.grainient", "reactbits.background.prism", "reactbits.background.soft-aurora", "reactbits.background.topography", "reactbits.background.beams", "reactbits.background.grid-motion", "reactbits.background.grid-distortion", "reactbits.background.hyperspeed", "reactbits.background.letter-glitch", "reactbits.background.squares", "reactbits.background.waves", "reactbits.background.pixel-blast"] as const;
const conflictsFor = (id: string) => heavyBackgroundIds.filter((candidate) => candidate !== id);

const motionBackgrounds = [
  ["beams", "Beams", "Layered luminous beams sweeping through space."],
  ["grid-motion", "Grid Motion", "A shifting tiled grid inspired by React Bits Grid Motion."],
  ["grid-distortion", "Grid Distortion", "An interactive warped grid inspired by React Bits Grid Distortion."],
  ["hyperspeed", "Hyperspeed", "Perspective light trails rushing toward the viewer."],
  ["letter-glitch", "Letter Glitch", "A flickering field of digital characters."],
  ["squares", "Squares", "An interactive animated square grid."],
  ["waves", "Waves", "Layered flowing lines that respond to the pointer."],
  ["pixel-blast", "Pixel Blast", "A radial field of animated pixel particles."],
] as const;

const motionBackgroundRegistrations: RegisteredEffect[] = motionBackgrounds.map(([slug, name, description]) => {
  const id = `reactbits.background.${slug}`;
  return {
    id, provider: "reactbits", name, description, category: "background", layer: "background", stacking: "single",
    compatibleNodes: nodes, conflictsWith: conflictsFor(id), schemaVersion: 1,
    inputs: [
      { kind: "color", key: "colorA", label: "Primary color", defaultValue: "#7c3aed", required: true },
      { kind: "color", key: "colorB", label: "Accent color", defaultValue: "#22d3ee", required: true },
      { kind: "color", key: "backgroundColor", label: "Background color", defaultValue: "#070711", required: true },
      { kind: "number", key: "speed", label: "Speed", defaultValue: 1, required: true, min: 0, max: 3, step: .05 },
      { kind: "number", key: "density", label: "Density", defaultValue: 16, required: true, min: 4, max: 48, step: 1 },
      { kind: "number", key: "scale", label: "Scale", defaultValue: 1, required: true, min: .25, max: 4, step: .05 },
      { kind: "number", key: "intensity", label: "Intensity", defaultValue: 1, required: true, min: 0, max: 3, step: .05 },
      { kind: "boolean", key: "interactive", label: "Pointer interaction", defaultValue: true, required: true },
    ],
    component: motionBackgroundEffect(slug), fallback: StaticFallback,
    runtime: { clientRequired: true, usesWebGL: false, performanceCost: "medium", supportsReducedMotion: true, pointerInteraction: "optional" },
  };
});

const additionalBackgrounds = [
  ["aero-shards", "Aero Shards"], ["ballpit", "Ballpit"], ["crt-warp", "CRT Warp"],
  ["dot-field", "Dot Field"], ["evil-eye", "Evil Eye"], ["ferrofluid", "Ferrofluid"],
  ["floating-lines", "Floating Lines"], ["ghost-fibers", "Ghost Fibers"], ["gradient-waves", "Gradient Waves"],
  ["grid-scan", "Grid Scan"], ["light-pillar", "Light Pillar"], ["light-tunnel", "Light Tunnel"],
  ["lightfall", "Lightfall"], ["line-waves", "Line Waves"],
  ["molten-metal", "Molten Metal"], ["pixel-snow", "Pixel Snow"], ["plasma-wave", "Plasma Wave"],
  ["prismatic-burst", "Prismatic Burst"], ["radar", "Radar"], ["scanner", "Scanner"],
  ["shape-grid", "Shape Grid"], ["side-rays", "Side Rays"], ["sliced-waves", "Sliced Waves"],
  ["web-threads", "Web Threads"],
] as const;

const webglAdditionalBackgrounds = new Set(["ballpit", "evil-eye", "ferrofluid", "floating-lines", "light-pillar", "light-tunnel", "molten-metal", "plasma-wave", "prismatic-burst"]);

function additionalBackgroundEffect(mode: string) {
  const loader = OFFICIAL_BACKGROUND_LOADERS[mode];
  if (!loader) throw new Error(`Missing official React Bits loader: ${mode}`);
  return lazyEffect(loader, ({ props }) => ({ ...props }), StaticFallback);
}

function officialBackgroundComponent(effect: RegisteredEffect): RegisteredEffect["component"] {
  const slug = effect.id.split(".").at(-1)!;
  const loader = OFFICIAL_BACKGROUND_LOADERS[slug];
  if (!loader) throw new Error(`Missing official React Bits background loader: ${slug}`);
  return lazyEffect(loader, ({ props, context }) => {
    const mapped: Record<string, unknown> = { ...props };
    if (slug === "aurora") mapped.colorStops = [String(props.colorA), String(props.colorB), "#5227ff"];
    if (slug === "dither") {
      mapped.waveColor = hexTuple(props.waveColor ? String(props.waveColor) : "#808080", [0.5, 0.5, 0.5]);
      mapped.backgroundColor = hexTuple(props.backgroundColor ? String(props.backgroundColor) : "#000000", [0, 0, 0]);
      mapped.disableAnimation = context.reducedMotion;
      mapped.enableMouseInteraction = !context.reducedMotion && props.enableMouseInteraction !== false;
    }
    if (slug === "particles") mapped.particleColors = [String(props.particleColor)];
    if (slug === "color-bends") mapped.colors = [String(props.color1), String(props.color2), String(props.color3)];
    if (slug === "gradient-blinds") mapped.gradientColors = [String(props.color1), String(props.color2), String(props.color3)];
    if (slug === "prism") mapped.offset = { x: Number(props.offsetX), y: Number(props.offsetY) };
    if (slug === "liquid-ether") mapped.colors = [String(props.color1), String(props.color2), String(props.color3)];
    if (context.reducedMotion) {
      for (const key of ["speed", "waveSpeed", "spinSpeed", "timeSpeed", "warpSpeed", "rotationSpeed", "autoSpeed"]) {
        if (key in mapped) mapped[key] = 0;
      }
      mapped.autoDemo = false;
      mapped.pause = true;
      mapped.paused = true;
      mapped.disableAnimation = true;
    }
    return mapped;
  }, StaticFallback);
}

const additionalBackgroundRegistrations: RegisteredEffect[] = additionalBackgrounds.map(([slug, name]) => {
  const id = `reactbits.background.${slug}`;
  const usesWebGL = webglAdditionalBackgrounds.has(slug);
  return {
    id, provider: "reactbits", name, description: `${name} animated background adapted for visual-builder containers.`,
    category: "background", layer: "background", stacking: "single", compatibleNodes: nodes,
    conflictsWith: conflictsFor(id), schemaVersion: 1,
    inputs: OFFICIAL_BACKGROUND_INPUTS[slug] ?? [],
    component: additionalBackgroundEffect(slug), fallback: StaticFallback,
    runtime: { clientRequired: true, usesWebGL, performanceCost: usesWebGL ? "high" : "medium", supportsReducedMotion: true, pointerInteraction: "none" },
  };
});

const LiquidEtherEffect = lazyEffect(() => import("./LiquidEtherOfficial"), ({ props, context }) => ({
  mouseForce: Number(props.mouseForce), cursorSize: Number(props.cursorSize), isViscous: props.isViscous === true,
  viscous: Number(props.viscous), iterationsViscous: Number(props.iterationsViscous), iterationsPoisson: Number(props.iterationsPoisson),
  dt: Number(props.dt), BFECC: props.BFECC === true, resolution: Number(props.resolution), isBounce: props.isBounce === true,
  colors: [String(props.color1), String(props.color2), String(props.color3)], autoDemo: !context.reducedMotion && props.autoDemo === true,
  autoSpeed: Number(props.autoSpeed), autoIntensity: Number(props.autoIntensity), takeoverDuration: Number(props.takeoverDuration),
  autoResumeDelay: Number(props.autoResumeDelay), autoRampDuration: Number(props.autoRampDuration),
  backgroundColor: String(props.backgroundColor), lightMode: props.lightMode === true,
}), StaticFallback);

const liquidEtherRegistration: RegisteredEffect = {
  id: "reactbits.background.liquid-ether", provider: "reactbits", name: "Liquid Ether",
  description: "Interactive fluid simulation from React Bits.", category: "background", layer: "background", stacking: "single",
  compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.liquid-ether"), schemaVersion: 1,
  inputs: [
    {kind:"color",key:"color1",label:"Color 1",defaultValue:"#5227ff",required:true},
    {kind:"color",key:"color2",label:"Color 2",defaultValue:"#ff9ffc",required:true},
    {kind:"color",key:"color3",label:"Color 3",defaultValue:"#b497cf",required:true},
    {kind:"number",key:"mouseForce",label:"Mouse force",defaultValue:20,required:true,min:0,max:100,step:1},
    {kind:"number",key:"cursorSize",label:"Cursor size",defaultValue:100,required:true,min:10,max:300,step:5},
    {kind:"number",key:"resolution",label:"Resolution",defaultValue:.5,required:true,min:.1,max:1,step:.05},
    {kind:"number",key:"autoSpeed",label:"Auto speed",defaultValue:.5,required:true,min:0,max:3,step:.05},
    {kind:"number",key:"autoIntensity",label:"Auto intensity",defaultValue:2.2,required:true,min:0,max:10,step:.1},
    {kind:"boolean",key:"isViscous",label:"Viscous fluid",defaultValue:false,required:true},
    {kind:"number",key:"viscous",label:"Viscosity",defaultValue:30,required:true,min:0,max:100,step:1},
    {kind:"number",key:"iterationsViscous",label:"Viscosity iterations",defaultValue:32,required:true,min:1,max:64,step:1},
    {kind:"number",key:"iterationsPoisson",label:"Pressure iterations",defaultValue:32,required:true,min:1,max:64,step:1},
    {kind:"number",key:"dt",label:"Time step",defaultValue:.014,required:true,min:.001,max:.1,step:.001},
    {kind:"boolean",key:"BFECC",label:"BFECC advection",defaultValue:true,required:true},
    {kind:"boolean",key:"isBounce",label:"Bounce boundaries",defaultValue:false,required:true},
    {kind:"boolean",key:"autoDemo",label:"Auto demo",defaultValue:true,required:true},
    {kind:"number",key:"takeoverDuration",label:"Pointer takeover",defaultValue:.25,required:true,min:0,max:2,step:.05},
    {kind:"number",key:"autoResumeDelay",label:"Auto resume delay",defaultValue:1000,required:true,min:0,max:10000,step:100},
    {kind:"number",key:"autoRampDuration",label:"Auto ramp duration",defaultValue:.6,required:true,min:0,max:5,step:.1},
    {kind:"color",key:"backgroundColor",label:"Background color",defaultValue:"#ffffff",required:true},
    {kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true},
  ],
  component: LiquidEtherEffect, fallback: StaticFallback,
  runtime: { clientRequired:true, usesWebGL:true, performanceCost:"high", supportsReducedMotion:true, pointerInteraction:"required" },
};

export const REACT_BITS_EFFECTS: RegisteredEffect[] = ([
  { id: "reactbits.background.aurora", provider: "reactbits", name: "Aurora", description: "Flowing aurora gradient adapted from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.aurora"), schemaVersion: 1, inputs: [
    { kind: "color", key: "colorA", label: "Primary color", defaultValue: "#5227ff", required: true, acceptsSemantic: true }, { kind: "color", key: "colorB", label: "Secondary color", defaultValue: "#7cff67", required: true, acceptsSemantic: true }, { kind: "number", key: "speed", label: "Speed", defaultValue: 1, required: true, min: 0, max: 3, step: 0.1 }, { kind: "number", key: "intensity", label: "Amplitude", defaultValue: 1, required: true, min: 0.1, max: 3, step: 0.1 }, { kind: "number", key: "blend", label: "Blend", defaultValue: 0.5, required: false, min: 0, max: 1, step: 0.05 },
  ], component: Aurora, fallback: StaticFallback, runtime: nonInteractiveRuntime },
  { id: "reactbits.background.threads", provider: "reactbits", name: "Threads", description: "Animated fabric-like lines adapted from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.threads"), schemaVersion: 1, inputs: [
    { kind: "color", key: "colorA", label: "Line color", defaultValue: "#ffffff", required: true, acceptsSemantic: true }, { kind: "number", key: "amplitude", label: "Amplitude", defaultValue: 1, required: true, min: 0, max: 3, step: 0.1 }, { kind: "number", key: "distance", label: "Distance", defaultValue: 0, required: false, min: 0, max: 1, step: 0.05 }, { kind: "boolean", key: "enableMouseInteraction", label: "Enable mouse interaction", defaultValue: true, required: false },
  ], component: Threads, fallback: StaticFallback, runtime },
  { id: "reactbits.background.light-rays", provider: "reactbits", name: "Light Rays", description: "Volumetric light beams adapted from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.light-rays"), schemaVersion: 1, inputs: [
    { kind: "color", key: "colorA", label: "Rays color", defaultValue: "#ffffff", required: true, acceptsSemantic: true }, { kind: "number", key: "speed", label: "Rays speed", defaultValue: 1, required: true, min: 0, max: 3, step: 0.1 }, { kind: "number", key: "intensity", label: "Light spread", defaultValue: 1, required: true, min: 0.1, max: 4, step: 0.1 }, { kind: "number", key: "rayLength", label: "Ray length", defaultValue: 2, required: false, min: 0.1, max: 5, step: 0.1 }, { kind: "number", key: "fadeDistance", label: "Fade distance", defaultValue: 1, required: false, min: 0.1, max: 3, step: 0.1 }, { kind: "boolean", key: "followMouse", label: "Follow mouse", defaultValue: true, required: false }, { kind: "number", key: "pointerStrength", label: "Mouse influence", defaultValue: 0.1, required: false, min: 0, max: 1, step: 0.05 },
  ], component: LightRays, fallback: StaticFallback, runtime },
  { id: "reactbits.background.silk", provider: "reactbits", name: "Silk", description: "Flowing fabric shader from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.silk"), schemaVersion: 1, inputs: [
    { kind: "number", key: "speed", label: "Speed", defaultValue: 5, required: true, min: 0, max: 10, step: 0.1 }, { kind: "number", key: "scale", label: "Scale", defaultValue: 1, required: true, min: 0.1, max: 5, step: 0.1 }, { kind: "color", key: "color", label: "Color", defaultValue: "#7b7481", required: true, acceptsSemantic: true }, { kind: "number", key: "noiseIntensity", label: "Noise intensity", defaultValue: 1.5, required: true, min: 0, max: 5, step: 0.1 }, { kind: "number", key: "rotation", label: "Rotation", defaultValue: 0, required: true, min: -6.28, max: 6.28, step: 0.01 },
  ], component: SilkEffect, fallback: StaticFallback, runtime: nonInteractiveRuntime },
  { id: "reactbits.background.dither", provider: "reactbits", name: "Dither", description: "Dithered interactive waves from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.dither"), schemaVersion: 1, inputs: [
    { kind: "number", key: "waveSpeed", label: "Wave speed", defaultValue: 0.05, required: true, min: 0, max: 1, step: 0.01 }, { kind: "number", key: "waveFrequency", label: "Wave frequency", defaultValue: 3, required: true, min: 0.1, max: 10, step: 0.1 }, { kind: "number", key: "waveAmplitude", label: "Wave amplitude", defaultValue: 0.3, required: true, min: 0, max: 1, step: 0.05 }, { kind: "color", key: "waveColor", label: "Wave color", defaultValue: "#808080", required: true, acceptsSemantic: true }, { kind: "color", key: "backgroundColor", label: "Background color", defaultValue: "#000000", required: true, acceptsSemantic: true }, { kind: "number", key: "colorNum", label: "Color levels", defaultValue: 4, required: true, min: 2, max: 16, step: 1 }, { kind: "number", key: "pixelSize", label: "Pixel size", defaultValue: 2, required: true, min: 1, max: 10, step: 1 }, { kind: "boolean", key: "enableMouseInteraction", label: "Enable mouse interaction", defaultValue: true, required: true }, { kind: "number", key: "mouseRadius", label: "Mouse radius", defaultValue: 1, required: true, min: 0.1, max: 3, step: 0.1 },
  ], component: DitherEffect, fallback: StaticFallback, runtime },
  { id: "reactbits.background.particles", provider: "reactbits", name: "Particles", description: "Mouse-reactive particle field from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.particles"), schemaVersion: 1, inputs: [
    { kind: "number", key: "particleCount", label: "Particle count", defaultValue: 200, required: true, min: 10, max: 1000, step: 10 }, { kind: "number", key: "particleSpread", label: "Particle spread", defaultValue: 10, required: true, min: 1, max: 30, step: 1 }, { kind: "number", key: "speed", label: "Speed", defaultValue: 0.1, required: true, min: 0, max: 2, step: 0.05 }, { kind: "color", key: "particleColor", label: "Particle color", defaultValue: "#ffffff", required: true, acceptsSemantic: true }, { kind: "boolean", key: "moveParticlesOnHover", label: "Move on hover", defaultValue: true, required: true }, { kind: "number", key: "particleHoverFactor", label: "Hover factor", defaultValue: 1, required: true, min: 0, max: 5, step: 0.1 }, { kind: "boolean", key: "alphaParticles", label: "Soft particles", defaultValue: false, required: true }, { kind: "number", key: "particleBaseSize", label: "Base size", defaultValue: 100, required: true, min: 1, max: 300, step: 1 }, { kind: "number", key: "sizeRandomness", label: "Size randomness", defaultValue: 1, required: true, min: 0, max: 3, step: 0.1 }, { kind: "number", key: "cameraDistance", label: "Camera distance", defaultValue: 20, required: true, min: 5, max: 50, step: 1 }, { kind: "boolean", key: "disableRotation", label: "Disable rotation", defaultValue: false, required: true },
  ], component: ParticlesEffect, fallback: StaticFallback, runtime },
  { id: "reactbits.background.galaxy", provider: "reactbits", name: "Galaxy", description: "Interactive layered star field from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.galaxy"), schemaVersion: 1, inputs: [
    {kind:"number",key:"starSpeed",label:"Star speed",defaultValue:.5,required:true,min:0,max:3,step:.1},{kind:"number",key:"density",label:"Density",defaultValue:1,required:true,min:.1,max:3,step:.1},{kind:"number",key:"hueShift",label:"Hue shift",defaultValue:140,required:true,min:0,max:360,step:1},{kind:"number",key:"speed",label:"Speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"boolean",key:"mouseInteraction",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"glowIntensity",label:"Glow",defaultValue:.3,required:true,min:0,max:2,step:.05},{kind:"number",key:"saturation",label:"Saturation",defaultValue:0,required:true,min:0,max:2,step:.05},{kind:"boolean",key:"mouseRepulsion",label:"Mouse repulsion",defaultValue:true,required:true},{kind:"number",key:"repulsionStrength",label:"Repulsion strength",defaultValue:2,required:true,min:0,max:10,step:.1},{kind:"number",key:"twinkleIntensity",label:"Twinkle",defaultValue:.3,required:true,min:0,max:2,step:.05},{kind:"number",key:"rotationSpeed",label:"Rotation speed",defaultValue:.1,required:true,min:-2,max:2,step:.05},{kind:"number",key:"autoCenterRepulsion",label:"Center repulsion",defaultValue:0,required:true,min:0,max:10,step:.1},{kind:"boolean",key:"transparent",label:"Transparent",defaultValue:false,required:true},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}
  ], component: GalaxyEffect, fallback: StaticFallback, runtime: {...runtime,performanceCost:"high"} },
  { id: "reactbits.background.dot-grid", provider: "reactbits", name: "Dot Grid", description: "Interactive inertial dot grid from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.dot-grid"), schemaVersion: 1, inputs: [
    {kind:"number",key:"dotSize",label:"Dot size",defaultValue:6,required:true,min:1,max:24,step:1},{kind:"number",key:"gap",label:"Gap",defaultValue:20,required:true,min:2,max:64,step:1},{kind:"color",key:"baseColor",label:"Base color",defaultValue:"#271e37",required:true,acceptsSemantic:true},{kind:"color",key:"activeColor",label:"Active color",defaultValue:"#5227ff",required:true,acceptsSemantic:true},{kind:"number",key:"proximity",label:"Proximity",defaultValue:120,required:true,min:20,max:400,step:5},{kind:"number",key:"speedTrigger",label:"Speed trigger",defaultValue:100,required:true,min:0,max:1000,step:10},{kind:"number",key:"shockRadius",label:"Shock radius",defaultValue:250,required:true,min:20,max:600,step:10},{kind:"number",key:"shockStrength",label:"Shock strength",defaultValue:5,required:true,min:0,max:20,step:.5},{kind:"number",key:"maxSpeed",label:"Maximum speed",defaultValue:5000,required:true,min:100,max:10000,step:100},{kind:"number",key:"resistance",label:"Resistance",defaultValue:750,required:true,min:50,max:2000,step:50},{kind:"number",key:"returnDuration",label:"Return duration",defaultValue:1.5,required:true,min:.1,max:5,step:.1}
  ], component: DotGridEffect, fallback: StaticFallback, runtime: {kind:"canvas2d",clientRequired:true,usesWebGL:false,performanceCost:"medium",supportsReducedMotion:true,pointerInteraction:"required"} },
  { id: "reactbits.background.lightning", provider: "reactbits", name: "Lightning", description: "Procedural electric bolt from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.lightning"), schemaVersion: 1, inputs: [
    {kind:"number",key:"hue",label:"Hue",defaultValue:230,required:true,min:0,max:360,step:1},{kind:"number",key:"xOffset",label:"Horizontal offset",defaultValue:0,required:true,min:-2,max:2,step:.05},{kind:"number",key:"speed",label:"Speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"intensity",label:"Intensity",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"size",label:"Size",defaultValue:1,required:true,min:.1,max:5,step:.1}
  ], component: LightningEffect, fallback: StaticFallback, runtime: nonInteractiveRuntime },
  { id: "reactbits.background.acid-squares", provider: "reactbits", name: "Acid Squares", description: "Glowing stepped raymarch pattern from React Bits.", category: "background", layer: "background", stacking: "single", compatibleNodes: nodes, conflictsWith: conflictsFor("reactbits.background.acid-squares"), schemaVersion: 1, inputs: [
    {kind:"color",key:"color1",label:"First color",defaultValue:"#5227ff",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#a855f7",required:true},{kind:"color",key:"color3",label:"Third color",defaultValue:"#ffffff",required:true},{kind:"select",key:"detail",label:"Detail",defaultValue:"medium",required:true,options:[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"}]},{kind:"number",key:"speed",label:"Speed",defaultValue:.7,required:true,min:0,max:3,step:.1},{kind:"number",key:"waveDepth",label:"Wave depth",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"zoom",label:"Zoom",defaultValue:1.3,required:true,min:.1,max:5,step:.1},{kind:"number",key:"density",label:"Density",defaultValue:10,required:true,min:1,max:30,step:1},{kind:"number",key:"glow",label:"Glow",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"exposure",label:"Exposure",defaultValue:2700,required:true,min:100,max:6000,step:100},{kind:"number",key:"spread",label:"Spread",defaultValue:.3,required:true,min:.05,max:.6,step:.01},{kind:"number",key:"stepSize",label:"Step size",defaultValue:.002,required:true,min:.0005,max:.02,step:.0005},{kind:"number",key:"colorShift",label:"Color shift",defaultValue:0,required:true,min:-5,max:5,step:.1},{kind:"number",key:"contrast",label:"Contrast",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"brightness",label:"Brightness",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"opacity",label:"Opacity",defaultValue:1,required:true,min:0,max:1,step:.05},{kind:"boolean",key:"mouseInteraction",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"mouseStrength",label:"Mouse strength",defaultValue:.1,required:true,min:0,max:2,step:.05},{kind:"number",key:"mouseRadius",label:"Mouse radius",defaultValue:.35,required:true,min:.01,max:2,step:.05},{kind:"number",key:"blur",label:"Blur",defaultValue:0,required:true,min:0,max:2,step:.1},{kind:"boolean",key:"grain",label:"Grain",defaultValue:true,required:true},{kind:"number",key:"grainIntensity",label:"Grain intensity",defaultValue:.05,required:true,min:0,max:.5,step:.01},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}
  ], component: AcidSquaresEffect, fallback: StaticFallback, runtime: {...runtime,performanceCost:"high"} },
  {id:"reactbits.background.balatro",provider:"reactbits",name:"Balatro",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.balatro"),schemaVersion:1,inputs:[{kind:"number",key:"spinRotation",label:"Spin rotation",defaultValue:-2,required:true,min:-10,max:10,step:.1},{kind:"number",key:"spinSpeed",label:"Spin speed",defaultValue:7,required:true,min:0,max:20,step:.1},{kind:"color",key:"color1",label:"First color",defaultValue:"#de443b",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#006bb4",required:true},{kind:"color",key:"color3",label:"Third color",defaultValue:"#162325",required:true},{kind:"number",key:"contrast",label:"Contrast",defaultValue:3.5,required:true,min:.1,max:10,step:.1},{kind:"number",key:"lighting",label:"Lighting",defaultValue:.4,required:true,min:0,max:2,step:.05},{kind:"number",key:"spinAmount",label:"Spin amount",defaultValue:.25,required:true,min:0,max:1,step:.05},{kind:"number",key:"pixelFilter",label:"Pixel filter",defaultValue:745,required:true,min:50,max:1500,step:5},{kind:"number",key:"spinEase",label:"Spin ease",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"boolean",key:"isRotate",label:"Rotate",defaultValue:false,required:true},{kind:"boolean",key:"mouseInteraction",label:"Mouse interaction",defaultValue:true,required:true}],component:BalatroEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.dark-veil",provider:"reactbits",name:"Dark Veil",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.dark-veil"),schemaVersion:1,inputs:[{kind:"number",key:"hueShift",label:"Hue shift",defaultValue:0,required:true,min:0,max:360,step:1},{kind:"number",key:"noiseIntensity",label:"Noise",defaultValue:0,required:true,min:0,max:2,step:.05},{kind:"number",key:"scanlineIntensity",label:"Scanlines",defaultValue:0,required:true,min:0,max:2,step:.05},{kind:"number",key:"speed",label:"Speed",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"number",key:"scanlineFrequency",label:"Scanline frequency",defaultValue:0,required:true,min:0,max:100,step:1},{kind:"number",key:"warpAmount",label:"Warp",defaultValue:0,required:true,min:0,max:5,step:.05},{kind:"number",key:"resolutionScale",label:"Resolution scale",defaultValue:1,required:true,min:.25,max:2,step:.05},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:DarkVeilEffect,fallback:StaticFallback,runtime:{...nonInteractiveRuntime,performanceCost:"high"}},
  {id:"reactbits.background.faulty-terminal",provider:"reactbits",name:"Faulty Terminal",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.faulty-terminal"),schemaVersion:1,inputs:[{kind:"number",key:"scale",label:"Scale",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"digitSize",label:"Digit size",defaultValue:1.5,required:true,min:.1,max:5,step:.1},{kind:"number",key:"timeScale",label:"Time scale",defaultValue:.3,required:true,min:0,max:3,step:.05},{kind:"boolean",key:"pause",label:"Pause",defaultValue:false,required:true},{kind:"number",key:"scanlineIntensity",label:"Scanlines",defaultValue:.3,required:true,min:0,max:2,step:.05},{kind:"number",key:"glitchAmount",label:"Glitch",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"flickerAmount",label:"Flicker",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"noiseAmp",label:"Noise",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"chromaticAberration",label:"Chromatic aberration",defaultValue:0,required:true,min:0,max:5,step:.1},{kind:"number",key:"curvature",label:"Curvature",defaultValue:.2,required:true,min:0,max:1,step:.05},{kind:"color",key:"tint",label:"Tint",defaultValue:"#ffffff",required:true},{kind:"boolean",key:"mouseReact",label:"Mouse reaction",defaultValue:true,required:true},{kind:"number",key:"mouseStrength",label:"Mouse strength",defaultValue:.2,required:true,min:0,max:2,step:.05},{kind:"number",key:"brightness",label:"Brightness",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:FaultyTerminalEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.iridescence",provider:"reactbits",name:"Iridescence",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.iridescence"),schemaVersion:1,inputs:[{kind:"color",key:"color",label:"Color",defaultValue:"#ffffff",required:true},{kind:"number",key:"speed",label:"Speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"amplitude",label:"Amplitude",defaultValue:.1,required:true,min:0,max:2,step:.05},{kind:"boolean",key:"mouseReact",label:"Mouse reaction",defaultValue:true,required:true}],component:IridescenceEffect,fallback:StaticFallback,runtime},
  {id:"reactbits.background.liquid-chrome",provider:"reactbits",name:"Liquid Chrome",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.liquid-chrome"),schemaVersion:1,inputs:[{kind:"color",key:"baseColor",label:"Base color",defaultValue:"#1a1a1a",required:true},{kind:"number",key:"speed",label:"Speed",defaultValue:.2,required:true,min:0,max:3,step:.05},{kind:"number",key:"amplitude",label:"Amplitude",defaultValue:.5,required:true,min:0,max:2,step:.05},{kind:"number",key:"frequencyX",label:"Horizontal frequency",defaultValue:3,required:true,min:.1,max:10,step:.1},{kind:"number",key:"frequencyY",label:"Vertical frequency",defaultValue:2,required:true,min:.1,max:10,step:.1},{kind:"boolean",key:"interactive",label:"Interactive",defaultValue:true,required:true}],component:LiquidChromeEffect,fallback:StaticFallback,runtime},
  {id:"reactbits.background.orb",provider:"reactbits",name:"Orb",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.orb"),schemaVersion:1,inputs:[{kind:"number",key:"hue",label:"Hue",defaultValue:0,required:true,min:0,max:360,step:1},{kind:"number",key:"hoverIntensity",label:"Hover intensity",defaultValue:.2,required:true,min:0,max:2,step:.05},{kind:"boolean",key:"rotateOnHover",label:"Rotate on hover",defaultValue:true,required:true},{kind:"boolean",key:"forceHoverState",label:"Force hover",defaultValue:false,required:true},{kind:"color",key:"backgroundColor",label:"Background color",defaultValue:"#000000",required:true}],component:OrbEffect,fallback:StaticFallback,runtime},
  {id:"reactbits.background.plasma",provider:"reactbits",name:"Plasma",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.plasma"),schemaVersion:1,inputs:[{kind:"color",key:"color",label:"Color",defaultValue:"#ffffff",required:true},{kind:"number",key:"speed",label:"Speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"select",key:"direction",label:"Direction",defaultValue:"forward",required:true,options:[{value:"forward",label:"Forward"},{value:"reverse",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}]},{kind:"number",key:"scale",label:"Scale",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"opacity",label:"Opacity",defaultValue:1,required:true,min:0,max:1,step:.05},{kind:"boolean",key:"mouseInteractive",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"renderScale",label:"Render scale",defaultValue:.55,required:true,min:.25,max:1,step:.05},{kind:"number",key:"targetFps",label:"Target FPS",defaultValue:60,required:true,min:15,max:60,step:5},{kind:"number",key:"iterations",label:"Iterations",defaultValue:60,required:true,min:20,max:100,step:5},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:PlasmaEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.ripple-grid",provider:"reactbits",name:"Ripple Grid",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.ripple-grid"),schemaVersion:1,inputs:[{kind:"boolean",key:"enableRainbow",label:"Rainbow",defaultValue:false,required:true},{kind:"color",key:"gridColor",label:"Grid color",defaultValue:"#ffffff",required:true},{kind:"number",key:"rippleIntensity",label:"Ripple intensity",defaultValue:.05,required:true,min:0,max:1,step:.01},{kind:"number",key:"gridSize",label:"Grid size",defaultValue:10,required:true,min:1,max:30,step:1},{kind:"number",key:"gridThickness",label:"Grid thickness",defaultValue:15,required:true,min:1,max:30,step:1},{kind:"number",key:"fadeDistance",label:"Fade distance",defaultValue:1.5,required:true,min:.1,max:5,step:.1},{kind:"number",key:"vignetteStrength",label:"Vignette",defaultValue:2,required:true,min:0,max:5,step:.1},{kind:"number",key:"glowIntensity",label:"Glow",defaultValue:.1,required:true,min:0,max:2,step:.05},{kind:"number",key:"opacity",label:"Opacity",defaultValue:1,required:true,min:0,max:1,step:.05},{kind:"number",key:"gridRotation",label:"Rotation",defaultValue:0,required:true,min:-180,max:180,step:1},{kind:"boolean",key:"mouseInteraction",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"mouseInteractionRadius",label:"Mouse radius",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:RippleGridEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.color-bends",provider:"reactbits",name:"Color Bends",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.color-bends"),schemaVersion:1,inputs:[{kind:"number",key:"rotation",label:"Rotation",defaultValue:45,required:true,min:-180,max:180,step:1},{kind:"number",key:"speed",label:"Speed",defaultValue:.2,required:true,min:0,max:3,step:.05},{kind:"color",key:"color1",label:"First color",defaultValue:"#ff5c7a",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#8a5cff",required:true},{kind:"color",key:"color3",label:"Third color",defaultValue:"#00ffd1",required:true},{kind:"boolean",key:"transparent",label:"Transparent",defaultValue:false,required:true},{kind:"number",key:"autoRotate",label:"Auto rotation",defaultValue:0,required:true,min:-2,max:2,step:.05},{kind:"number",key:"scale",label:"Scale",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"frequency",label:"Frequency",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"warpStrength",label:"Warp",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"mouseInfluence",label:"Mouse influence",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"parallax",label:"Parallax",defaultValue:.5,required:true,min:0,max:3,step:.1},{kind:"number",key:"noise",label:"Noise",defaultValue:.1,required:true,min:0,max:2,step:.05},{kind:"number",key:"iterations",label:"Iterations",defaultValue:5,required:true,min:1,max:5,step:1},{kind:"number",key:"intensity",label:"Intensity",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"bandWidth",label:"Band width",defaultValue:1,required:true,min:.1,max:3,step:.1}],component:ColorBendsEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.gradient-blinds",provider:"reactbits",name:"Gradient Blinds",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.gradient-blinds"),schemaVersion:1,inputs:[{kind:"boolean",key:"paused",label:"Paused",defaultValue:false,required:true},{kind:"color",key:"color1",label:"First color",defaultValue:"#ff9ffc",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#5227ff",required:true},{kind:"color",key:"color3",label:"Third color",defaultValue:"#00d4ff",required:true},{kind:"number",key:"angle",label:"Angle",defaultValue:0,required:true,min:-180,max:180,step:1},{kind:"number",key:"noise",label:"Noise",defaultValue:.3,required:true,min:0,max:2,step:.05},{kind:"number",key:"blindCount",label:"Blind count",defaultValue:16,required:true,min:2,max:50,step:1},{kind:"number",key:"blindMinWidth",label:"Minimum width",defaultValue:60,required:true,min:10,max:200,step:5},{kind:"number",key:"mouseDampening",label:"Mouse dampening",defaultValue:.15,required:true,min:0,max:1,step:.05},{kind:"boolean",key:"mirrorGradient",label:"Mirror gradient",defaultValue:false,required:true},{kind:"number",key:"spotlightRadius",label:"Spotlight radius",defaultValue:.5,required:true,min:.1,max:2,step:.05},{kind:"number",key:"spotlightSoftness",label:"Spotlight softness",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"spotlightOpacity",label:"Spotlight opacity",defaultValue:1,required:true,min:0,max:1,step:.05},{kind:"number",key:"distortAmount",label:"Distortion",defaultValue:0,required:true,min:0,max:3,step:.1},{kind:"select",key:"shineDirection",label:"Shine direction",defaultValue:"left",required:true,options:[{value:"left",label:"Left"},{value:"right",label:"Right"}]},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:GradientBlindsEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.grainient",provider:"reactbits",name:"Grainient",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.grainient"),schemaVersion:1,inputs:[{kind:"number",key:"timeSpeed",label:"Time speed",defaultValue:.25,required:true,min:0,max:3,step:.05},{kind:"number",key:"colorBalance",label:"Color balance",defaultValue:0,required:true,min:-1,max:1,step:.05},{kind:"number",key:"warpStrength",label:"Warp",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"warpFrequency",label:"Warp frequency",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"warpSpeed",label:"Warp speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"grainAmount",label:"Grain",defaultValue:.1,required:true,min:0,max:1,step:.01},{kind:"boolean",key:"grainAnimated",label:"Animated grain",defaultValue:true,required:true},{kind:"number",key:"contrast",label:"Contrast",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"saturation",label:"Saturation",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"zoom",label:"Zoom",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"color",key:"color1",label:"First color",defaultValue:"#ff9ffc",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#5227ff",required:true},{kind:"color",key:"color3",label:"Third color",defaultValue:"#00d4ff",required:true},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:GrainientEffect,fallback:StaticFallback,runtime:{...nonInteractiveRuntime,performanceCost:"high"}},
  {id:"reactbits.background.prism",provider:"reactbits",name:"Prism",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.prism"),schemaVersion:1,inputs:[{kind:"number",key:"height",label:"Height",defaultValue:3.5,required:true,min:.1,max:10,step:.1},{kind:"number",key:"baseWidth",label:"Base width",defaultValue:5.5,required:true,min:.1,max:15,step:.1},{kind:"select",key:"animationType",label:"Animation",defaultValue:"rotate",required:true,options:[{value:"rotate",label:"Rotate"},{value:"hover",label:"Hover"},{value:"3drotate",label:"3D rotate"}]},{kind:"number",key:"glow",label:"Glow",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"offsetX",label:"Horizontal offset",defaultValue:0,required:true,min:-5,max:5,step:.1},{kind:"number",key:"offsetY",label:"Vertical offset",defaultValue:0,required:true,min:-5,max:5,step:.1},{kind:"number",key:"noise",label:"Noise",defaultValue:.5,required:true,min:0,max:2,step:.05},{kind:"boolean",key:"transparent",label:"Transparent",defaultValue:true,required:true},{kind:"number",key:"scale",label:"Scale",defaultValue:3.6,required:true,min:.1,max:10,step:.1},{kind:"number",key:"hueShift",label:"Hue shift",defaultValue:0,required:true,min:0,max:360,step:1},{kind:"number",key:"colorFrequency",label:"Color frequency",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"hoverStrength",label:"Hover strength",defaultValue:2,required:true,min:0,max:10,step:.1},{kind:"number",key:"inertia",label:"Inertia",defaultValue:.05,required:true,min:0,max:1,step:.01},{kind:"number",key:"bloom",label:"Bloom",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"timeScale",label:"Time scale",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:PrismEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.soft-aurora",provider:"reactbits",name:"Soft Aurora",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.soft-aurora"),schemaVersion:1,inputs:[{kind:"number",key:"speed",label:"Speed",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"number",key:"scale",label:"Scale",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"brightness",label:"Brightness",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"color",key:"color1",label:"First color",defaultValue:"#5227ff",required:true},{kind:"color",key:"color2",label:"Second color",defaultValue:"#7cff67",required:true},{kind:"number",key:"noiseFrequency",label:"Noise frequency",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"noiseAmplitude",label:"Noise amplitude",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"bandHeight",label:"Band height",defaultValue:.5,required:true,min:0,max:2,step:.05},{kind:"number",key:"bandSpread",label:"Band spread",defaultValue:1,required:true,min:.1,max:3,step:.1},{kind:"number",key:"colorSpeed",label:"Color speed",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"boolean",key:"enableMouseInteraction",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"mouseInfluence",label:"Mouse influence",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:SoftAuroraEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  {id:"reactbits.background.topography",provider:"reactbits",name:"Topography",category:"background",layer:"background",stacking:"single",compatibleNodes:nodes,conflictsWith:conflictsFor("reactbits.background.topography"),schemaVersion:1,inputs:[{kind:"color",key:"lowColor",label:"Low color",defaultValue:"#5227ff",required:true},{kind:"color",key:"midColor",label:"Mid color",defaultValue:"#a855f7",required:true},{kind:"color",key:"highColor",label:"High color",defaultValue:"#ffffff",required:true},{kind:"number",key:"speed",label:"Speed",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"number",key:"morphAmount",label:"Morph",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"number",key:"morphSpeed",label:"Morph speed",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"number",key:"bands",label:"Bands",defaultValue:12,required:true,min:2,max:40,step:1},{kind:"number",key:"thickness",label:"Thickness",defaultValue:.08,required:true,min:.01,max:.5,step:.01},{kind:"number",key:"scale",label:"Scale",defaultValue:1,required:true,min:.1,max:5,step:.1},{kind:"number",key:"glow",label:"Glow",defaultValue:1,required:true,min:0,max:5,step:.1},{kind:"select",key:"colorMode",label:"Color mode",defaultValue:"elevation",required:true,options:[{value:"elevation",label:"Elevation"},{value:"uniform",label:"Uniform"},{value:"alternating",label:"Alternating"}]},{kind:"number",key:"contrast",label:"Contrast",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"number",key:"brightness",label:"Brightness",defaultValue:1,required:true,min:0,max:3,step:.1},{kind:"boolean",key:"fillBands",label:"Fill bands",defaultValue:false,required:true},{kind:"number",key:"opacity",label:"Opacity",defaultValue:1,required:true,min:0,max:1,step:.05},{kind:"boolean",key:"grain",label:"Grain",defaultValue:true,required:true},{kind:"number",key:"grainIntensity",label:"Grain intensity",defaultValue:.05,required:true,min:0,max:.5,step:.01},{kind:"boolean",key:"mouseInteraction",label:"Mouse interaction",defaultValue:true,required:true},{kind:"number",key:"mouseRadius",label:"Mouse radius",defaultValue:.5,required:true,min:.05,max:3,step:.05},{kind:"number",key:"mouseStrength",label:"Mouse strength",defaultValue:.5,required:true,min:0,max:3,step:.05},{kind:"boolean",key:"lightMode",label:"Light mode",defaultValue:false,required:true}],component:TopographyEffect,fallback:StaticFallback,runtime:{...runtime,performanceCost:"high"}},
  ...motionBackgroundRegistrations,
  ...additionalBackgroundRegistrations,
  liquidEtherRegistration,
  ...REACT_BITS_CONTENT_EFFECTS,
] as RegisteredEffect[]).map(withReactBitsMetadata);
