export interface HeroFingerprint {
  id: string;
  name: string;
  layoutFamily: string;
  alignment: string;
  gridPattern: string;
  mediaPlacement: string;
  contentHierarchy: string;
  dominantElement: string;
  ctaPattern: string;
  interactionModel: string;
  density: string;
}

export type StructuralDimension = keyof Omit<HeroFingerprint, "id" | "name">;

export const STRUCTURAL_DIMENSIONS: StructuralDimension[] = [
  "layoutFamily",
  "alignment",
  "gridPattern",
  "mediaPlacement",
  "contentHierarchy",
  "dominantElement",
  "ctaPattern",
  "interactionModel",
  "density",
];

export interface OverlapComparison {
  heroA: string;
  heroB: string;
  overlappingDimensions: StructuralDimension[];
  overlapCount: number;
  exceedsThreshold: boolean;
}

export function compareFingerprints(
  a: HeroFingerprint,
  b: HeroFingerprint,
): OverlapComparison {
  const overlappingDimensions = STRUCTURAL_DIMENSIONS.filter(
    (dim) => a[dim] === b[dim],
  );
  return {
    heroA: a.id,
    heroB: b.id,
    overlappingDimensions,
    overlapCount: overlappingDimensions.length,
    exceedsThreshold: overlappingDimensions.length >= 4,
  };
}

export function checkAllFingerprintCollisions(
  fingerprints: HeroFingerprint[],
): OverlapComparison[] {
  const collisions: OverlapComparison[] = [];
  for (let i = 0; i < fingerprints.length; i++) {
    for (let j = i + 1; j < fingerprints.length; j++) {
      const comparison = compareFingerprints(fingerprints[i], fingerprints[j]);
      if (comparison.exceedsThreshold) {
        collisions.push(comparison);
      }
    }
  }
  return collisions;
}
