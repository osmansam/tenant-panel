"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { AnimationSpec, ComponentDocument } from "../model";
import { ANIMATION_PRESETS, ANIMATION_EASINGS, ANIMATION_TRIGGERS, DEFAULT_ANIMATION, ANIMATION_LIMITS } from "../model/animation";
import { collectMotionTracks, motionCandidates, motionDuration, type MotionTrack } from "./motionTracks";
import { CloseIcon } from "./icons";
import "./motion-timeline.css";

type Draft = { id: string; animation: AnimationSpec };
type Gesture = Draft & { pointerId: number; kind: "move" | "resize"; x: number; laneWidth: number; duration: number; initial: AnimationSpec; input: HTMLButtonElement };
export interface MotionTimelineProps {
  document: ComponentDocument;
  time: number;
  selectedNodeId: string | null;
  onTimeChange(time: number): void;
  onSelect(nodeId: string): void;
  onUpdate(nodeId: string, animation: AnimationSpec | undefined): void;
  onDraft(nodeId: string | null, animation?: AnimationSpec): void;
  onClose(): void;
}

const effectNames: Record<AnimationSpec["preset"], string> = { none: "None", fade: "Fade", "fade-up": "Fade up", "fade-down": "Fade down", "fade-left": "Fade from left", "fade-right": "Fade from right", "scale-in": "Scale in", "slide-up": "Slide up", "slide-left": "Slide from left", "slide-right": "Slide from right" };
const triggers = { load: "Page load", "in-view": "In view", hover: "Hover" };
const seconds = (value: number) => `${(value / 1000).toFixed(2)}s`;
const bounded = (value: number, limit: { min: number; max: number }) => Math.max(limit.min, Math.min(limit.max, Math.round(value)));

export function MotionTimeline({ document: current, time, selectedNodeId, onTimeChange, onSelect, onUpdate, onDraft, onClose }: MotionTimelineProps) {
  const tracks = useMemo(() => collectMotionTracks(current), [current]);
  const candidates = useMemo(() => motionCandidates(current), [current]);
  const duration = motionDuration(tracks);
  const selected = tracks.find(track => track.id === selectedNodeId) ?? tracks[0];
  const [target, setTarget] = useState("");
  const [playing, setPlaying] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const clock = useRef(time);
  const timeCallback = useRef(onTimeChange);
  const draftCallback = useRef(onDraft);
  timeCallback.current = onTimeChange;
  draftCallback.current = onDraft;
  const enabledCandidates = candidates.filter(candidate => !candidate.blockedBy);
  const targetId = enabledCandidates.some(candidate => candidate.id === target) ? target
    : enabledCandidates.find(candidate => candidate.id === selectedNodeId)?.id ?? enabledCandidates[0]?.id ?? "";

  useEffect(() => { clock.current = time; }, [time]);
  useEffect(() => {
    if (time > duration) onTimeChange(duration);
  }, [duration, time, onTimeChange]);
  useEffect(() => {
    setPlaying(false);
    const active = gesture.current;
    if (!active) return;
    gesture.current = null;
    try { if (active.input.hasPointerCapture?.(active.pointerId)) active.input.releasePointerCapture(active.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    setDraft(null); draftCallback.current(null);
  }, [current]);
  useEffect(() => () => { draftCallback.current(null); }, []);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous: number | null = null;
    const animate = (stamp: number) => {
      if (previous !== null && !globalThis.document.hidden) {
        const next = Math.min(duration, clock.current + Math.max(0, stamp - previous));
        clock.current = next; timeCallback.current(next);
        if (next >= duration) { setPlaying(false); return; }
      }
      previous = stamp;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playing, duration]);

  const seek = (value: number) => { setPlaying(false); clock.current = value; onTimeChange(value); };
  const cancel = () => {
    const active = gesture.current;
    gesture.current = null;
    if (active) try { if (active.input.hasPointerCapture?.(active.pointerId)) active.input.releasePointerCapture(active.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    setDraft(null); onDraft(null);
  };
  const begin = (event: PointerEvent<HTMLButtonElement>, track: MotionTrack, kind: Gesture["kind"]) => {
    if (event.button > 0 || event.isPrimary === false || gesture.current) return;
    const lane = event.currentTarget.closest<HTMLElement>("[data-motion-lane]");
    const laneWidth = lane?.getBoundingClientRect().width ?? 0;
    if (laneWidth <= 0) return;
    event.preventDefault(); event.stopPropagation();
    setPlaying(false); onSelect(track.id);
    event.currentTarget.focus({ preventScroll: true });
    gesture.current = { id: track.id, pointerId: event.pointerId, input: event.currentTarget, kind, x: event.clientX, laneWidth, duration, initial: track.animation, animation: track.animation };
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    const delta = Math.round((event.clientX - active.x) * active.duration / active.laneWidth / 10) * 10;
    const key = active.kind === "move" ? "delay" : "duration";
    const value = bounded(active.initial[key] + delta, ANIMATION_LIMITS[key]);
    active.animation = { ...active.initial, [key]: value };
    setDraft({ id: active.id, animation: active.animation });
    onDraft(active.id, active.animation);
  };
  const finish = (event: PointerEvent<HTMLButtonElement>) => {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    gesture.current = null;
    try { if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    if (active.animation.delay !== active.initial.delay || active.animation.duration !== active.initial.duration) onUpdate(active.id, active.animation);
    setDraft(null); onDraft(null);
  };
  const barKey = (event: KeyboardEvent<HTMLButtonElement>, track: MotionTrack, kind: Gesture["kind"]) => {
    if (event.key === "Escape" && gesture.current) { event.preventDefault(); event.stopPropagation(); cancel(); return; }
    if (gesture.current) return;
    const key = kind === "move" ? "delay" : "duration";
    const step = event.shiftKey ? 250 : 50;
    const next = event.key === "ArrowRight" || event.key === "ArrowUp" ? track.animation[key] + step
      : event.key === "ArrowLeft" || event.key === "ArrowDown" ? track.animation[key] - step
        : event.key === "Home" ? 0 : event.key === "End" ? ANIMATION_LIMITS[key].max : null;
    if (next === null) return;
    event.preventDefault(); event.stopPropagation(); setPlaying(false);
    onSelect(track.id); onUpdate(track.id, { ...track.animation, [key]: bounded(next, ANIMATION_LIMITS[key]) });
  };
  const patch = (changes: Partial<AnimationSpec>) => {
    if (!selected) return;
    setPlaying(false); onUpdate(selected.id, { ...selected.animation, ...changes });
  };
  const numeric = (label: string, key: "delay" | "duration" | "stagger") => <label className="vb-motion__field"><span>{label} <small>ms</small></span><input type="number" aria-label={`Motion ${key === "delay" ? "start" : key}`} min={0} max={ANIMATION_LIMITS[key].max} step={key === "stagger" ? 25 : 50} value={selected?.animation[key] ?? 0} onChange={event => { if (event.target.value !== "" && Number.isFinite(event.target.valueAsNumber)) patch({ [key]: bounded(event.target.valueAsNumber, ANIMATION_LIMITS[key]) }); }} /></label>;

  return <section className="vb-motion" aria-label="Motion timeline" onKeyDown={event => { if (!((event.metaKey || event.ctrlKey) && ["z", "y"].includes(event.key.toLowerCase()))) event.stopPropagation(); }}>
    <header className="vb-motion__header"><div><strong>Motion timeline</strong><span>Entrance animations</span></div>
      <button type="button" aria-label={playing ? "Pause motion" : "Play motion"} className="vb-motion__play" disabled={!tracks.length} onClick={() => { if (!playing && clock.current >= duration) { clock.current = 0; onTimeChange(0); } setPlaying(value => !value); }}>{playing ? "Pause" : "Play"}</button>
      <button type="button" aria-label="Restart motion" className="vb-motion__button" disabled={!tracks.length} onClick={() => seek(0)}>Restart</button>
      <output className="vb-motion__time" aria-label="Motion time">{seconds(time)} / {seconds(duration)}</output>
      <button type="button" className="vb-motion__close" aria-label="Close motion timeline" onClick={() => { cancel(); onClose(); }}><CloseIcon size={14} /></button>
    </header>
    <div className="vb-motion__add"><label><span className="sr-only">Animate element</span><select aria-label="Animate element" value={targetId} disabled={!enabledCandidates.length} onChange={event => setTarget(event.target.value)}>{!enabledCandidates.length ? <option value="">No available elements</option> : null}{candidates.map(candidate => <option key={candidate.id} value={candidate.id} disabled={!!candidate.blockedBy}>{candidate.label}{candidate.blockedBy ? " · parent controls timing" : ""}</option>)}</select></label><button type="button" className="vb-motion__button" disabled={!targetId} onClick={() => { if (!targetId) return; setPlaying(false); onSelect(targetId); onUpdate(targetId, { ...DEFAULT_ANIMATION, trigger: "load" }); }}>Add animation</button><p>Scrub every trigger from zero; published triggers stay unchanged.</p></div>
    <div className="vb-motion__scrubber"><label htmlFor={`motion-playhead-${current.id}`}>Playhead</label><input id={`motion-playhead-${current.id}`} aria-label="Animation playhead" type="range" min={0} max={duration} step={10} value={time} onChange={event => seek(Number(event.target.value))} /></div>
    <div className="vb-motion__tracks">
      <div className="vb-motion__ruler" aria-hidden="true"><span>Element</span><div>{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ left: `${index * 20}%` }}>{seconds(duration * index / 5)}</i>)}</div></div>
      {!tracks.length ? <p className="vb-motion__empty">Add an animation above to start a sequence. Select text, an image, a card, or a group.</p> : tracks.map(track => {
        const animation = draft?.id === track.id ? draft.animation : track.animation;
        const start = animation.delay;
        const end = start + animation.duration + track.staggerTail;
        return <div key={track.id} className="vb-motion__row" data-selected={selected?.id === track.id ? "true" : undefined}>
          <button type="button" className="vb-motion__label" aria-label={`Select motion ${track.label}`} title={track.label} onClick={() => { setPlaying(false); onSelect(track.id); }}><strong>{track.label}</strong><small>{animation.stagger !== undefined ? `Group · ${track.node && "children" in track.node ? track.node.children.length : 0} items` : triggers[animation.trigger]}</small></button>
          <div className="vb-motion__lane" data-motion-lane>
            <div className="vb-motion__bar" data-motion-track={track.id} style={{ left: `min(${start / duration * 100}%, calc(100% - 18px))`, width: `${Math.max(0, end - start) / duration * 100}%` }}>
              <button type="button" className="vb-motion__move" aria-label={`Move ${track.label} animation`} title="Drag to change start time. Arrow keys: 50 ms; Shift: 250 ms." onPointerDown={event => begin(event, track, "move")} onPointerMove={move} onPointerUp={finish} onPointerCancel={cancel} onLostPointerCapture={() => { if (gesture.current) cancel(); }} onKeyDown={event => barKey(event, track, "move")}>{effectNames[animation.preset]}</button>
              <button type="button" className="vb-motion__resize" aria-label={`Resize ${track.label} animation`} title="Drag to change duration. Arrow keys: 50 ms; Shift: 250 ms." onPointerDown={event => begin(event, track, "resize")} onPointerMove={move} onPointerUp={finish} onPointerCancel={cancel} onLostPointerCapture={() => { if (gesture.current) cancel(); }} onKeyDown={event => barKey(event, track, "resize")} />
            </div>
            <i className="vb-motion__playhead" style={{ left: `${time / duration * 100}%` }} aria-hidden="true" />
          </div>
        </div>;
      })}
    </div>
    {selected ? <div className="vb-motion__settings" aria-label="Selected animation settings">
      <label className="vb-motion__field"><span>Effect</span><select aria-label="Motion effect" value={selected.animation.preset} onChange={event => patch({ preset: event.target.value as AnimationSpec["preset"] })}>{ANIMATION_PRESETS.filter(preset => preset !== "none").map(preset => <option key={preset} value={preset}>{effectNames[preset]}</option>)}</select></label>
      <label className="vb-motion__field"><span>Trigger</span><select aria-label="Motion trigger" value={selected.animation.trigger} onChange={event => patch({ trigger: event.target.value as AnimationSpec["trigger"] })}>{ANIMATION_TRIGGERS.map(trigger => <option key={trigger} value={trigger}>{triggers[trigger]}</option>)}</select></label>
      {numeric("Start", "delay")}{numeric("Duration", "duration")}
      <label className="vb-motion__field"><span>Easing</span><select aria-label="Motion easing" value={selected.animation.easing} onChange={event => patch({ easing: event.target.value as AnimationSpec["easing"] })}>{ANIMATION_EASINGS.map(easing => <option key={easing} value={easing}>{easing.replace(/-/g, " ")}</option>)}</select></label>
      {selected.animation.stagger !== undefined ? numeric("Stagger", "stagger") : null}
      <button type="button" className="vb-motion__remove" aria-label="Remove animation" onClick={() => { setPlaying(false); onUpdate(selected.id, undefined); }}>Remove</button>
    </div> : null}
  </section>;
}
