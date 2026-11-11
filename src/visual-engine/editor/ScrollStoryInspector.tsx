"use client";

import type { ImageObjectFit, ScrollSceneMedia, ScrollSceneNode, ScrollStoryNode } from "../model";
import { SCROLL_STORY_LIMITS } from "../model/nodes";
import type { NodePatch } from "../operations";
import { InspectorCheckbox, InspectorField, InspectorInput, InspectorSection, InspectorSelect, InspectorTextarea } from "./InspectorSection";

interface ScrollStoryInspectorProps {
  node: ScrollStoryNode;
  onUpdate(patch: NodePatch): void;
  onAddScene?(): void;
}

export function ScrollStoryInspector({ node, onUpdate, onAddScene }: ScrollStoryInspectorProps) {
  const scenes = node.children.filter((child): child is ScrollSceneNode => child.type === "scroll-scene");
  const totalLength = scenes.reduce((sum, scene) => sum + scene.length, 0);
  const nextLength = scenes.at(-1)?.length ?? 0;
  const canAdd = scenes.length < SCROLL_STORY_LIMITS.maxScenes && totalLength + nextLength <= SCROLL_STORY_LIMITS.maxTotalLength;
  return (
    <InspectorSection title="Scroll story">
      <InspectorSelect label="Transition" ariaLabel="Scroll story transition" value={node.transition} options={[{ value: "fade", label: "Fade" }, { value: "slide-up", label: "Slide up" }, { value: "none", label: "None" }]} onChange={(transition) => onUpdate({ transition: transition as ScrollStoryNode["transition"] })} />
      <InspectorSelect label="Mobile behavior" ariaLabel="Scroll story mobile behavior" value={node.mobileMode} options={[{ value: "stack", label: "Stack scenes" }, { value: "scrub", label: "Scrub scenes" }]} onChange={(mobileMode) => onUpdate({ mobileMode: mobileMode as ScrollStoryNode["mobileMode"] })} />
      <InspectorSelect label="Scene layout" ariaLabel="Scroll story scene layout" value={node.sceneLayout} options={[{ value: "background", label: "Full-bleed background" }, { value: "split-right", label: "Text left, media right" }]} onChange={(sceneLayout) => onUpdate({ sceneLayout: sceneLayout as ScrollStoryNode["sceneLayout"] })} />
      <InspectorCheckbox label="Show progress" checked={node.showProgress} onChange={(showProgress) => onUpdate({ showProgress })} />
      <InspectorInput label="Accessible label" ariaLabel="Scroll story accessible label" value={node.accessibleLabel ?? ""} onChange={(accessibleLabel) => onUpdate({ accessibleLabel: accessibleLabel || undefined })} />
      <p className="vb-inspector__hint">{scenes.length} scene{scenes.length === 1 ? "" : "s"} · {totalLength.toFixed(1)} screens</p>
      <ol className="vb-scroll-story__scene-list">
        {scenes.map((scene, index) => <li key={scene.id}>{index + 1}. {scene.length.toFixed(1)} screens · {scene.media.kind}</li>)}
      </ol>
      {onAddScene ? <button type="button" className="vb-button" disabled={!canAdd} onClick={onAddScene}>Add scene</button> : null}
    </InspectorSection>
  );
}

interface ScrollSceneInspectorProps {
  node: ScrollSceneNode;
  story: ScrollStoryNode;
  onUpdate(patch: NodePatch): void;
  onRemoveScene?(): void;
}

export function ScrollSceneInspector({ node, story, onUpdate, onRemoveScene }: ScrollSceneInspectorProps) {
  const scenes = story.children.filter((child) => child.type === "scroll-scene");
  const updateMedia = (media: ScrollSceneMedia) => onUpdate({ media });
  const media = node.media;
  const image = media.kind === "image" ? media : null;
  const video = media.kind === "video" ? media : null;
  const sequence = media.kind === "sequence" ? media : null;
  return (
    <InspectorSection title="Scroll scene">
      <InspectorField label="Scroll length">
        <input
          className="vb-field__control"
          aria-label="Scene scroll length"
          type="number"
          min={SCROLL_STORY_LIMITS.minSceneLength}
          max={SCROLL_STORY_LIMITS.maxSceneLength}
          step={0.1}
          value={node.length}
          onChange={(event) => {
            const length = Number(event.target.value);
            if (Number.isFinite(length) && length >= SCROLL_STORY_LIMITS.minSceneLength && length <= SCROLL_STORY_LIMITS.maxSceneLength) onUpdate({ length });
          }}
        />
      </InspectorField>
      <p className="vb-inspector__hint">Scene {scenes.findIndex((scene) => scene.id === node.id) + 1} of {scenes.length}</p>
      <InspectorSelect label="Media" ariaLabel="Scene media" value={media.kind} options={[{ value: "none", label: "No media" }, { value: "image", label: "Image" }, { value: "video", label: "Video" }, { value: "sequence", label: "Image sequence" }]} onChange={(kind) => updateMedia(defaultMedia(kind as ScrollSceneMedia["kind"]))} />
      {image !== null ? <>
        <InspectorInput label="Image URL" ariaLabel="Scene image URL" value={image.src} onChange={(src) => updateMedia({ ...image, src })} />
        <InspectorInput label="Alternative text" ariaLabel="Scene image alternative text" value={image.alt} onChange={(alt) => updateMedia({ ...image, alt })} />
        <ObjectFitField value={image.objectFit} onChange={(objectFit) => updateMedia({ ...image, objectFit })} />
      </> : null}
      {video !== null ? <>
        <InspectorInput label="Video URL" ariaLabel="Scene video URL" value={video.src} onChange={(src) => updateMedia({ ...video, src })} />
        <InspectorInput label="Poster URL" ariaLabel="Scene video poster URL" value={video.poster} onChange={(poster) => updateMedia({ ...video, poster })} />
        <InspectorInput label="Title" ariaLabel="Scene video title" value={video.title} onChange={(title) => updateMedia({ ...video, title })} />
        <InspectorInput label="Trim start (seconds)" ariaLabel="Scene video trim start" value={video.trimStart?.toString() ?? ""} onChange={(value) => updateMedia({ ...video, trimStart: optionalNumber(value) })} />
        <InspectorInput label="Trim end (seconds)" ariaLabel="Scene video trim end" value={video.trimEnd?.toString() ?? ""} onChange={(value) => updateMedia({ ...video, trimEnd: optionalNumber(value) })} />
        <ObjectFitField value={video.objectFit} onChange={(objectFit) => updateMedia({ ...video, objectFit })} />
      </> : null}
      {sequence !== null ? <>
        <InspectorInput label="Poster URL" ariaLabel="Scene sequence poster URL" value={sequence.poster} onChange={(poster) => updateMedia({ ...sequence, poster })} />
        <InspectorInput label="Alternative text" ariaLabel="Scene sequence alternative text" value={sequence.alt} onChange={(alt) => updateMedia({ ...sequence, alt })} />
        <InspectorTextarea label="Frame URLs" ariaLabel="Scene sequence frame URLs" value={sequence.frames.join("\n")} onChange={(value) => updateMedia({ ...sequence, frames: value.split(/\r?\n/).map((frame) => frame.trim()).filter(Boolean) })} />
        <ObjectFitField value={sequence.objectFit} onChange={(objectFit) => updateMedia({ ...sequence, objectFit })} />
      </> : null}
      {onRemoveScene ? <button type="button" className="vb-button" disabled={scenes.length <= 1} onClick={onRemoveScene}>Remove scene</button> : null}
      {scenes.length <= 1 ? <p className="vb-inspector__hint">A Scroll Story must keep at least one scene.</p> : null}
    </InspectorSection>
  );
}

function ObjectFitField({ value, onChange }: { value?: ImageObjectFit; onChange(value: ImageObjectFit | undefined): void }) {
  return <InspectorSelect label="Object fit" ariaLabel="Scene media object fit" value={value ?? ""} options={[{ value: "", label: "Default" }, { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" }]} onChange={(next) => onChange(next === "cover" || next === "contain" ? next : undefined)} />;
}

function defaultMedia(kind: ScrollSceneMedia["kind"]): ScrollSceneMedia {
  if (kind === "image") return { kind: "image", src: "/visual-builder/placeholder.svg", alt: "Scene image", objectFit: "cover" };
  if (kind === "video") return { kind: "video", src: "/media/story.mp4", poster: "/visual-builder/placeholder.svg", title: "Scene video", objectFit: "cover" };
  if (kind === "sequence") return { kind: "sequence", frames: ["/visual-builder/placeholder.svg?frame=1", "/visual-builder/placeholder.svg?frame=2"], poster: "/visual-builder/placeholder.svg", alt: "Scene sequence", objectFit: "cover" };
  return { kind: "none" };
}

function optionalNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
