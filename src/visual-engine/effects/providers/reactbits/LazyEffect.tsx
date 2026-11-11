"use client";

import { lazy, Suspense, type ComponentType } from "react";
import type { EffectComponent, EffectComponentProps } from "../../core";
import { EffectRuntime } from "./EffectRuntime";

export function lazyEffect(
  loader: () => Promise<{ default: ComponentType<any> }>,
  mapProps: (input: EffectComponentProps) => Record<string, unknown>,
  Fallback: EffectComponent,
): EffectComponent {
  const Component = lazy(loader);
  return function LazyReactBitsEffect(input) {
    const fallback = <Fallback {...input} />;
    return (
      <EffectRuntime cost="high" reducedMotion={input.context.reducedMotion} fallback={fallback}>
        <Suspense fallback={fallback}><Component {...mapProps(input)} /></Suspense>
      </EffectRuntime>
    );
  };
}
