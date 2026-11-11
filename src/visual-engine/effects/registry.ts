import { createEffectRegistry, type RegisteredEffect } from "./core";
import { animatedGradientEffect, auroraMeshEffect, floatingBubblesEffect, gridOrbitGlowEffect, gridSpotlightEffect, hudScanEffect, lightHazeEffect, magneticLiteEffect, neuralMeshEffect, orbitRingsEffect, scrollLanesEffect, textShimmerEffect, travelingDotsEffect, vectorHorizonEffect } from "./providers/ozmishow";
import { REACT_BITS_EFFECTS } from "./providers/reactbits";
// Registrations validate their persisted JSON shape before entering the heterogeneous registry.
export const ozmishowEffectRegistry = createEffectRegistry([
  animatedGradientEffect as unknown as RegisteredEffect,
  auroraMeshEffect as unknown as RegisteredEffect,
  floatingBubblesEffect as unknown as RegisteredEffect,
  gridSpotlightEffect as unknown as RegisteredEffect,
  hudScanEffect as unknown as RegisteredEffect,
  lightHazeEffect as unknown as RegisteredEffect,
  neuralMeshEffect as unknown as RegisteredEffect,
  orbitRingsEffect as unknown as RegisteredEffect,
  scrollLanesEffect as unknown as RegisteredEffect,
  travelingDotsEffect as unknown as RegisteredEffect,
  vectorHorizonEffect as unknown as RegisteredEffect,
  gridOrbitGlowEffect as unknown as RegisteredEffect,
  magneticLiteEffect as unknown as RegisteredEffect,
  textShimmerEffect as unknown as RegisteredEffect,
  ...REACT_BITS_EFFECTS,
]);
