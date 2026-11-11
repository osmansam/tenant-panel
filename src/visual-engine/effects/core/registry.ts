import { assertValidInputSchema } from "./inputSchema";
import type { EffectRegistry, RegisteredEffect } from "./types";

export function createEffectRegistry(registrations: readonly RegisteredEffect[]): EffectRegistry {
  const ids = new Set<string>();
  registrations.forEach((effect) => {
    if (ids.has(effect.id)) throw new Error(`Duplicate effect ID: ${effect.id}`);
    ids.add(effect.id);
    assertValidInputSchema(effect);
  });
  const list = Object.freeze(registrations.map(cloneAndFreezeRegistration));
  const byId = new Map(list.map((effect) => [effect.id, effect]));
  return Object.freeze({
    get: (id: string) => byId.get(id),
    list: () => list,
  });
}

function cloneAndFreezeRegistration(effect: RegisteredEffect): RegisteredEffect {
  const inputs = effect.inputs.map((input) => Object.freeze(input.kind === "select" ? { ...input, options: Object.freeze(input.options.map((option) => Object.freeze({ ...option }))) } : { ...input }));
  const copy: RegisteredEffect = {
    ...effect,
    compatibleNodes: Object.freeze([...effect.compatibleNodes]),
    ...(effect.conflictsWith ? { conflictsWith: Object.freeze([...effect.conflictsWith]) } : {}),
    ...(effect.requires ? { requires: Object.freeze([...effect.requires]) } : {}),
    inputs: Object.freeze(inputs),
    runtime: Object.freeze({ ...effect.runtime }),
    ...(effect.migrations ? { migrations: Object.freeze({ ...effect.migrations }) } : {}),
  };
  return Object.freeze(copy);
}
