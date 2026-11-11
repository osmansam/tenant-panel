import type { ComponentDocument } from "../../model";
import { CURATED_HERO_BATCH_1, BATCH_1_FINGERPRINTS } from "./batch1";
import { CURATED_HERO_BATCH_2, BATCH_2_FINGERPRINTS } from "./batch2";
import { CURATED_HERO_BATCH_3, BATCH_3_FINGERPRINTS } from "./batch3";
import { CURATED_HERO_BATCH_4, BATCH_4_FINGERPRINTS } from "./batch4";
import type { HeroFingerprint } from "./fingerprints";

export * from "./fingerprints";
export * from "./batch1";
export * from "./batch2";
export * from "./batch3";
export * from "./batch4";

export const ALL_CURATED_HEROES: ComponentDocument[] = [
  ...CURATED_HERO_BATCH_1,
  ...CURATED_HERO_BATCH_2,
  ...CURATED_HERO_BATCH_3,
  ...CURATED_HERO_BATCH_4,
];

export const ALL_HERO_FINGERPRINTS: Record<string, HeroFingerprint> = {
  ...BATCH_1_FINGERPRINTS,
  ...BATCH_2_FINGERPRINTS,
  ...BATCH_3_FINGERPRINTS,
  ...BATCH_4_FINGERPRINTS,
};

export function findCuratedHero(id: string): ComponentDocument | undefined {
  return ALL_CURATED_HEROES.find((hero) => hero.id === id);
}

export function getCuratedHeroFingerprint(id: string): HeroFingerprint | undefined {
  return ALL_HERO_FINGERPRINTS[id];
}
