"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { ScrollSceneNode, ScrollStoryLayout, ScrollStoryNode } from "../model";
import { ScrollStoryMedia, type ScrollMediaController } from "./ScrollStoryMedia";
import "./scroll-story.css";

interface ScrollStoryRuntimeProps {
  node: ScrollStoryNode;
  mode: "preview" | "canvas";
  stage: ReactNode;
  renderScene(scene: ScrollSceneNode): ReactNode;
}

interface SceneTiming {
  start: number;
  end: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";

export function ScrollStoryRuntime({ node, mode, stage, renderScene }: ScrollStoryRuntimeProps) {
  const scenes = useMemo(() => node.children.filter((child): child is ScrollSceneNode => child.type === "scroll-scene"), [node.children]);
  const totalLength = scenes.reduce((sum, scene) => sum + scene.length, 0);
  const timings = useMemo(() => {
    const result = new Map<string, SceneTiming>();
    let cursor = 0;
    for (const scene of scenes) {
      const start = cursor / Math.max(totalLength, 0.001);
      cursor += scene.length;
      result.set(scene.id, { start, end: cursor / Math.max(totalLength, 0.001) });
    }
    return result;
  }, [scenes, totalLength]);

  const [enhanced, setEnhanced] = useState(false);
  const [userStatic, setUserStatic] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const controllers = useRef(new Map<string, ScrollMediaController>());
  const progressRefValue = useRef(0);
  const activeRef = useRef(0);
  const inViewRef = useRef(true);
  const frameRef = useRef<number | null>(null);

  const registerController = useCallback((sceneId: string, controller: ScrollMediaController | null) => {
    if (controller === null) {
      controllers.current.delete(sceneId);
      return;
    }
    controllers.current.set(sceneId, controller);
    const timing = timings.get(sceneId);
    const local = timing === undefined ? 0 : localProgress(progressRefValue.current, timing);
    controller.setProgress(local, scenes[activeRef.current]?.id === sceneId);
  }, [scenes, timings]);

  useEffect(() => {
    if (mode === "canvas" || userStatic) {
      setEnhanced(false);
      return;
    }
    const element = rootRef.current;
    if (element === null || typeof window === "undefined") return;
    const media = window.matchMedia?.(REDUCED_MOTION_QUERY);
    const mobile = window.matchMedia?.(MOBILE_QUERY);
    const evaluate = () => {
      setEnhanced(!(media?.matches ?? false)
        && !(mobile?.matches === true && node.mobileMode === "stack")
        && stickyIsViable(element));
    };
    evaluate();
    media?.addEventListener?.("change", evaluate);
    mobile?.addEventListener?.("change", evaluate);
    return () => {
      media?.removeEventListener?.("change", evaluate);
      mobile?.removeEventListener?.("change", evaluate);
    };
  }, [mode, node.mobileMode, userStatic]);

  useEffect(() => {
    if (!enhanced) return;
    const root = rootRef.current;
    if (root === null) return;
    const update = () => {
      if (!inViewRef.current) return;
      const rect = root.getBoundingClientRect();
      const scrollRange = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / scrollRange, 0, 1);
      progressRefValue.current = progress;
      const nextActive = sceneIndexAt(progress, scenes, timings);
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActiveIndex(nextActive);
      }
      scenes.forEach((scene, index) => {
        const element = sceneRefs.current[index];
        const timing = timings.get(scene.id);
        if (element === null || timing === undefined) return;
        const active = index === nextActive;
        const local = localProgress(progress, timing);
        element.style.opacity = active ? "1" : "0";
        element.style.transform = sceneTransform(node.transition, local, active);
        element.style.pointerEvents = active ? "auto" : "none";
        element.style.zIndex = active ? "2" : "1";
        if (active) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", "true");
        element.toggleAttribute("inert", !active);
        controllers.current.get(scene.id)?.setProgress(local, active);
      });
      if (progressRef.current !== null) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };
    const observer = typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          inViewRef.current = entries.some((entry) => entry.isIntersecting);
          if (inViewRef.current) requestUpdate();
        });
    observer?.observe(root);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [enhanced, node.transition, scenes, timings]);

  const storyLabel = node.accessibleLabel ?? "Scroll story";
  return (
    <div
      ref={rootRef}
      className="ve-scroll-story"
      data-enhanced={enhanced ? "true" : "false"}
      data-transition={node.transition}
      data-story-mode={mode}
      role="region"
      aria-label={storyLabel}
      style={enhanced ? { height: `${totalLength * 100}svh` } as CSSProperties : undefined}
    >
      {enhanced ? (
        <div className="ve-scroll-story__viewport">
          {stage === null || stage === undefined ? null : <div className="ve-scroll-story__stage">{stage}</div>}
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              ref={(element) => { sceneRefs.current[index] = element; }}
              className="ve-scroll-story__scene"
              data-layout={node.sceneLayout}
              data-scroll-scene-index={index}
              data-active={activeIndex === index ? "true" : undefined}
              aria-hidden={activeIndex === index ? undefined : "true"}
              inert={activeIndex === index ? undefined : true}
            >
              <ScrollSceneBody
                layout={node.sceneLayout}
                scene={scene}
                active={activeIndex === index}
                enhanced
                renderScene={renderScene}
                onRegister={(controller) => registerController(scene.id, controller)}
              />
            </div>
          ))}
          {node.showProgress ? <div ref={progressRef} className="ve-scroll-story__progress" aria-hidden="true" /> : null}
          <button type="button" className="ve-scroll-story__control" onClick={() => setUserStatic(true)}>Read as article</button>
        </div>
      ) : (
        <div className="ve-scroll-story__static">
          {stage === null || stage === undefined ? null : <div className="ve-scroll-story__stage-static">{stage}</div>}
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="ve-scroll-story__static-scene"
              data-layout={node.sceneLayout}
              style={{ minHeight: `${scene.length * 100}svh` }}
            >
              <ScrollSceneBody
                layout={node.sceneLayout}
                scene={scene}
                active={false}
                enhanced={false}
                renderScene={renderScene}
                onRegister={() => undefined}
              />
            </div>
          ))}
          {userStatic ? <button type="button" className="ve-scroll-story__control" onClick={() => setUserStatic(false)}>Use scroll story</button> : null}
        </div>
      )}
    </div>
  );
}

interface ScrollSceneBodyProps {
  layout: ScrollStoryLayout;
  scene: ScrollSceneNode;
  active: boolean;
  enhanced: boolean;
  renderScene(scene: ScrollSceneNode): ReactNode;
  onRegister(controller: ScrollMediaController | null): void;
}

function ScrollSceneBody({ layout, scene, active, enhanced, renderScene, onRegister }: ScrollSceneBodyProps) {
  const media = <ScrollStoryMedia media={scene.media} active={active} enhanced={enhanced} onRegister={onRegister} />;
  if (layout === "split-right") {
    return (
      <div className="ve-scroll-story__split">
        <div className="ve-scroll-story__scene-content">{renderScene(scene)}</div>
        <div className="ve-scroll-story__scene-media">{media}</div>
      </div>
    );
  }
  return (
    <>
      {media}
      <div className="ve-scroll-story__scene-content">{renderScene(scene)}</div>
    </>
  );
}

function localProgress(progress: number, timing: SceneTiming): number {
  const span = Math.max(0.0001, timing.end - timing.start);
  return clamp((progress - timing.start) / span, 0, 1);
}

function sceneIndexAt(progress: number, scenes: ScrollSceneNode[], timings: Map<string, SceneTiming>): number {
  for (let index = scenes.length - 1; index >= 0; index -= 1) {
    const timing = timings.get(scenes[index].id);
    if (timing !== undefined && progress >= timing.start) return index;
  }
  return 0;
}

function sceneTransform(transition: ScrollStoryNode["transition"], local: number, active: boolean): string {
  if (transition !== "slide-up") return "translate3d(0, 0, 0)";
  return active ? `translate3d(0, ${(1 - local) * 40}px, 0)` : "translate3d(0, 32px, 0)";
}

function stickyIsViable(element: HTMLElement): boolean {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") return true;
  let parent = element.parentElement;
  while (parent !== null && parent !== document.body) {
    const style = window.getComputedStyle(parent);
    if (style.transform !== "none" || style.filter !== "none" || style.perspective !== "none" || (style.contain ?? "").includes("paint")) return false;
    parent = parent.parentElement;
  }
  return true;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
