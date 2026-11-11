"use client";

/* React Bits Silk, adapted only for renderer lifecycle and reduced motion. */
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { Color, Mesh, ShaderMaterial, type IUniform } from "three";

interface SilkUniforms { uSpeed: IUniform<number>; uScale: IUniform<number>; uNoiseIntensity: IUniform<number>; uColor: IUniform<Color>; uRotation: IUniform<number>; uTime: IUniform<number>; [key: string]: IUniform }
export interface SilkProps { speed?: number; scale?: number; color?: string; noiseIntensity?: number; rotation?: number; reducedMotion?: boolean }

const vertexShader = `varying vec2 vUv; varying vec3 vPosition; void main(){vPosition=position;vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `varying vec2 vUv;varying vec3 vPosition;uniform float uTime;uniform vec3 uColor;uniform float uSpeed;uniform float uScale;uniform float uRotation;uniform float uNoiseIntensity;const float e=2.71828182845904523536;float noise(vec2 p){vec2 r=e*sin(e*p);return fract(r.x*r.y*(1.0+p.x));}vec2 rotateUvs(vec2 uv,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*uv;}void main(){float rnd=noise(gl_FragCoord.xy);vec2 uv=rotateUvs(vUv*uScale,uRotation);vec2 tex=uv*uScale;float offset=uSpeed*uTime;tex.y+=.03*sin(8.0*tex.x-offset);float pattern=.6+.4*sin(5.0*(tex.x+tex.y+cos(3.0*tex.x+5.0*tex.y)+.02*offset)+sin(20.0*(tex.x+tex.y-.1*offset)));float grain=rnd/15.0*uNoiseIntensity;gl_FragColor=vec4(clamp(uColor*pattern-vec3(grain),0.0,1.0),1.0);}`;

const normalized = (hex: string): [number, number, number] => { const value = hex.replace("#", ""); return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255) as [number, number, number]; };

const SilkPlane = forwardRef<Mesh, { uniforms: SilkUniforms; reducedMotion: boolean }>(function SilkPlane({ uniforms, reducedMotion }, ref) {
  const { viewport } = useThree();
  useLayoutEffect(() => { const mesh = (ref as React.MutableRefObject<Mesh | null>).current; mesh?.scale.set(viewport.width, viewport.height, 1); }, [ref, viewport]);
  useFrame((_state: RootState, delta: number) => { const mesh = (ref as React.MutableRefObject<Mesh | null>).current; if (mesh && !reducedMotion) (mesh.material as ShaderMaterial).uniforms.uTime.value += 0.1 * delta; });
  return <mesh ref={ref}><planeGeometry args={[1, 1, 1, 1]} /><shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} /></mesh>;
});

export default function Silk({ speed = 5, scale = 1, color = "#7B7481", noiseIntensity = 1.5, rotation = 0, reducedMotion = false }: SilkProps) {
  const meshRef = useRef<Mesh>(null);
  const uniforms = useMemo<SilkUniforms>(() => ({ uSpeed: { value: speed }, uScale: { value: scale }, uNoiseIntensity: { value: noiseIntensity }, uColor: { value: new Color(...normalized(color)) }, uRotation: { value: rotation }, uTime: { value: 0 } }), []);
  useEffect(() => { uniforms.uSpeed.value = speed; uniforms.uScale.value = scale; uniforms.uNoiseIntensity.value = noiseIntensity; uniforms.uColor.value.setRGB(...normalized(color)); uniforms.uRotation.value = rotation; }, [speed, scale, noiseIntensity, color, rotation, uniforms]);
  return <div className="absolute inset-0 overflow-hidden" data-reactbits-background="silk"><Canvas dpr={[1, 2]} frameloop={reducedMotion ? "demand" : "always"}><SilkPlane ref={meshRef} uniforms={uniforms} reducedMotion={reducedMotion} /></Canvas></div>;
}
