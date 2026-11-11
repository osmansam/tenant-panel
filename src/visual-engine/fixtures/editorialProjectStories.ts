import type { ComponentDocument, ComponentNode, ExpandableCardNode, InfiniteSliderNode } from "../model";
import { EDITORIAL_PORTFOLIO_DOCUMENT } from "./editorialPortfolio";
import { applyEditorialPreset } from "../operations/designPreset";

const projects = [
  { name: "Forma", headline: "A little more room to focus.", intro: "A calmer workspace for people doing thoughtful work. Forma brings the essentials together and lets everything else fade into the background.", challenge: "Busy teams were spending more time managing their tools than making progress. Every surface competed for attention.", approach: "We built a clearer hierarchy, softened the palette, and gave everyday actions a familiar rhythm. The result feels useful from the first visit.", discipline: "Product strategy · Interface design", year: "2026" },
  { name: "Fieldwork", headline: "Good things take their time.", intro: "An independent journal about the world outside. Fieldwork creates room for stories, observations, and a slower kind of discovery.", challenge: "The journal needed a digital home that felt as considered as its printed pages, with space for both long stories and small discoveries.", approach: "A warm paper palette, expressive serif typography, and generous margins put the writing first. Photography and illustration carry the pace between stories.", discipline: "Art direction · Editorial design", year: "2026" },
  { name: "Studio", headline: "Good ideas deserve a little space.", intro: "A welcoming home for an independent creative practice. Simple forms and a quiet visual language give every project room to speak.", challenge: "The studio wanted to show the breadth of its work without turning the portfolio into a crowded catalogue.", approach: "We made the projects the starting point. Flexible cards reveal full stories, while a consistent typographic system keeps the experience grounded.", discipline: "Brand direction · Web design", year: "2026" },
];

function story(face: ComponentNode, index: number): ExpandableCardNode {
  const project = projects[index];
  const id = `${face.id}-story`;
  const cover = "children" in face ? face.children.find(child => child.type === "image") : undefined;
  return { id: face.id, type: "expandable-card", accessibleLabel: project.name, closeLabel: "Close project", children: [
    { id: `${id}-face`, type: "slot", name: "preview", children: [{ ...face, id: `${face.id}-layout` }] },
    { id: `${id}-details`, type: "slot", name: "details", children: [
      { id: `${id}-body`, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "xl", children: [
        { id: `${id}-meta`, type: "text", text: `${project.discipline} / ${project.year}`, style: { color: { text: "text-muted" } } },
        { id: `${id}-title`, type: "heading", level: 1, text: project.headline },
        { id: `${id}-intro`, type: "text", text: project.intro, style: { sizing: { maxWidth: "3xl" } } },
        ...(cover?.type === "image" ? [{ ...cover, id: `${id}-cover`, style: { ...cover.style, sizing: { width: "full" as const } } }] : []),
        { id: `${id}-process`, type: "grid", columns: 12, style: { spacing: { gap: "xl", marginTop: "lg" } }, children: [
          { id: `${id}-challenge`, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md", layout: { span: { mobile: 12, tablet: 6, desktop: 6 } }, children: [
            { id: `${id}-challenge-heading`, type: "heading", level: 2, text: "The challenge" },
            { id: `${id}-challenge-copy`, type: "text", text: project.challenge },
          ] },
          { id: `${id}-approach`, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md", layout: { span: { mobile: 12, tablet: 6, desktop: 6 } }, children: [
            { id: `${id}-approach-heading`, type: "heading", level: 2, text: "The approach" },
            { id: `${id}-approach-copy`, type: "text", text: project.approach },
          ] },
        ] },
        { id: `${id}-contact`, type: "button", label: "Have a project in mind?", href: "mailto:hello@example.com", style: { color: { background: "primary", text: "primary-foreground" }, border: { radius: "full" }, spacing: { paddingX: "lg", paddingY: "md" }, sizing: { align: "start" } } },
      ] },
    ] },
  ] };
}

function createStories(): ComponentDocument {
  const doc = structuredClone(EDITORIAL_PORTFOLIO_DOCUMENT);
  doc.id = "editorial-project-stories";
  doc.name = "Editorial project stories";
  const slider = doc.root.children.find(child => child.type === "infinite-slider") as InfiniteSliderNode;
  slider.children = slider.children.map(story);
  return applyEditorialPreset(doc);
}
export const EDITORIAL_PROJECT_STORIES_DOCUMENT = createStories();
