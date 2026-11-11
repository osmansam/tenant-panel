// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import VisualDesignPreview from "./VisualDesignPreview";
import type { VisualBlockValue } from "./types";
it("renders media posters and placeholders without media streams or embedded pages, preserving the source", () => {
 const value: VisualBlockValue = { document: { version: 2, id: "media-doc", name: "My media design", root: { id: "media-root", type: "section", style: { background: [{ kind: "video", src: "https://example.test/background.mp4", fit: "cover", position: "center", muted: true, loop: true }] }, children: [
  { id: "movie", type: "video", title: "Product video", src: "https://example.test/movie.mp4", poster: "/poster.png", autoplay: true },
  { id: "sound", type: "audio", accessibleLabel: "Product audio", src: "https://example.test/audio.mp3", autoplay: true },
  { id: "embedded", type: "embed", title: "Product embed", src: "https://example.test/embed", loading: "eager" },
  { id: "story", type: "scroll-story", transition: "fade", mobileMode: "stack", sceneLayout: "background", showProgress: false, children: [
   { id: "stage", type: "slot", name: "stage", children: [] },
   { id: "scene", type: "scroll-scene", length: 2, media: { kind: "video", src: "https://example.test/scene.mp4", title: "Scene", poster: "/scene-poster.png" }, children: [] },
  ] },
 ] } } };
 const original = structuredClone(value);
 const { container } = render(<VisualDesignPreview value={value} large />);
 expect(container.textContent).not.toContain("Preview unavailable");
 expect(container.querySelector("video, audio, iframe, source")).toBeNull();
 expect(container.querySelector('img[src="/poster.png"]')).toBeInTheDocument();
 expect(container.querySelector('img[src="/scene-poster.png"]')).toBeInTheDocument();
 expect(value).toEqual(original);
});
