"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragments = {
  aurora: `precision highp float;uniform vec2 r;uniform float t;uniform vec3 a;uniform vec3 b;uniform float intensity;uniform float blend;
vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
void main(){vec2 uv=gl_FragCoord.xy/r;vec3 ramp=uv.x<.5?mix(a,b,uv.x*2.):mix(b,a,(uv.x-.5)*2.);float height=snoise(vec2(uv.x*2.+t*.1,t*.25))*.5*intensity;height=exp(height);height=uv.y*2.-height+.2;float strength=.6*height;float alpha=smoothstep(.2-blend*.5,.2+blend*.5,strength);gl_FragColor=vec4(strength*ramp*alpha,alpha);}`,
  threads: `precision highp float;
uniform vec2 r; uniform vec2 mouse; uniform float t; uniform vec3 a; uniform float intensity; uniform float distance;
const float lineBlur=10.0;
vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
float perlin(vec2 P){vec2 Pi=floor(P);vec4 Pf=P.xyxy-vec4(Pi,Pi+1.0);vec4 Pt=vec4(Pi.xy,Pi.xy+1.0);Pt=Pt-floor(Pt*(1.0/71.0))*71.0;Pt+=vec2(26.0,161.0).xyxy;Pt*=Pt;Pt=Pt.xzxz*Pt.yyww;vec4 hx=fract(Pt*(1.0/951.135664));vec4 hy=fract(Pt*(1.0/642.949883));vec4 gx=hx-.49999;vec4 gy=hy-.49999;vec4 g=inversesqrt(gx*gx+gy*gy)*(gx*Pf.xzxz+gy*Pf.yyww);g*=1.414213562373095;vec2 blend=Pf.xy*Pf.xy*Pf.xy*(Pf.xy*(Pf.xy*6.0-15.0)+10.0);vec4 b=vec4(blend,vec2(1.0-blend));return dot(g,b.zxzx*b.wwyy);}
float pixel(float count){return (1.0/max(r.x,r.y))*count;}
float lineFn(vec2 st,float width,float perc){float splitPoint=.1+perc*.4;float ampNormal=smoothstep(splitPoint,.7,st.x);float finalAmp=ampNormal*.5*intensity*(1.0+(mouse.y-.5)*.2);float scaled=t/10.0+(mouse.x-.5);float blur=smoothstep(splitPoint,splitPoint+.05,st.x)*perc;float xnoise=mix(perlin(vec2(scaled,st.x+perc)*2.5),perlin(vec2(scaled,st.x+scaled)*3.5)/1.5,st.x*.3);float y=.5+(perc-.5)*distance+xnoise*.5*finalAmp;float start=smoothstep(y+width*.5+lineBlur*pixel(1.0)*blur,y,st.y);float end=smoothstep(y,y-width*.5-lineBlur*pixel(1.0)*blur,st.y);return clamp((start-end)*(1.0-smoothstep(0.0,1.0,pow(perc,.3))),0.0,1.0);}
void main(){vec2 uv=gl_FragCoord.xy/r;float strength=1.0;for(int i=0;i<40;i++){float p=float(i)/40.0;strength*=1.0-lineFn(uv,7.0*pixel(1.0)*(1.0-p),p);}float value=1.0-strength;gl_FragColor=vec4(a*value,value);}`,
  rays: `precision highp float;uniform vec2 r;uniform vec2 mouse;uniform float mouseStrength;uniform float t;uniform vec3 a;uniform float speed;uniform float intensity;uniform float rayLength;uniform float fadeDistance;
float rayStrength(vec2 source,vec2 direction,vec2 coord,float seedA,float seedB,float velocity){vec2 delta=coord-source;vec2 norm=normalize(delta);float angle=dot(norm,direction);float spread=pow(max(angle,0.),1./max(intensity,.001));float dist=length(delta);float maximum=r.x*rayLength;float lengthFalloff=clamp((maximum-dist)/maximum,0.,1.);float fade=clamp((r.x*fadeDistance-dist)/(r.x*fadeDistance),.5,1.);float base=clamp((.45+.15*sin(angle*seedA+t*velocity))+(.3+.2*cos(-angle*seedB+t*velocity)),0.,1.);return base*lengthFalloff*fade*spread;}
void main(){vec2 coord=vec2(gl_FragCoord.x,r.y-gl_FragCoord.y);vec2 source=vec2(.5*r.x,-.2*r.y);vec2 direction=vec2(0.,1.);if(mouseStrength>0.){vec2 mouseDirection=normalize(mouse*r-source);direction=normalize(mix(direction,mouseDirection,mouseStrength));}float value=rayStrength(source,direction,coord,36.2214,21.11349,1.5*speed)*.5+rayStrength(source,direction,coord,22.3991,18.0234,1.1*speed)*.4;float brightness=1.-coord.y/r.y;vec3 color=a*value*vec3(.1+brightness*.8,.3+brightness*.6,.5+brightness*.5);gl_FragColor=vec4(color,value);}`,
} as const;

export function ShaderBackground({ mode, colorA, colorB = colorA, speed = 1, intensity, blend = 0.5, distance = 0, rayLength = 2, fadeDistance = 1, pointerStrength = 1, reducedMotion }: { mode: keyof typeof fragments; colorA: string; colorB?: string; speed?: number; intensity: number; blend?: number; distance?: number; rayLength?: number; fadeDistance?: number; pointerStrength?: number; reducedMotion: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    // JSDOM has a canvas element but no WebGL context. The public renderer keeps
    // the dark static base visible when the runtime cannot initialize WebGL.
    if (typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("jsdom")) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, dpr: Math.min(devicePixelRatio || 1, 2) });
    } catch {
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    const program = new Program(gl, { vertex, fragment: fragments[mode], transparent: true, uniforms: { r: { value: [1, 1] }, mouse: { value: [0.5, 0.5] }, mouseStrength: { value: reducedMotion ? 0 : pointerStrength }, t: { value: 0 }, a: { value: hex(colorA) }, b: { value: hex(colorB) }, speed: { value: speed }, intensity: { value: intensity }, blend: { value: blend }, distance: { value: distance }, rayLength: { value: rayLength }, fadeDistance: { value: fadeDistance } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => { renderer.setSize(container.clientWidth || 1, container.clientHeight || 1); program.uniforms.r.value = [gl.canvas.width, gl.canvas.height]; };
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(container);
    let targetMouse: [number, number] = [0.5, 0.5];
    const currentMouse: [number, number] = [0.5, 0.5];
    const move = (event: PointerEvent) => { targetMouse = normalizedPointer(event.clientX, event.clientY, container.getBoundingClientRect()); };
    if (!reducedMotion && pointerStrength > 0) window.addEventListener("pointermove", move, { passive: true });
    resize();
    let frame = 0;
    const draw = (time: number) => { currentMouse[0] += .05 * (targetMouse[0] - currentMouse[0]); currentMouse[1] += .05 * (targetMouse[1] - currentMouse[1]); program.uniforms.mouse.value = currentMouse; program.uniforms.t.value = reducedMotion ? 0 : time * 0.001 * speed; renderer.render({ scene: mesh }); if (!reducedMotion) frame = requestAnimationFrame(draw); };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("pointermove", move); if (container.contains(gl.canvas)) container.removeChild(gl.canvas); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [mode, colorA, colorB, speed, intensity, blend, distance, rayLength, fadeDistance, pointerStrength, reducedMotion]);
  return <div ref={host} className="absolute inset-0 h-full w-full bg-[#0c0a12]" data-reactbits-background={mode} data-motion={reducedMotion ? "reduced" : "full"} />;
}

export function normalizedPointer(clientX: number, clientY: number, bounds: Pick<DOMRect, "left" | "top" | "width" | "height">): [number, number] {
  const x = bounds.width > 0 ? (clientX - bounds.left) / bounds.width : 0.5;
  const y = bounds.height > 0 ? 1 - (clientY - bounds.top) / bounds.height : 0.5;
  return [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))];
}

function hex(value: string): [number, number, number] {
  const full = value.length === 4 ? value.slice(1).split("").map((part) => part + part).join("") : value.slice(1);
  return [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16) / 255) as [number, number, number];
}
