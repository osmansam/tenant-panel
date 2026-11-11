"use client";

import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode } from "react";
import type { EffectComponentProps } from "../../core";

type StyleVars = CSSProperties & Record<`--${string}`, string | number>;

function decorateRoot(children: ReactNode, className: string, style?: StyleVars, extra?: Record<string, unknown>): ReactNode {
  if (!isValidElement(children)) return <span className={className} style={style} {...extra}>{children}</span>;
  const element = children as ReactElement<{ className?: string; style?: CSSProperties }>;
  return cloneElement(element, {
    className: [element.props.className, className].filter(Boolean).join(" "),
    style: { ...element.props.style, ...style },
    ...extra,
  });
}

function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement(node)) return plainText((node.props as { children?: ReactNode }).children);
  return "";
}

function replaceRootText(children: ReactNode, text: string): ReactNode {
  if (!isValidElement(children)) return text;
  return cloneElement(children as ReactElement<{ children?: ReactNode }>, undefined, text);
}

function replaceRootContent(children: ReactNode, content: ReactNode): ReactNode {
  if (!isValidElement(children)) return content;
  return cloneElement(children as ReactElement<{ children?: ReactNode }>, undefined, content);
}

export type AdditionalTextProps = { mode: string; color1: string; color2: string; speed: number; distance: number; trigger: string };
export function AdditionalTextEffect({ props, context, children }: EffectComponentProps<AdditionalTextProps>) {
  return decorateRoot(children, `rb-catalog-text rb-catalog-text--${props.mode}`, {
    "--rb-catalog-color-1": props.color1,
    "--rb-catalog-color-2": props.color2,
    "--rb-catalog-speed": `${Math.max(.1, props.speed)}s`,
    "--rb-catalog-distance": `${props.distance}px`,
    animationPlayState: context.reducedMotion ? "paused" : undefined,
  }, { "data-reactbits-text": props.mode });
}

export type AdditionalButtonProps = { mode: string; color: string; intensity: number; duration: number };
export function AdditionalButtonEffect({ props, context, children }: EffectComponentProps<AdditionalButtonProps>) {
  return (
    <span className={`rb-catalog-button rb-catalog-button--${props.mode}`} style={{
      "--rb-button-color": props.color,
      "--rb-button-intensity": props.intensity,
      "--rb-button-duration": `${context.reducedMotion ? 0 : props.duration}s`,
    } as StyleVars} data-reactbits-button={props.mode}>
      <span aria-hidden="true" className="rb-catalog-button__decoration" />
      <span className="rb-catalog-button__content">{children}</span>
    </span>
  );
}

export type ShinyTextProps = { color: string; shineColor: string; speed: number; spread: number; direction: string; pauseOnHover: boolean };
export function ShinyTextEffect({ props, context, children }: EffectComponentProps<ShinyTextProps>) {
  return decorateRoot(children, `rb-shiny-text${props.pauseOnHover ? " rb-pause-on-hover" : ""}`, {
    "--rb-text-color": props.color,
    "--rb-shine-color": props.shineColor,
    "--rb-shine-speed": `${props.speed}s`,
    "--rb-shine-angle": `${props.spread}deg`,
    "--rb-shine-direction": props.direction === "right" ? "reverse" : "normal",
    animationPlayState: context.reducedMotion ? "paused" : undefined,
  });
}

export type GradientTextProps = { color1: string; color2: string; color3: string; speed: number; direction: string; yoyo: boolean; pauseOnHover: boolean };
export function GradientTextEffect({ props, context, children }: EffectComponentProps<GradientTextProps>) {
  const direction = props.direction === "vertical" ? "to bottom" : props.direction === "diagonal" ? "to bottom right" : "to right";
  return decorateRoot(children, `rb-gradient-text${props.pauseOnHover ? " rb-pause-on-hover" : ""}`, {
    "--rb-gradient-colors": `${props.color1}, ${props.color2}, ${props.color3}, ${props.color1}`,
    "--rb-gradient-direction": direction,
    "--rb-gradient-speed": `${props.speed}s`,
    "--rb-gradient-alternate": props.yoyo ? "alternate" : "normal",
    animationPlayState: context.reducedMotion ? "paused" : undefined,
  });
}

export type GlitchTextProps = { speed: number; enableShadows: boolean; enableOnHover: boolean; backgroundColor: string };
export function GlitchTextEffect({ props, context, children }: EffectComponentProps<GlitchTextProps>) {
  const text = plainText(children);
  return decorateRoot(children, `rb-glitch-text${props.enableOnHover ? " rb-glitch-hover" : ""}`, {
    "--rb-glitch-after-duration": `${props.speed * 3}s`,
    "--rb-glitch-before-duration": `${props.speed * 2}s`,
    "--rb-glitch-after-shadow": props.enableShadows ? "-5px 0 #ff003c" : "none",
    "--rb-glitch-before-shadow": props.enableShadows ? "5px 0 #00e5ff" : "none",
    "--rb-glitch-background": props.backgroundColor,
    animationPlayState: context.reducedMotion ? "paused" : undefined,
  }, { "data-rb-text": text });
}

export type DecryptedTextProps = { speed: number; maxIterations: number; sequential: boolean; revealDirection: string; characters: string; animateOn: string };
export function DecryptedTextEffect({ props, context, children }: EffectComponentProps<DecryptedTextProps>) {
  const original = plainText(children);
  const [display, setDisplay] = useState(original);
  const [active, setActive] = useState(props.animateOn === "view" && !context.reducedMotion);
  const alphabet = useMemo(() => props.characters || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", [props.characters]);
  const iteration = useRef(0);

  useEffect(() => { setDisplay(original); iteration.current = 0; }, [original]);
  useEffect(() => {
    if (!active || context.reducedMotion) return;
    const timer = window.setInterval(() => {
      iteration.current += 1;
      const centerOrder = Array.from({ length: original.length }, (_, index) => index).sort((a, b) => Math.abs(a - Math.floor(original.length / 2)) - Math.abs(b - Math.floor(original.length / 2)));
      setDisplay(original.split("").map((char, index) => {
        if (char === " ") return char;
        const revealIndex = props.revealDirection === "end" ? original.length - index - 1 : props.revealDirection === "center" ? centerOrder.indexOf(index) : index;
        if (props.sequential && revealIndex < iteration.current) return char;
        if (!props.sequential && iteration.current >= props.maxIterations) return char;
        return alphabet[Math.floor(Math.random() * alphabet.length)] ?? char;
      }).join(""));
      const completeAfter = props.sequential ? original.length : props.maxIterations;
      if (iteration.current >= completeAfter) { window.clearInterval(timer); setDisplay(original); setActive(false); }
    }, props.speed);
    return () => window.clearInterval(timer);
  }, [active, alphabet, context.reducedMotion, original, props.maxIterations, props.revealDirection, props.sequential, props.speed]);

  const trigger = () => { iteration.current = 0; setActive(true); };
  return <span className="rb-decrypted-wrapper" onMouseEnter={props.animateOn === "hover" ? trigger : undefined} onClick={props.animateOn === "click" ? trigger : undefined}>{replaceRootText(children, display)}</span>;
}

export type MagnetProps = { padding: number; magnetStrength: number; activeDuration: number; inactiveDuration: number };
export function MagnetEffect({ props, context, children }: EffectComponentProps<MagnetProps>) {
  const host = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (context.reducedMotion) { setPosition({ x: 0, y: 0 }); return; }
    const move = (event: MouseEvent) => {
      const rect = host.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2, centerY = rect.top + rect.height / 2;
      if (Math.abs(centerX - event.clientX) < rect.width / 2 + props.padding && Math.abs(centerY - event.clientY) < rect.height / 2 + props.padding) {
        setActive(true); setPosition({ x: (event.clientX - centerX) / props.magnetStrength, y: (event.clientY - centerY) / props.magnetStrength });
      } else { setActive(false); setPosition({ x: 0, y: 0 }); }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [context.reducedMotion, props.magnetStrength, props.padding]);
  return <span ref={host} className="rb-magnet"><span style={{ display: "inline-flex", transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: `transform ${active ? props.activeDuration : props.inactiveDuration}s ${active ? "ease-out" : "ease-in-out"}`, willChange: "transform" }}>{children}</span></span>;
}

export type StarBorderProps = { color: string; speed: number; thickness: number; backgroundColor: string; textColor: string; borderColor: string; radius: number };
export function StarBorderEffect({ props, context, children }: EffectComponentProps<StarBorderProps>) {
  const vars: StyleVars = { "--rb-star-color": props.color, "--rb-star-speed": `${props.speed}s`, "--rb-star-thickness": `${props.thickness}px`, "--rb-star-background": props.backgroundColor, "--rb-star-text": props.textColor, "--rb-star-border": props.borderColor, "--rb-star-radius": `${props.radius}px`, animationPlayState: context.reducedMotion ? "paused" : undefined };
  return <span className="rb-star-border" style={vars}><span className="rb-star-bottom"/><span className="rb-star-top"/><span className="rb-star-content">{children}</span></span>;
}

export type SplitTextProps = { delay: number; duration: number; fromY: number; blur: number; splitBy: string };
export function SplitTextEffect({ props, context, children }: EffectComponentProps<SplitTextProps>) {
  const text = plainText(children);
  const parts = props.splitBy === "words" ? text.split(/(\s+)/) : Array.from(text);
  const content = parts.map((part, index) => <span key={`${part}-${index}`} className="rb-split-piece" style={{ "--rb-piece-delay": `${context.reducedMotion ? 0 : index * props.delay}ms`, "--rb-piece-duration": `${context.reducedMotion ? 0 : props.duration}s`, "--rb-piece-y": `${props.fromY}px`, "--rb-piece-blur": `${props.blur}px` } as StyleVars}>{part}</span>);
  return replaceRootContent(children, content);
}

export type BlurTextProps = { delay: number; duration: number; blur: number; direction: string; animateBy: string };
export function BlurTextEffect({ props, context, children }: EffectComponentProps<BlurTextProps>) {
  const text = plainText(children);
  const parts = props.animateBy === "letters" ? Array.from(text) : text.split(/(\s+)/);
  const content = parts.map((part, index) => <span key={`${part}-${index}`} className="rb-blur-piece" style={{ "--rb-piece-delay": `${context.reducedMotion ? 0 : index * props.delay}ms`, "--rb-piece-duration": `${context.reducedMotion ? 0 : props.duration}s`, "--rb-piece-blur": `${props.blur}px`, "--rb-piece-y": `${props.direction === "bottom" ? -20 : 20}px` } as StyleVars}>{part}</span>);
  return replaceRootContent(children, content);
}

export type RotatingTextProps = { texts: string; rotationInterval: number; transitionDuration: number; loop: boolean };
export function RotatingTextEffect({ props, context, children }: EffectComponentProps<RotatingTextProps>) {
  const fallback = plainText(children);
  const texts = useMemo(() => props.texts.split("|").map(value => value.trim()).filter(Boolean), [props.texts]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (context.reducedMotion || texts.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => props.loop ? (current + 1) % texts.length : Math.min(current + 1, texts.length - 1)), props.rotationInterval);
    return () => window.clearInterval(timer);
  }, [context.reducedMotion, props.loop, props.rotationInterval, texts.length]);
  return replaceRootContent(children, <span key={index} className="rb-rotating-text" style={{ "--rb-rotate-duration": `${context.reducedMotion ? 0 : props.transitionDuration}s` } as StyleVars}>{texts[index] ?? fallback}</span>);
}

export type TrueFocusProps = { manualMode: boolean; blurAmount: number; borderColor: string; animationDuration: number; pauseBetweenAnimations: number };
export function TrueFocusEffect({ props, context, children }: EffectComponentProps<TrueFocusProps>) {
  const fallback = plainText(children);
  const words = useMemo(() => fallback.split(/\s+/), [fallback]);
  const [focus, setFocus] = useState(0);
  useEffect(() => {
    if (context.reducedMotion || props.manualMode || words.length < 2) return;
    const timer = window.setInterval(() => setFocus(current => (current + 1) % words.length), (props.animationDuration + props.pauseBetweenAnimations) * 1000);
    return () => window.clearInterval(timer);
  }, [context.reducedMotion, props.animationDuration, props.manualMode, props.pauseBetweenAnimations, words.length]);
  const content = <span className="rb-true-focus" style={{ "--rb-focus-blur": `${props.blurAmount}px`, "--rb-focus-color": props.borderColor, "--rb-focus-duration": `${props.animationDuration}s` } as StyleVars}>{words.map((word, index) => <span key={`${word}-${index}`} className={index === focus ? "is-focused" : undefined} onMouseEnter={props.manualMode ? () => setFocus(index) : undefined}>{word}{index < words.length - 1 ? " " : ""}</span>)}</span>;
  return replaceRootContent(children, content);
}

export type GlareHoverProps = { glareColor: string; glareOpacity: number; glareAngle: number; glareSize: number; transitionDuration: number; playOnce: boolean };
export function GlareHoverEffect({ props, context, children }: EffectComponentProps<GlareHoverProps>) {
  return <span className={`rb-glare-hover${props.playOnce ? " rb-glare-once" : ""}`} style={{ "--rb-glare-color": props.glareColor, "--rb-glare-opacity": props.glareOpacity, "--rb-glare-angle": `${props.glareAngle}deg`, "--rb-glare-size": `${props.glareSize}%`, "--rb-glare-duration": `${context.reducedMotion ? 0 : props.transitionDuration}s` } as StyleVars}>{children}</span>;
}

export type ClickSparkProps = { sparkColor: string; sparkSize: number; sparkRadius: number; sparkCount: number; duration: number };
type Spark = { angle: number; started: number };
export function ClickSparkEffect({ props, context, children }: EffectComponentProps<ClickSparkProps>) {
  const host = useRef<HTMLSpanElement>(null), canvas = useRef<HTMLCanvasElement>(null), sparks = useRef<Spark[]>([]), point = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const target = canvas.current, parent = host.current;
    if (!target || !parent) return;
    const resize = () => { const rect = parent.getBoundingClientRect(); target.width = Math.max(1, Math.ceil(rect.width)); target.height = Math.max(1, Math.ceil(rect.height)); };
    resize(); const observer = new ResizeObserver(resize); observer.observe(parent);
    let frame = 0;
    const draw = (time: number) => {
      const ctx = target.getContext("2d"); if (!ctx) return;
      ctx.clearRect(0, 0, target.width, target.height); ctx.strokeStyle = props.sparkColor; ctx.lineWidth = 2; ctx.lineCap = "round";
      sparks.current = sparks.current.filter(spark => time - spark.started < props.duration);
      for (const spark of sparks.current) { const progress = (time - spark.started) / props.duration; const distance = progress * props.sparkRadius; const x = point.current.x + Math.cos(spark.angle) * distance, y = point.current.y + Math.sin(spark.angle) * distance; ctx.globalAlpha = 1 - progress; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.cos(spark.angle) * props.sparkSize, y - Math.sin(spark.angle) * props.sparkSize); ctx.stroke(); }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [props.duration, props.sparkColor, props.sparkRadius, props.sparkSize]);
  const click = (event: ReactMouseEvent<HTMLSpanElement>) => { if (context.reducedMotion) return; const rect = host.current?.getBoundingClientRect(); if (!rect) return; point.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; const now = performance.now(); sparks.current = Array.from({ length: props.sparkCount }, (_, index) => ({ angle: (Math.PI * 2 * index) / props.sparkCount, started: now })); };
  return <span ref={host} className="rb-click-spark" onClick={click}>{children}<canvas ref={canvas} aria-hidden="true"/></span>;
}

export type TextTypeProps = { alternatives: string; typingSpeed: number; deletingSpeed: number; pauseDuration: number; initialDelay: number; loop: boolean; showCursor: boolean; cursorCharacter: string; cursorBlinkDuration: number };
export function TextTypeEffect({ props, context, children }: EffectComponentProps<TextTypeProps>) {
  const original = plainText(children);
  const phrases = useMemo(() => [original, ...props.alternatives.split("|").map(value => value.trim()).filter(value => value && value !== original)], [original, props.alternatives]);
  const [phrase, setPhrase] = useState(0), [count, setCount] = useState(context.reducedMotion ? original.length : 0), [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (context.reducedMotion) { setCount(original.length); return; }
    const current = phrases[phrase] ?? original;
    const complete = count === current.length;
    const empty = count === 0;
    const delay = complete && !deleting ? props.pauseDuration : phrase === 0 && count === 0 && !deleting ? props.initialDelay : deleting ? props.deletingSpeed : props.typingSpeed;
    const timer = window.setTimeout(() => {
      if (complete && !deleting) return setDeleting(true);
      if (empty && deleting) { setDeleting(false); setPhrase(index => props.loop ? (index + 1) % phrases.length : Math.min(index + 1, phrases.length - 1)); return; }
      setCount(value => value + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [context.reducedMotion, count, deleting, original, phrase, phrases, props.deletingSpeed, props.initialDelay, props.loop, props.pauseDuration, props.typingSpeed]);
  const shown = (phrases[phrase] ?? original).slice(0, count);
  return replaceRootContent(children, <>{shown}{props.showCursor ? <span className="rb-type-cursor" style={{ "--rb-cursor-speed": `${props.cursorBlinkDuration}s` } as StyleVars}>{props.cursorCharacter}</span> : null}</>);
}

export type ScrambledTextProps = { radius: number; duration: number; speed: number; scrambleChars: string };
export function ScrambledTextEffect({ props, context, children }: EffectComponentProps<ScrambledTextProps>) {
  const original = plainText(children), host = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(original);
  const timeout = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timeout.current), []);
  const move = (event: ReactMouseEvent<HTMLSpanElement>) => {
    if (context.reducedMotion || !host.current) return;
    const rect = host.current.getBoundingClientRect(), x = event.clientX - rect.left;
    setText(Array.from(original).map((char, index) => {
      if (char === " ") return char;
      const charX = ((index + .5) / Math.max(1, original.length)) * rect.width;
      return Math.abs(charX - x) < props.radius ? props.scrambleChars[Math.floor(Math.random() * props.scrambleChars.length)] ?? char : char;
    }).join(""));
    window.clearTimeout(timeout.current); timeout.current = window.setTimeout(() => setText(original), props.duration * 1000 * Math.max(.1, props.speed));
  };
  return <span ref={host} className="rb-scrambled-text" onMouseMove={move} onMouseLeave={() => setText(original)}>{replaceRootText(children, text)}</span>;
}

export type FuzzyTextProps = { color: string; enableHover: boolean; baseIntensity: number; hoverIntensity: number; fuzzRange: number; direction: string; fps: number };
export function FuzzyTextEffect({ props, context, children }: EffectComponentProps<FuzzyTextProps>) {
  return decorateRoot(children, `rb-fuzzy-text${props.enableHover ? " rb-fuzzy-hover" : ""}`, { color: props.color, "--rb-fuzzy-base": `${props.baseIntensity * props.fuzzRange}px`, "--rb-fuzzy-hover": `${props.hoverIntensity * props.fuzzRange}px`, "--rb-fuzzy-speed": `${Math.max(.03, 1 / props.fps)}s`, "--rb-fuzzy-x": props.direction === "vertical" ? "0px" : "var(--rb-fuzzy-base)", "--rb-fuzzy-y": props.direction === "horizontal" ? "0px" : "var(--rb-fuzzy-base)", animationPlayState: context.reducedMotion ? "paused" : undefined });
}

export type CircularTextProps = { spinDuration: number; onHover: string; size: number; radius: number };
export function CircularTextEffect({ props, context, children }: EffectComponentProps<CircularTextProps>) {
  const letters = Array.from(plainText(children));
  const ring = <span className={`rb-circular-text rb-circular-${props.onHover}`} style={{ width: props.size, height: props.size, "--rb-circle-radius": `${props.radius}px`, "--rb-spin-duration": `${context.reducedMotion ? 0 : props.spinDuration}s` } as StyleVars}>{letters.map((letter,index)=><span key={`${letter}-${index}`} style={{ transform:`rotate(${(360/Math.max(1,letters.length))*index}deg) translateY(${Math.max(0, (props.size / 2) - props.radius)}px)` }}>{letter === " " ? "\u00a0" : letter}</span>)}</span>;
  return replaceRootContent(children, ring);
}

export type ElectricBorderProps = { color: string; speed: number; chaos: number; borderRadius: number; thickness: number };
export function ElectricBorderEffect({ props, context, children }: EffectComponentProps<ElectricBorderProps>) {
  return <span className="rb-electric-border" style={{ "--rb-electric-color": props.color, "--rb-electric-speed": `${context.reducedMotion ? 0 : props.speed}s`, "--rb-electric-chaos": `${props.chaos * 20}px`, "--rb-electric-radius": `${props.borderRadius}px`, "--rb-electric-thickness": `${props.thickness}px` } as StyleVars}><span className="rb-electric-content">{children}</span></span>;
}

export type PixelTransitionProps = { hoverText: string; gridSize: number; pixelColor: string; animationDuration: number; activeColor: string; once: boolean };
export function PixelTransitionEffect({ props, context, children }: EffectComponentProps<PixelTransitionProps>) {
  const pixels = Children.toArray(Array.from({length:props.gridSize*props.gridSize},(_,index)=><i key={index} style={{ "--rb-pixel-index": index } as StyleVars}/>));
  return <span className={`rb-pixel-transition${props.once ? " rb-pixel-once" : ""}`} style={{ "--rb-pixel-grid": props.gridSize, "--rb-pixel-color": props.pixelColor, "--rb-pixel-duration": `${context.reducedMotion ? 0 : props.animationDuration}s`, "--rb-pixel-active": props.activeColor } as StyleVars}><span className="rb-pixel-base">{children}</span><span className="rb-pixel-grid" aria-hidden="true">{pixels}</span><span className="rb-pixel-label" aria-hidden="true">{props.hoverText}</span></span>;
}

export type TextPressureProps = { width: boolean; weight: boolean; italic: boolean; stroke: boolean; textColor: string; strokeColor: string; radius: number };
export function TextPressureEffect({ props, context, children }: EffectComponentProps<TextPressureProps>) {
  const text = plainText(children), host = useRef<HTMLSpanElement>(null), [pointer, setPointer] = useState(.5);
  const move = (event: ReactMouseEvent<HTMLSpanElement>) => { const rect=host.current?.getBoundingClientRect(); if(rect&&!context.reducedMotion)setPointer(Math.max(0,Math.min(1,(event.clientX-rect.left)/(rect.width||1)))); };
  const content=<span ref={host} className="rb-text-pressure" onMouseMove={move} onMouseLeave={()=>setPointer(.5)} style={{color:props.textColor,"--rb-pressure-stroke":props.stroke?props.strokeColor:"transparent"} as StyleVars}>{Array.from(text).map((letter,index)=>{const location=index/Math.max(1,text.length-1), influence=Math.max(0,1-Math.abs(location-pointer)*props.radius);return <span key={`${letter}-${index}`} style={{fontVariationSettings:`'wght' ${props.weight?300+influence*700:700}, 'wdth' ${props.width?75+influence*75:100}, 'ital' ${props.italic?influence:0}`}}>{letter===" "?"\u00a0":letter}</span>;})}</span>;
  return replaceRootContent(children,content);
}

export type VariableProximityProps = { radius:number; falloff:string; fromWeight:number; toWeight:number; fromWidth:number; toWidth:number };
export function VariableProximityEffect({props,context,children}:EffectComponentProps<VariableProximityProps>){
  const text=plainText(children),host=useRef<HTMLSpanElement>(null),[pointer,setPointer]=useState(.5);
  const move=(event:ReactMouseEvent<HTMLSpanElement>)=>{const rect=host.current?.getBoundingClientRect();if(rect&&!context.reducedMotion)setPointer((event.clientX-rect.left)/(rect.width||1));};
  const content=<span ref={host} className="rb-variable-proximity" onMouseMove={move} onMouseLeave={()=>setPointer(-10)}>{Array.from(text).map((letter,index)=>{const distance=Math.abs(index/Math.max(1,text.length-1)-pointer)*((host.current?.clientWidth)||300),raw=Math.max(0,1-distance/props.radius),influence=props.falloff==="exponential"?raw*raw:props.falloff==="gaussian"?Math.exp(-4*(1-raw)*(1-raw))*raw:raw;return <span key={`${letter}-${index}`} style={{fontVariationSettings:`'wght' ${props.fromWeight+(props.toWeight-props.fromWeight)*influence}, 'wdth' ${props.fromWidth+(props.toWidth-props.fromWidth)*influence}`}}>{letter===" "?"\u00a0":letter}</span>;})}</span>;
  return replaceRootContent(children,content);
}

export type CurvedLoopProps={speed:number;curveAmount:number;direction:string;interactive:boolean;height:number};
export function CurvedLoopEffect({props,context,children}:EffectComponentProps<CurvedLoopProps>){const text=plainText(children).trim()+" \u00a0 ",repeated=text.repeat(12),id=`rb-curve-${context.nodeId.replace(/[^a-z0-9_-]/gi,"-")}`;return replaceRootContent(children,<svg className={`rb-curved-loop${props.interactive?" rb-curved-interactive":""}`} viewBox={`0 0 1200 ${props.height}`} height={props.height} role="img" aria-label={plainText(children)} style={{"--rb-curve-speed":`${context.reducedMotion?0:Math.max(4,30/Math.max(.1,props.speed))}s`} as StyleVars}><defs><path id={id} d={`M-100,40 Q500,${40+props.curveAmount} 1300,40`}/></defs><text><textPath href={`#${id}`}><tspan className={props.direction==="right"?"rb-curve-right":undefined}>{repeated}</tspan></textPath></text></svg>);}

export type CountUpProps={from:number;target:number;duration:number;delay:number;direction:string;separator:string;decimals:number};
export function CountUpEffect({props,context,children}:EffectComponentProps<CountUpProps>){const parsed=Number(plainText(children).replace(/[^0-9.-]/g,"")),target=Number.isFinite(parsed)?parsed:props.target,[value,setValue]=useState(props.direction==="down"?target:props.from);useEffect(()=>{if(context.reducedMotion){setValue(target);return;}let frame=0,start=0;const timeout=window.setTimeout(()=>{const step=(time:number)=>{if(!start)start=time;const progress=Math.min(1,(time-start)/(props.duration*1000)),eased=1-Math.pow(1-progress,3),from=props.direction==="down"?target:props.from,to=props.direction==="down"?props.from:target;setValue(from+(to-from)*eased);if(progress<1)frame=requestAnimationFrame(step);};frame=requestAnimationFrame(step);},props.delay*1000);return()=>{window.clearTimeout(timeout);cancelAnimationFrame(frame);};},[context.reducedMotion,props.delay,props.direction,props.duration,props.from,target]);const formatted=new Intl.NumberFormat("en-US",{useGrouping:Boolean(props.separator),minimumFractionDigits:props.decimals,maximumFractionDigits:props.decimals}).format(value).replace(/,/g,props.separator);return replaceRootText(children,formatted);}

export type SpecularButtonProps={radius:number;tint:string;tintOpacity:number;textColor:string;lineColor:string;baseColor:string;intensity:number;shineSize:number;speed:number;followMouse:boolean};
export function SpecularButtonEffect({props,context,children}:EffectComponentProps<SpecularButtonProps>){const host=useRef<HTMLSpanElement>(null),[angle,setAngle]=useState(0);const move=(event:ReactMouseEvent<HTMLSpanElement>)=>{const rect=host.current?.getBoundingClientRect();if(rect&&props.followMouse&&!context.reducedMotion)setAngle(Math.atan2(event.clientY-(rect.top+rect.height/2),event.clientX-(rect.left+rect.width/2))*180/Math.PI);};return <span ref={host} className="rb-specular-button" onMouseMove={move} style={{"--rb-specular-radius":`${props.radius}px`,"--rb-specular-tint":props.tint,"--rb-specular-tint-opacity":props.tintOpacity,"--rb-specular-text":props.textColor,"--rb-specular-line":props.lineColor,"--rb-specular-base":props.baseColor,"--rb-specular-intensity":props.intensity,"--rb-specular-size":`${props.shineSize}%`,"--rb-specular-speed":`${context.reducedMotion?0:props.speed}s`,"--rb-specular-angle":`${angle}deg`} as StyleVars}><span>{children}</span></span>;}

export type BorderGlowProps={edgeSensitivity:number;glowColor:string;backgroundColor:string;borderRadius:number;glowRadius:number;glowIntensity:number;coneSpread:number;animated:boolean;color1:string;color2:string;color3:string;fillOpacity:number};
export function BorderGlowEffect({props,context,children}:EffectComponentProps<BorderGlowProps>){const host=useRef<HTMLSpanElement>(null),[point,setPoint]=useState({x:50,y:50});const move=(event:ReactMouseEvent<HTMLSpanElement>)=>{const rect=host.current?.getBoundingClientRect();if(rect&&!context.reducedMotion)setPoint({x:(event.clientX-rect.left)/rect.width*100,y:(event.clientY-rect.top)/rect.height*100});};return <span ref={host} onMouseMove={move} className={`rb-border-glow${props.animated?" rb-border-glow-animated":""}`} style={{"--rb-glow-x":`${point.x}%`,"--rb-glow-y":`${point.y}%`,"--rb-glow-color":props.glowColor,"--rb-glow-background":props.backgroundColor,"--rb-glow-radius":`${props.borderRadius}px`,"--rb-glow-size":`${props.glowRadius}px`,"--rb-glow-intensity":props.glowIntensity,"--rb-glow-cone":`${props.coneSpread}%`,"--rb-glow-fill":props.fillOpacity,"--rb-glow-c1":props.color1,"--rb-glow-c2":props.color2,"--rb-glow-c3":props.color3} as StyleVars}><span>{children}</span></span>;}
