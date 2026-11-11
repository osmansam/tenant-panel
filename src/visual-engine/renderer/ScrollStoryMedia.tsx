"use client";

import { useEffect, useRef } from "react";
import type { ImageObjectFit, ScrollSceneMedia } from "../model";
import { normalizeImageUrl, normalizeVideoUrl } from "../model/urls";

export interface ScrollMediaController {
  setProgress(progress: number, active: boolean): void;
}

interface ScrollStoryMediaProps {
  media: ScrollSceneMedia;
  active: boolean;
  enhanced: boolean;
  onRegister(controller: ScrollMediaController | null): void;
}

export function ScrollStoryMedia({ media, active, enhanced, onRegister }: ScrollStoryMediaProps) {
  if (!enhanced || media.kind === "none") return <StaticSceneMedia media={media} />;
  if (media.kind === "image") return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.src)} alt={media.alt} />;
  if (media.kind === "video") return <EnhancedVideoMedia media={media} active={active} onRegister={onRegister} />;
  return <EnhancedSequenceMedia media={media} active={active} onRegister={onRegister} />;
}

function StaticSceneMedia({ media }: { media: ScrollSceneMedia }) {
  if (media.kind === "none") return null;
  if (media.kind === "image") return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.src)} alt={media.alt} />;
  if (media.kind === "video") return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.poster)} alt={media.title} />;
  return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.poster)} alt={media.alt} />;
}

function EnhancedVideoMedia({ media, active, onRegister }: { media: Extract<ScrollSceneMedia, { kind: "video" }>; active: boolean; onRegister(controller: ScrollMediaController | null): void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingRef = useRef(0);
  const seekingRef = useRef(false);

  useEffect(() => {
    if (!active || videoRef.current === null) return;
    const video = videoRef.current;
    const seek = (progress: number) => {
      const start = media.trimStart ?? 0;
      const end = media.trimEnd ?? (Number.isFinite(video.duration) && video.duration > start ? video.duration : start + 1);
      const target = start + Math.max(0, Math.min(1, progress)) * Math.max(0, end - start);
      pendingRef.current = target;
      if (video.readyState < 1 || seekingRef.current) return;
      if (Math.abs(video.currentTime - target) > 1 / 30) {
        seekingRef.current = true;
        video.currentTime = target;
      }
    };
    const controller: ScrollMediaController = {
      setProgress(progress, isActive) {
        if (!isActive) {
          video.pause();
          return;
        }
        seek(progress);
      },
    };
    const seeked = () => {
      seekingRef.current = false;
      if (Math.abs(video.currentTime - pendingRef.current) > 1 / 30 && video.readyState >= 1) {
        seekingRef.current = true;
        video.currentTime = pendingRef.current;
      }
    };
    video.addEventListener("seeked", seeked);
    onRegister(controller);
    return () => {
      video.removeEventListener("seeked", seeked);
      video.pause();
      onRegister(null);
    };
  }, [active, media.trimStart, media.trimEnd, onRegister]);

  if (!active) return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.poster)} alt={media.title} />;
  return <video ref={videoRef} className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeVideo(media.src)} poster={safeImage(media.poster)} muted playsInline preload="auto" aria-label={media.title} role="img" />;
}

function EnhancedSequenceMedia({ media, active, onRegister }: { media: Extract<ScrollSceneMedia, { kind: "sequence" }>; active: boolean; onRegister(controller: ScrollMediaController | null): void }) {
  const frameRef = useRef<HTMLImageElement>(null);
  const loadedRef = useRef(new Set<string>());

  useEffect(() => {
    if (!active) return;
    const controller: ScrollMediaController = {
      setProgress(progress) {
        const index = Math.max(0, Math.min(media.frames.length - 1, Math.round(progress * (media.frames.length - 1))));
        const frame = media.frames[index];
        if (frame !== undefined && frameRef.current !== null && frameRef.current.getAttribute("src") !== frame) frameRef.current.src = frame;
        for (let offset = -4; offset <= 8; offset += 1) {
          const candidate = media.frames[index + offset];
          if (candidate === undefined || loadedRef.current.has(candidate)) continue;
          loadedRef.current.add(candidate);
          const image = new Image();
          image.decoding = "async";
          image.src = candidate;
        }
      },
    };
    onRegister(controller);
    return () => onRegister(null);
  }, [active, media.frames, onRegister]);

  if (!active) return <img className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.poster)} alt={media.alt} />;
  return <img ref={frameRef} className="ve-scroll-story__media" style={objectFitStyle(media.objectFit)} src={safeImage(media.frames[0] ?? media.poster)} alt={media.alt} />;
}

function objectFitStyle(objectFit?: ImageObjectFit) {
  return objectFit === undefined ? undefined : { objectFit };
}

function safeImage(value: string): string | undefined {
  const result = normalizeImageUrl(value);
  return result.success ? result.value : undefined;
}

function safeVideo(value: string): string | undefined {
  const result = normalizeVideoUrl(value);
  return result.success ? result.value : undefined;
}
