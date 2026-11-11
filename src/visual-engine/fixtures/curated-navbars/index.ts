export * from "./fingerprints";
export * from "./batch1";
export * from "./batch2";
export * from "./batch3";
export * from "./batch4";
export * from "./batch5";
export * from "./batch6";

import { CURATED_NAVBAR_BATCH_1 } from "./batch1";
import { CURATED_NAVBAR_BATCH_2 } from "./batch2";
import { CURATED_NAVBAR_BATCH_3 } from "./batch3";
import { CURATED_NAVBAR_BATCH_4 } from "./batch4";
import { CURATED_NAVBAR_BATCH_5 } from "./batch5";
import { CURATED_NAVBAR_BATCH_6 } from "./batch6";
import type { ComponentDocument } from "../../model";

export const CURATED_NAVBAR_ALL: ComponentDocument[] = [
  ...CURATED_NAVBAR_BATCH_1,
  ...CURATED_NAVBAR_BATCH_2,
  ...CURATED_NAVBAR_BATCH_3,
  ...CURATED_NAVBAR_BATCH_4,
  ...CURATED_NAVBAR_BATCH_5,
  ...CURATED_NAVBAR_BATCH_6,
];
