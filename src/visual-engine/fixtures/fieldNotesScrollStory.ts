import type { ComponentDocument, ComponentNode, ScrollSceneNode } from "../model";

interface SceneSpec {
  id: string;
  chapter: string;
  category: string;
  heading: string;
  body: string;
  image: string;
  alt: string;
  action?: { label: string; href: string };
}

const PANEL = "#F3EDE1";
const INK = "#1E2923";
const BODY = "#4C584F";
const ACCENT = "#9A4B34";
const PAPER = "#F8F4EA";

function createScene(spec: SceneSpec): ScrollSceneNode {
  const copy: ComponentNode[] = [
    {
      id: `${spec.id}-eyebrow`,
      type: "text",
      text: `FIELD NOTES / ${spec.chapter}`,
      style: {
        typography: { size: "sm", weight: "bold", tracking: "wide" },
        textPaint: { kind: "custom", value: ACCENT },
      },
    },
    {
      id: `${spec.id}-heading`,
      type: "heading",
      level: 2,
      text: spec.heading,
      style: {
        typography: { family: "serif", size: "4xl", weight: "normal", leading: "tight", tracking: "tight", align: "left" },
        textPaint: { kind: "custom", value: INK },
      },
    },
    {
      id: `${spec.id}-body`,
      type: "text",
      text: spec.body,
      style: {
        typography: { size: "lg", leading: "relaxed", align: "left" },
        textPaint: { kind: "custom", value: BODY },
        sizing: { maxWidth: "2xl" },
      },
    },
  ];

  if (spec.action) {
    copy.push({
      id: `${spec.id}-action`,
      type: "button",
      label: spec.action.label,
      href: spec.action.href,
      style: {
        spacing: { marginTop: "sm" },
        background: [{ kind: "solid", color: { kind: "custom", value: INK } }],
        border: { radius: "full" },
        typography: { size: "base", weight: "semibold" },
        textPaint: { kind: "custom", value: PAPER },
      },
    });
  }

  return {
    id: spec.id,
    type: "scroll-scene",
    length: 0.5,
    media: {
      kind: "image",
      src: spec.image,
      alt: spec.alt,
      objectFit: "cover",
    },
    children: [{
      id: `${spec.id}-layout`,
      type: "grid",
      columns: 12,
      style: {
        sizing: { width: "full", maxWidth: "7xl", align: "center" },
        spacing: { gap: "xl" },
      },
      children: [
        {
          id: `${spec.id}-copy`,
          type: "stack",
          direction: "column",
          alignment: "start",
          distribution: "center",
          wrap: false,
          gap: "md",
          layout: { span: { mobile: 12, tablet: 12, desktop: 7 } },
          style: {
            spacing: { padding: "xl" },
            background: [{ kind: "solid", color: { kind: "custom", value: PANEL } }],
            border: { radius: "xl", shadow: "xl" },
            color: { text: "text" },
            sizing: { width: "full" },
          },
          children: copy,
        },
        {
          id: `${spec.id}-index`,
          type: "stack",
          direction: "column",
          alignment: "end",
          distribution: "end",
          wrap: false,
          gap: "xs",
          layout: { span: { mobile: 12, tablet: 12, desktop: 5 } },
          style: { spacing: { padding: "md" } },
          children: [
            {
              id: `${spec.id}-number`,
              type: "text",
              text: spec.chapter,
              style: {
                typography: { family: "serif", size: "6xl", weight: "normal", align: "right", leading: "tight" },
                textPaint: { kind: "custom", value: PAPER },
              },
            },
            {
              id: `${spec.id}-label`,
              type: "text",
              text: spec.category,
              style: {
                typography: { size: "sm", weight: "bold", tracking: "wide", align: "right" },
                textPaint: { kind: "custom", value: PAPER },
              },
            },
          ],
        },
      ],
    }],
  };
}

export const FIELD_NOTES_SCROLL_STORY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "field-notes-scroll-story",
  name: "Field Notes · Long-form scroll story",
  kind: "section",
  root: {
    id: "field-notes-section",
    type: "section",
    style: {
      spacing: { padding: "none" },
      background: [{ kind: "solid", color: { kind: "custom", value: "#111713" } }],
      color: { text: "text" },
    },
    children: [{
      id: "field-notes-story",
      type: "scroll-story",
      transition: "fade",
      mobileMode: "stack",
      sceneLayout: "background",
      showProgress: true,
      accessibleLabel: "Field Notes: a long-form story about architecture, light, and time",
      style: { color: { text: "text" } },
      children: [
        { id: "field-notes-stage", type: "slot", name: "stage", children: [] },
        createScene({
          id: "field-notes-threshold",
          chapter: "01",
          category: "Threshold",
          heading: "We shape the room before it shapes us.",
          body: "Every project begins at a threshold: the moment someone describes not a building, but a way of living they have not found words for yet.",
          image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
          alt: "Pale concrete architecture opening onto a bright courtyard",
        }),
        createScene({
          id: "field-notes-inquiry",
          chapter: "02",
          category: "Inquiry",
          heading: "A building begins as a question.",
          body: "Before the first line is drawn, we listen for the real brief. Not the list of rooms, but the rhythm of the day those rooms need to hold.",
          image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=80",
          alt: "Angular concrete facade with deep geometric shadows",
        }),
        createScene({
          id: "field-notes-light",
          chapter: "03",
          category: "Light",
          heading: "Light is the first material.",
          body: "We study how the sun crosses a site, where shadow gathers, and how a room changes between morning and late afternoon. Everything else follows.",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80",
          alt: "Architectural study with drawings, models, and natural light",
        }),
        createScene({
          id: "field-notes-stillness",
          chapter: "04",
          category: "Stillness",
          heading: "Silence has a geometry.",
          body: "Space is measured in pauses as much as metres. A stair, a landing, a window seat can give a busy plan somewhere to breathe.",
          image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=2000&q=80",
          alt: "Quiet modern interior with strong horizontal lines",
        }),
        createScene({
          id: "field-notes-memory",
          chapter: "05",
          category: "Memory",
          heading: "The city remembers what we remove.",
          body: "We look for what a place already knows: an old wall, a mature tree, the line of a former street. New work begins by deciding what deserves to stay.",
          image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=2000&q=80",
          alt: "Historic city architecture layered with contemporary additions",
        }),
        createScene({
          id: "field-notes-patina",
          chapter: "06",
          category: "Patina",
          heading: "Materials age into meaning.",
          body: "Timber softens. Brass darkens. Stone gathers the marks of use. We choose surfaces for the life they will have, not only the day they are installed.",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
          alt: "Facade detail showing weathered stone and metal",
        }),
        createScene({
          id: "field-notes-adaptation",
          chapter: "07",
          category: "Adaptation",
          heading: "The plan is a promise, not a prediction.",
          body: "A good building makes room for changes it cannot foresee. Structure, services, and joinery are detailed to be repaired, adapted, and lived with.",
          image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2000&q=80",
          alt: "Adapted residential interior with generous windows and timber",
        }),
        createScene({
          id: "field-notes-endurance",
          chapter: "08",
          category: "Endurance",
          heading: "Leave space for the unfinished.",
          body: "The last chapter belongs to the people who arrive after us. We design the frame, set the proportions, and leave enough quiet for life to complete the work.",
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
          alt: "Warm minimal living space with deep openings to the landscape",
          action: { label: "Read the field notes", href: "/journal" },
        }),
      ],
    }],
  },
};
