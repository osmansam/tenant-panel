import type { ComponentDocument, ImageNode } from "../model";

const photos = [
  "photo-1526481280695-3c687fd643ed",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1511818966892-d7d671e672a2",
  "photo-1500534314209-a25ddb2bd429",
  "photo-1501785888041-af3ef285b470",
  "photo-1470770841072-f978cf4d019e",
  "photo-1441974231531-c6227db76b6e",
  "photo-1469474968028-56623f02e42e",
];

const imageNodes: ImageNode[] = photos.map((photo, index) => ({
  id: `gallery-photo-${index + 1}`,
  type: "image",
  src: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=80`,
  alt: `Landscape photograph ${index + 1}`,
  style: {
    sizing: { width: "full", height: "full", fit: "cover", objectPosition: index % 3 === 0 ? "top" : "center" },
    border: { radius: "lg" },
    media: { opacity: 1, filters: { saturation: 105, contrast: 102 } },
  },
}));

export const ADVANCED_GALLERY_DOCUMENT: ComponentDocument = {
  version: 1,
  id: "advanced-gallery",
  name: "Animated photography wall",
  root: {
    id: "gallery-section",
    type: "section",
    style: {
      spacing: { padding: "2xl" },
      background: [
        { kind: "radial-gradient", shape: "ellipse", opacity: 0.55, stops: [
          { color: { kind: "custom", value: "rgba(52,120,255,0.35)" }, position: 0 },
          { color: { kind: "custom", value: "rgba(7,9,13,0)" }, position: 70 },
        ] },
        { kind: "solid", color: { kind: "custom", value: "#07090d" } },
      ],
    },
    children: [{
      id: "gallery-shell", type: "grid", columns: 12,
      style: { spacing: { gap: "2xl" } },
      children: [{
        id: "gallery-copy", type: "stack", direction: "column", alignment: "stretch", distribution: "center", wrap: false, gap: "lg",
        layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
        children: [
          { id: "gallery-kicker", type: "text", text: "A living collection", style: { color: { text: "inverse-muted" }, typography: { size: "sm", tracking: "wide" } } },
          { id: "gallery-title", type: "heading", level: 1, text: "Photos in motion", style: { typography: { size: "6xl", weight: "bold", leading: "tight" }, textPaint: { kind: "linear-gradient", angle: 100, stops: [{ color: { kind: "custom", value: "#3478ff" }, position: 0 }, { color: { kind: "custom", value: "#a343f5" }, position: 100 }] } } },
          { id: "gallery-description", type: "text", text: "A bounded, responsive media wall. Images rotate through fixed slots while the layout stays perfectly stable.", style: { color: { text: "inverse-muted" }, typography: { size: "lg", leading: "relaxed" } } },
        ],
      }, {
        id: "animated-media-wall", type: "grid", columns: 12,
        layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
        style: { spacing: { gap: "sm" }, border: { radius: "xl" } },
        mediaLayout: {
          mode: "slots", preset: "mosaic", aspectRatio: "landscape", overflow: "hidden",
          breakpoints: {
            mobile: { columns: 2, rows: 2, slots: [
              { id: "slot-1", columnStart: 1, rowStart: 1, columnSpan: 1, rowSpan: 1 },
              { id: "slot-2", columnStart: 2, rowStart: 1, columnSpan: 1, rowSpan: 1 },
              { id: "slot-3", columnStart: 1, rowStart: 2, columnSpan: 2, rowSpan: 1 },
            ] },
            tablet: { columns: 4, rows: 3, slots: [
              { id: "slot-1", columnStart: 1, rowStart: 1, columnSpan: 2, rowSpan: 2 },
              { id: "slot-2", columnStart: 3, rowStart: 1, columnSpan: 1, rowSpan: 1 },
              { id: "slot-3", columnStart: 4, rowStart: 1, columnSpan: 1, rowSpan: 2 },
              { id: "slot-4", columnStart: 3, rowStart: 2, columnSpan: 1, rowSpan: 1 },
              { id: "slot-5", columnStart: 1, rowStart: 3, columnSpan: 1, rowSpan: 1 },
              { id: "slot-6", columnStart: 2, rowStart: 3, columnSpan: 3, rowSpan: 1 },
            ] },
          },
        },
        animation: { preset: "none", trigger: "load", duration: 0, delay: 0, easing: "ease-in-out", once: true, shuffle: { enabled: true, intervalMs: 2500, durationMs: 650, easing: "ease-in-out", seed: 42 } },
        children: imageNodes,
      }],
    }],
  },
};
