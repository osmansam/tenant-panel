import { Component, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { VisualRenderer } from "../visual-engine/renderer";
import { ThemeScope } from "../visual-engine/theme";
import { ThemeProvider } from "../visual-engine/host/ThemeProvider";
import { copyVisualDesign } from "./componentLibrary";
import type { VisualBlockValue } from "./types";
import type { ComponentDocument, ComponentNode } from "../visual-engine/model";
import "../visual-engine/host/utilities.css";

class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? <p className="vd-preview__fallback">Preview unavailable. Open this design to review it.</p> : this.props.children; }
}
/** Mutates only the gallery's private copy; saved documents retain working media. */
function staticDocument(document: ComponentDocument): ComponentDocument {
 const visit = (node: ComponentNode): ComponentNode => {
  if (node.style?.background) node.style.background = node.style.background.map(layer => layer.kind === "video" ? { kind: "solid", color: { kind: "token", value: "surface-muted" }, opacity: layer.opacity } : layer);
  if (node.type === "video" || node.type === "audio" || node.type === "embed") {
   const common = { id: node.id, style: node.style, layout: node.layout, responsive: node.responsive };
   if (node.type === "video" && node.poster) return { ...common, type: "image", src: node.poster, alt: node.title };
   return { ...common, type: "text", text: `${node.type === "embed" ? "Embedded content" : node.type === "audio" ? "Audio" : "Video"}: ${node.type === "audio" ? node.accessibleLabel : node.title}` };
  }
  if (node.type === "scroll-scene" && (node.media.kind === "video" || node.media.kind === "sequence")) {
   node.media = { kind: "image", src: node.media.poster, alt: node.media.kind === "video" ? node.media.title : node.media.alt, objectFit: node.media.objectFit };
  }
  if ("children" in node) node.children = node.children.map(visit);
  return node;
 };
 visit(document.root);
 return document;
}
function Canvas({ value, large }: { value: VisualBlockValue; large: boolean }) {
 const id = useId();
 // Each mounted preview owns its node and document IDs, including internal links.
 const document = useMemo(() => staticDocument((copyVisualDesign(value, value.document.name).props!.visualBuilder as VisualBlockValue).document), [value]);
 const frame = useRef<HTMLDivElement>(null), content = useRef<HTMLDivElement>(null);
 const [size, setSize] = useState({ width: 320, height: 600 });
 const [visible, setVisible] = useState(typeof IntersectionObserver === "undefined" || large);
 useEffect(() => {
  if (visible || !frame.current) return;
  const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); } }, { rootMargin: "200px" });
  observer.observe(frame.current); return () => observer.disconnect();
 }, [visible]);
 useEffect(() => {
  const measure = () => setSize({ width: frame.current?.clientWidth || 320, height: content.current?.offsetHeight || 600 });
  measure();
  if (typeof ResizeObserver === "undefined") return;
  const observer = new ResizeObserver(measure);
  if (frame.current) observer.observe(frame.current);
  if (content.current) observer.observe(content.current);
  return () => observer.disconnect();
 }, [visible]);
 const scale = Math.min(size.width / 1000, 1);
 return <div ref={frame} className={`vd-preview ${large ? "vd-preview--large" : ""}`} style={large ? { height: Math.max(180, size.height * scale) } : undefined} aria-hidden="true" inert="">
  {visible && <div ref={content} className="ve-utilities vd-preview__canvas" style={{ width: 1000, transform: `scale(${scale})` }}>
   <ThemeProvider projectKey={id} defaultMode="light" fixedMode="light" persist={false}><ThemeScope theme={value.theme} palette="light" defaultMode="light" scopeId={`design-preview-${id}`}><VisualRenderer document={document} mode="canvas" themeMode="light" breakpoint="desktop" motionTime={100000} /></ThemeScope></ThemeProvider>
  </div>}
 </div>;
}
/** Static and inert: no effects registry, API collections, or working forms in gallery cards. */
export default function VisualDesignPreview({ value, large = false }: { value: VisualBlockValue; large?: boolean }) {
 return <PreviewBoundary key={value.document.id}><Canvas value={value} large={large} /></PreviewBoundary>;
}
