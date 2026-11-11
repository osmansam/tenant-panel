export * from "./fingerprints";
export * from "./batch1";
export * from "./batch2";
export * from "./batch3";
export * from "./batch4";
export * from "./batch5";
export * from "./batch6";
export * from "./batch7";

import { CURATED_FEATURE_BATCH_1 } from "./batch1";
import { CURATED_FEATURE_BATCH_2 } from "./batch2";
import { CURATED_FEATURE_BATCH_3 } from "./batch3";
import { CURATED_FEATURE_BATCH_4 } from "./batch4";
import { CURATED_FEATURE_BATCH_5 } from "./batch5";
import { CURATED_FEATURE_BATCH_6 } from "./batch6";
import { CURATED_FEATURE_BATCH_7 } from "./batch7";

export const CURATED_FEATURES_ALL = [
  ...CURATED_FEATURE_BATCH_1,
  ...CURATED_FEATURE_BATCH_2,
  ...CURATED_FEATURE_BATCH_3,
  ...CURATED_FEATURE_BATCH_4,
  ...CURATED_FEATURE_BATCH_5,
  ...CURATED_FEATURE_BATCH_6,
  ...CURATED_FEATURE_BATCH_7,
] as const;

