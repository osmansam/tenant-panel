import type { AnimationSpec, ComponentDocument } from "../model";
import { mapNode } from "../operations/queryNode";
import { BEFORE_AFTER_STUDIO_DOCUMENT } from "./comparisonShowcase";

const base = structuredClone(BEFORE_AFTER_STUDIO_DOCUMENT);
const reveal = (delay: number, duration: number, preset: AnimationSpec["preset"] = "fade-up"): AnimationSpec => ({ preset, trigger: "load", delay, duration, easing: "ease-out", once: true });
const sequence: Record<string, AnimationSpec> = {
  "studio-eyebrow": reveal(0, 400, "fade"),
  "studio-title": reveal(150, 600),
  "studio-description": reveal(350, 600),
  "studio-comparison": reveal(600, 800, "scale-in"),
  "studio-caption": reveal(900, 400, "fade"),
  "studio-story": { ...reveal(1100, 500), stagger: 175 },
  "studio-footer": reveal(1700, 500),
};
let root = base.root;
for (const [id, animation] of Object.entries(sequence)) root = mapNode(root, id, node => ({ ...node, animation })) as ComponentDocument["root"];

export const MOTION_SEQUENCE_STUDIO_DOCUMENT: ComponentDocument = { ...base, id: "motion-sequence-studio", name: "Motion sequence studio", root };
