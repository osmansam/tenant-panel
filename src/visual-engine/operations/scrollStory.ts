import type { ComponentDocument } from "../model/document";
import type { ScrollSceneNode, ScrollStoryNode } from "../model/nodes";
import { SCROLL_STORY_LIMITS } from "../model/nodes";
import { addNode } from "./addNode";
import { regenerateNodeIds, type IdFactory } from "./duplicateNode";
import { findNode, findParent } from "./queryNode";
import { removeNode } from "./removeNode";
import { failure, type OperationResult } from "./result";

export function addScrollScene(document: ComponentDocument, storyId: string, idFactory?: IdFactory): OperationResult {
  const story = findNode(document.root, storyId);
  if (story?.type !== "scroll-story") return failure("operation.scroll_story_required", "The target node is not a Scroll Story");
  const scenes = story.children.filter((child): child is ScrollSceneNode => child.type === "scroll-scene");
  if (scenes.length >= SCROLL_STORY_LIMITS.maxScenes) {
    return failure("operation.scroll_story_scene_limit", `A Scroll Story can contain at most ${SCROLL_STORY_LIMITS.maxScenes} scenes`);
  }
  const starter = scenes.at(-1);
  if (!starter) return failure("operation.scroll_scene_required", "The Scroll Story has no scene to duplicate");
  const totalLength = scenes.reduce((sum, scene) => sum + scene.length, 0);
  if (totalLength + starter.length > SCROLL_STORY_LIMITS.maxTotalLength) {
    return failure("operation.scroll_story_length_limit", "The Scroll Story has reached its maximum total scroll length");
  }
  const copy = regenerateNodeIds({ ...starter, length: Math.min(starter.length, SCROLL_STORY_LIMITS.maxSceneLength) }, idFactory) as ScrollSceneNode;
  return addNode(document, story.id, copy, story.children.length);
}

export function removeScrollScene(document: ComponentDocument, sceneId: string): OperationResult {
  const scene = findNode(document.root, sceneId);
  if (scene?.type !== "scroll-scene") return failure("operation.scroll_scene_required", "The target node is not a Scroll Scene");
  const parent = findParent(document.root, sceneId);
  if (parent?.type !== "scroll-story") return failure("operation.scroll_story_parent_required", "The scene does not belong to a Scroll Story");
  const scenes = parent.children.filter((child) => child.type === "scroll-scene");
  if (scenes.length <= 1) return failure("operation.scroll_story_minimum", "A Scroll Story must keep at least one scene");
  return removeNode(document, sceneId);
}

export function isScrollStory(node: unknown): node is ScrollStoryNode {
  return typeof node === "object" && node !== null && (node as ScrollStoryNode).type === "scroll-story";
}
