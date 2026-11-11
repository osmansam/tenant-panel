import type { AnimationSpec, ComponentDocument, ComponentNode, SlotNode } from "../model";
import { isActiveAnimation } from "../model/animation";
import { describeLayer } from "./layerLabels";

export interface MotionTrack {
  id: string;
  label: string;
  node: ComponentNode;
  animation: AnimationSpec;
  start: number;
  end: number;
  staggerTail: number;
}

export interface MotionCandidate {
  id: string;
  label: string;
  node: ComponentNode;
  blockedBy?: string;
}

function motionLabel(node: ComponentNode): string {
  const label = describeLayer(node).replace(/\s+/g, " ").trim();
  return label.length > 80 ? `${label.slice(0, 79)}…` : label;
}

interface MotionWrappers {
  renderSelf: boolean;
  staggerChildren: boolean;
  blockedBy?: string;
}

/** Matches renderer paths that call renderStructuralChildren on this node. */
function hasStaggerChildren(node: ComponentNode): boolean {
  switch (node.type) {
    case "section": case "stack": case "flex": case "slot": case "card":
    case "form": case "scroll-scene": case "menu-panel":
      return true;
    case "grid":
      return node.mediaLayout === undefined;
    default:
      return false;
  }
}

/** Follow semantic renderer calls rather than assuming every container wraps its children. */
function visitMotionNodes(document: ComponentDocument, visit: (node: ComponentNode, wrappers: MotionWrappers) => void): void {
  function walkSlot(children: ComponentNode[], name: SlotNode["name"], renderSelf: boolean): void {
    const child = children.find((candidate): candidate is SlotNode => candidate.type === "slot" && candidate.name === name);
    if (child) walk(child, undefined, renderSelf);
  }

  function walk(node: ComponentNode, blockedBy?: string, renderSelf = true): void {
    const staggerChildren = hasStaggerChildren(node);
    visit(node, { renderSelf, staggerChildren, blockedBy });
    if (!("children" in node)) return;
    switch (node.type) {
      case "disclosure": {
        const trigger = node.children.find((child): child is SlotNode => child.type === "slot" && child.name === "trigger");
        // renderTriggerChildren emits these leaves directly, without AnimatedNode.
        for (const child of trigger?.children ?? []) {
          if (child.type !== "heading" && child.type !== "text" && child.type !== "image" && child.type !== "divider") walk(child);
        }
        walkSlot(node.children, "content", false);
        return;
      }
      case "accordion": case "tabs": case "sidebar":
        // Runtime items go directly to renderDisclosure/renderTabs, bypassing renderNode.
        for (const child of node.children) if (child.type === "disclosure") walk(child, undefined, false);
        return;
      case "repeater":
        walkSlot(node.children, "item", false);
        return;
      case "scroll-story":
        walkSlot(node.children, "stage", false);
        for (const child of node.children) if (child.type === "scroll-scene") walk(child);
        return;
      case "overlay":
        walkSlot(node.children, "background", true);
        walkSlot(node.children, "content", true);
        return;
      case "expandable-card":
        walkSlot(node.children, "preview", true);
        walkSlot(node.children, "details", true);
        return;
      case "grid":
        if (node.mediaLayout !== undefined) {
          for (const child of node.children) if (child.type === "image") walk(child);
          return;
        }
    }
    const childSource = staggerChildren && isActiveAnimation(node.animation) && node.animation.stagger !== undefined ? node.id : undefined;
    for (const child of node.children) walk(child, childSource);
  }
  walk(document.root);
}

export function collectMotionTracks(document: ComponentDocument): MotionTrack[] {
  const tracks: MotionTrack[] = [];
  visitMotionNodes(document, (node, { renderSelf, staggerChildren, blockedBy }) => {
    const animation = node.animation;
    if (!isActiveAnimation(animation)) return;
    const staggerGroup = staggerChildren && "children" in node && animation.stagger !== undefined;
    // The renderer's inherited wrapper overrides a child's own entrance, while
    // that child's stagger still independently controls its descendants.
    if (!staggerGroup && (!renderSelf || blockedBy !== undefined || animation.stagger !== undefined)) return;
    const staggerTail = staggerGroup ? Math.max(0, node.children.length - 1) * animation.stagger! : 0;
    tracks.push({
      id: node.id,
      label: motionLabel(node),
      node,
      animation,
      start: animation.delay,
      end: animation.delay + animation.duration + staggerTail,
      staggerTail,
    });
  });
  return tracks;
}

export function motionCandidates(document: ComponentDocument): MotionCandidate[] {
  const candidates: MotionCandidate[] = [];
  visitMotionNodes(document, (node, { renderSelf, blockedBy }) => {
    if (!renderSelf || isActiveAnimation(node.animation) || node.type === "slot" || node.type === "scroll-story" || node.type === "scroll-scene") return;
    candidates.push({ id: node.id, label: motionLabel(node), node, ...(blockedBy === undefined ? {} : { blockedBy }) });
  });
  return candidates;
}

export function motionDuration(tracks: MotionTrack[]): number {
  return tracks.reduce((duration, track) => Math.max(duration, track.end), 1000);
}
