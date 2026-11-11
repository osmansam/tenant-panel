import type { ComponentDocument, ComponentNode, ScrollSceneNode } from "../model";

interface InsightSceneSpec {
  id: string;
  step: string;
  body: string;
  tags: string[];
  image: string;
  alt: string;
}

const INK = "#172027";
const BODY = "#526068";
const ACCENT = "#2F6F5E";

function createInsightScene(spec: InsightSceneSpec): ScrollSceneNode {
  const content: ComponentNode[] = [
    {
      id: `${spec.id}-eyebrow`,
      type: "text",
      text: `RESEARCH WORKFLOW / ${spec.step}`,
      style: {
        typography: { size: "sm", weight: "bold", tracking: "wide" },
        textPaint: { kind: "custom", value: ACCENT },
      },
    },
    {
      id: `${spec.id}-heading`,
      type: "heading",
      level: 2,
      text: "Turn raw research into a clear decision.",
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
    {
      id: `${spec.id}-tags`,
      type: "tags",
      items: spec.tags,
      style: { spacing: { marginTop: "sm" } },
    },
  ];

  return {
    id: spec.id,
    type: "scroll-scene",
    length: 0.7,
    media: { kind: "image", src: spec.image, alt: spec.alt, objectFit: "cover" },
    children: [{
      id: `${spec.id}-copy`,
      type: "stack",
      direction: "column",
      alignment: "start",
      distribution: "center",
      wrap: false,
      gap: "md",
      style: {
        spacing: { padding: "xl" },
        color: { text: "text" },
        sizing: { width: "full", maxWidth: "3xl" },
      },
      children: content,
    }],
  };
}

export const INSIGHT_SPLIT_SCROLL_STORY_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "insight-split-scroll-story",
  name: "Insight story · split scroll",
  kind: "section",
  root: {
    id: "insight-story-section",
    type: "section",
    style: {
      spacing: { padding: "none" },
      background: [{ kind: "solid", color: { kind: "custom", value: "#F8F7F2" } }],
      color: { text: "text" },
    },
    children: [{
      id: "insight-story",
      type: "scroll-story",
      transition: "none",
      mobileMode: "stack",
      sceneLayout: "split-right",
      showProgress: false,
      accessibleLabel: "Research workflow: from raw material to a clear decision",
      style: { color: { text: "text" } },
      children: [
        { id: "insight-story-stage", type: "slot", name: "stage", children: [] },
        createInsightScene({
          id: "insight-gather",
          step: "01 / GATHER",
          body: "Collect interviews, surveys, and field notes in one workspace. Keep every quote and observation connected to the source it came from.",
          tags: ["Interview analysis", "Survey data", "Field notes"],
          image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=2000&q=80",
          alt: "Open research notebook, pen, and printed notes on a desk",
        }),
        createInsightScene({
          id: "insight-code",
          step: "02 / CODE",
          body: "Tag the evidence with a shared codebook. Compare interpretations and see exactly which passages support each emerging theme.",
          tags: ["Open coding", "Team review", "Evidence trail"],
          image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2000&q=80",
          alt: "Workshop wall covered with sticky notes and grouped ideas",
        }),
        createInsightScene({
          id: "insight-decide",
          step: "03 / DECIDE",
          body: "Step back from the codes to find the larger pattern. Test it against the data, then move into a decision your whole team can defend.",
          tags: ["Themes", "Synthesis", "Decision"],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
          alt: "Analytics dashboard showing charts and research summaries",
        }),
      ],
    }],
  },
};
