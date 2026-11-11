"use client";

/* React Bits Particles, adapted only for renderer lifecycle and reduced motion. */
import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

export interface ParticlesProps { particleCount?: number; particleSpread?: number; speed?: number; particleColors?: string[]; moveParticlesOnHover?: boolean; particleHoverFactor?: number; alphaParticles?: boolean; particleBaseSize?: number; sizeRandomness?: number; cameraDistance?: number; disableRotation?: boolean; pixelRatio?: number; reducedMotion?: boolean }

const vertex = `attribute vec3 position;attribute vec4 random;attribute vec3 color;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpread;uniform float uBaseSize;uniform float uSizeRandomness;varying vec4 vRandom;varying vec3 vColor;void main(){vRandom=random;vColor=color;vec3 pos=position*uSpread;pos.z*=10.0;vec4 mPos=modelMatrix*vec4(pos,1.0);float t=uTime;mPos.x+=sin(t*random.z+6.28*random.w)*mix(.1,1.5,random.x);mPos.y+=sin(t*random.y+6.28*random.x)*mix(.1,1.5,random.w);mPos.z+=sin(t*random.w+6.28*random.y)*mix(.1,1.5,random.z);vec4 mvPos=viewMatrix*mPos;gl_PointSize=uSizeRandomness==0.0?uBaseSize:(uBaseSize*(1.0+uSizeRandomness*(random.x-.5)))/length(mvPos.xyz);gl_Position=projectionMatrix*mvPos;}`;
const fragment = `precision highp float;uniform float uTime;uniform float uAlphaParticles;varying vec4 vRandom;varying vec3 vColor;void main(){vec2 uv=gl_PointCoord.xy;float d=length(uv-vec2(.5));if(uAlphaParticles<.5){if(d>.5)discard;gl_FragColor=vec4(vColor+.2*sin(uv.yxx+uTime+vRandom.y*6.28),1.0);}else{float circle=smoothstep(.5,.4,d)*.8;gl_FragColor=vec4(vColor+.2*sin(uv.yxx+uTime+vRandom.y*6.28),circle);}}`;
const rgb = (hex: string): [number, number, number] => { let value = hex.replace(/^#/, ""); if (value.length === 3) value = value.split("").map((c) => c + c).join(""); const number = Number.parseInt(value.slice(0, 6), 16); return [((number >> 16) & 255) / 255, ((number >> 8) & 255) / 255, (number & 255) / 255]; };

export default function Particles({ particleCount = 200, particleSpread = 10, speed = .1, particleColors = ["#ffffff"], moveParticlesOnHover = false, particleHoverFactor = 1, alphaParticles = false, particleBaseSize = 100, sizeRandomness = 1, cameraDistance = 20, disableRotation = false, pixelRatio = 1, reducedMotion = false }: ParticlesProps) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container || navigator.userAgent.toLowerCase().includes("jsdom")) return;
    let renderer: Renderer;
    try { renderer = new Renderer({ dpr: pixelRatio, depth: false, alpha: true }); } catch { return; }
    const gl = renderer.gl; container.appendChild(gl.canvas); gl.clearColor(0, 0, 0, 0);
    const camera = new Camera(gl, { fov: 15 }); camera.position.set(0, 0, cameraDistance);
    const resize = () => { renderer.setSize(container.clientWidth || 1, container.clientHeight || 1); camera.perspective({ aspect: gl.canvas.width / gl.canvas.height }); };
    const mouse = { x: 0, y: 0 };
    const move = (event: PointerEvent) => { const rect = container.getBoundingClientRect(); mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1); };
    window.addEventListener("resize", resize); if (moveParticlesOnHover && !reducedMotion) container.addEventListener("pointermove", move); resize();
    const positions = new Float32Array(particleCount * 3), randoms = new Float32Array(particleCount * 4), colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) { let x=0,y=0,z=0,length=0; do { x=Math.random()*2-1;y=Math.random()*2-1;z=Math.random()*2-1;length=x*x+y*y+z*z; } while (length>1||length===0); const radius=Math.cbrt(Math.random()); positions.set([x*radius,y*radius,z*radius],i*3); randoms.set([Math.random(),Math.random(),Math.random(),Math.random()],i*4); colors.set(rgb(particleColors[Math.floor(Math.random()*particleColors.length)] ?? "#ffffff"),i*3); }
    const geometry = new Geometry(gl, { position: { size: 3, data: positions }, random: { size: 4, data: randoms }, color: { size: 3, data: colors } });
    const program = new Program(gl, { vertex, fragment, uniforms: { uTime: { value: 0 }, uSpread: { value: particleSpread }, uBaseSize: { value: particleBaseSize * pixelRatio }, uSizeRandomness: { value: sizeRandomness }, uAlphaParticles: { value: alphaParticles ? 1 : 0 } }, transparent: true, depthTest: false });
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program }); let frame=0,last=performance.now(),elapsed=0;
    const draw = (time: number) => { const delta=time-last;last=time;if(!reducedMotion)elapsed+=delta*speed;program.uniforms.uTime.value=elapsed*.001;if(moveParticlesOnHover&&!reducedMotion){particles.position.x=-mouse.x*particleHoverFactor;particles.position.y=-mouse.y*particleHoverFactor;}if(!disableRotation&&!reducedMotion){particles.rotation.x=Math.sin(elapsed*.0002)*.1;particles.rotation.y=Math.cos(elapsed*.0005)*.15;particles.rotation.z+=.01*speed;}renderer.render({scene:particles,camera});if(!reducedMotion)frame=requestAnimationFrame(draw); };
    frame=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame);window.removeEventListener("resize",resize);container.removeEventListener("pointermove",move);if(container.contains(gl.canvas))container.removeChild(gl.canvas);gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [particleCount,particleSpread,speed,particleColors,moveParticlesOnHover,particleHoverFactor,alphaParticles,particleBaseSize,sizeRandomness,cameraDistance,disableRotation,pixelRatio,reducedMotion]);
  return <div ref={host} className="absolute inset-0 overflow-hidden bg-[#0c0a12]" data-reactbits-background="particles" />;
}
