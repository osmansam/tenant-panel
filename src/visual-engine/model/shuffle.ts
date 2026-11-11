import type { AnimationEasing } from "./animation";

export interface ShuffleAnimationSpec {
  enabled: boolean;
  intervalMs: number;
  durationMs: number;
  easing: AnimationEasing;
  seed?: number;
}

export type SlotAssignment = Record<string, string>;

export function initialSlotAssignment(imageIds: string[], slotIds: string[]): SlotAssignment {
  return Object.fromEntries(slotIds.slice(0, imageIds.length).map((slotId, index) => [slotId, imageIds[index]]));
}

export function nextSlotAssignment(
  imageIds: string[],
  slotIds: string[],
  previous: SlotAssignment,
  random: () => number = Math.random,
): SlotAssignment {
  if (imageIds.length < 2) return initialSlotAssignment(imageIds, slotIds);
  const firstOffset = 1 + Math.floor(random() * (imageIds.length - 1));
  for (let attempt = 0; attempt < imageIds.length - 1; attempt += 1) {
    const offset = 1 + ((firstOffset - 1 + attempt) % (imageIds.length - 1));
    const rotated = imageIds.map((_, index) => imageIds[(index + offset) % imageIds.length]);
    const candidate = initialSlotAssignment(rotated, slotIds);
    const assignedSlots = slotIds.filter((slotId) => previous[slotId] !== undefined || candidate[slotId] !== undefined);
    if (assignedSlots.every((slotId) => candidate[slotId] !== previous[slotId])) return candidate;
  }
  const previousImages = new Set(Object.values(previous));
  const replacement = imageIds.find((id) => !previousImages.has(id));
  if (replacement !== undefined && slotIds[0] !== undefined) return { ...previous, [slotIds[0]]: replacement };
  return previous;
}

export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
