"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Breakpoint, GridNode, ImageNode } from "../model";
import { resolveSlotLayout, type MediaLayoutSpec } from "../model/mediaLayout";
import { createSeededRandom, initialSlotAssignment, nextSlotAssignment } from "../model/shuffle";

export function SlotMediaGrid({
  node,
  breakpoint,
  renderImage,
}: {
  node: GridNode & { mediaLayout: NonNullable<GridNode["mediaLayout"]> };
  breakpoint?: Breakpoint;
  renderImage(image: ImageNode): ReactNode;
}) {
  const viewport = useSyncExternalStore(subscribeViewport, viewportBreakpoint, () => "mobile" as Breakpoint);
  const activeBreakpoint = breakpoint ?? viewport;
  const layout = useMemo(() => resolveSlotLayout(node.mediaLayout, activeBreakpoint), [node.mediaLayout, activeBreakpoint]);
  const images = node.children.filter((child): child is ImageNode => child.type === "image");
  const imageIds = images.map((image) => image.id);
  const slotIds = layout.slots.map((slot) => slot.id);
  const shuffle = node.animation?.shuffle;
  const reducedMotion = useReducedMotion();
  const random = useRef(shuffle?.seed === undefined ? Math.random : createSeededRandom(shuffle.seed));
  const [assignment, setAssignment] = useState(() => initialSlotAssignment(imageIds, slotIds));

  useEffect(() => {
    setAssignment(initialSlotAssignment(imageIds, slotIds));
  }, [imageIds.join("|"), slotIds.join("|")]);

  useEffect(() => {
    if (!shuffle?.enabled || imageIds.length < 2) return;
    random.current = shuffle.seed === undefined ? Math.random : createSeededRandom(shuffle.seed);
    const timer = window.setInterval(() => {
      setAssignment((current) => nextSlotAssignment(imageIds, slotIds, current, random.current));
    }, shuffle.intervalMs);
    return () => window.clearInterval(timer);
  }, [shuffle?.enabled, shuffle?.intervalMs, shuffle?.seed, imageIds.join("|"), slotIds.join("|")]);

  const byId = new Map(images.map((image) => [image.id, image]));
  return (
    <div
      data-slot-media-grid
      className="grid h-full w-full overflow-hidden"
      style={{
        aspectRatio: aspectRatio(node.mediaLayout.aspectRatio),
        gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
        gap: "var(--ve-media-gap, 4px)",
      }}
    >
      {layout.slots.map((slot) => {
        const imageId = assignment[slot.id];
        const image = imageId === undefined ? undefined : byId.get(imageId);
        if (image === undefined) return null;
        return (
          <motion.div
            layout={!reducedMotion}
            key={image.id}
            data-slot-id={slot.id}
            data-image-id={image.id}
            className="min-h-0 min-w-0 overflow-hidden [&>div]:h-full [&_img]:h-full [&_img]:w-full"
            style={{ gridColumn: `${slot.columnStart} / span ${slot.columnSpan}`, gridRow: `${slot.rowStart} / span ${slot.rowSpan}` }}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : (shuffle?.durationMs ?? 400) / 1000, ease: easing(shuffle?.easing) }}
          >
            {renderImage(image)}
          </motion.div>
        );
      })}
    </div>
  );
}

function viewportBreakpoint(): Breakpoint {
  if (typeof window.matchMedia !== "function") return "mobile";
  return window.matchMedia("(min-width: 1024px)").matches ? "desktop"
    : window.matchMedia("(min-width: 768px)").matches ? "tablet" : "mobile";
}

function subscribeViewport(notify: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const queries = [768, 1024].map((width) => window.matchMedia(`(min-width: ${width}px)`));
  queries.forEach((query) => query.addEventListener("change", notify));
  return () => queries.forEach((query) => query.removeEventListener("change", notify));
}

function aspectRatio(value: MediaLayoutSpec["aspectRatio"]): string | undefined {
  return value === "square" ? "1 / 1" : value === "landscape" ? "4 / 3" : value === "wide" ? "16 / 9" : value === "portrait" ? "3 / 4" : undefined;
}

function easing(value: string | undefined): [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" {
  if (value === "linear") return "linear";
  if (value === "ease-in") return "easeIn";
  if (value === "ease-out") return "easeOut";
  if (value === "ease-in-out") return "easeInOut";
  return [0.25, 0.1, 0.25, 1];
}
