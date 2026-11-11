"use client";

/* React Bits Dither, adapted for renderer lifecycle and reduced motion. */
import { forwardRef, useEffect, useRef, type ComponentType, type Ref } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
  vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
  Pi=mod289(Pi);
  vec4 ix=Pi.xzxz,iy=Pi.yyww,fx=Pf.xzxz,fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;
  vec4 gy=abs(gx)-.5;
  vec4 tx=floor(gx+.5);
  gx-=tx;
  vec2 g00=vec2(gx.x,gy.x),g10=vec2(gx.y,gy.y),g01=vec2(gx.z,gy.z),g11=vec2(gx.w,gy.w);
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x)),n10=dot(g10,vec2(fx.y,fy.y)),n01=dot(g01,vec2(fx.z,fy.z)),n11=dot(g11,vec2(fx.w,fy.w));
  vec2 f=fade(Pf.xy);
  vec2 nx=mix(vec2(n00,n01),vec2(n10,n11),f.x);
  return 2.3*mix(nx.x,nx.y,f.y);
}

float fbm(vec2 p){
  float value=0.,amp=1.,freq=waveFrequency;
  for(int i=0;i<4;i++){
    value+=amp*abs(cnoise(p));
    p*=freq;
    amp*=waveAmplitude;
  }
  return value;
}

float pattern(vec2 p){
  vec2 p2=p-time*waveSpeed;
  return fbm(p+fbm(p2));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  uv-=.5;
  uv.x*=resolution.x/resolution.y;
  float f=pattern(uv);
  if(enableMouseInteraction==1){
    vec2 m=(mousePos/resolution-.5)*vec2(1.,-1.);
    m.x*=resolution.x/resolution.y;
    float effect=1.0-smoothstep(0.0,mouseRadius,length(uv-m));
    f-=.5*effect;
  }
  gl_FragColor=vec4(mix(backgroundColor,waveColor,clamp(f,0.,1.)),1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform vec2 resolution;

const float matrix[64]=float[64](
  0./64.,48./64.,12./64.,60./64.,3./64.,51./64.,15./64.,63./64.,
  32./64.,16./64.,44./64.,28./64.,35./64.,19./64.,47./64.,31./64.,
  8./64.,56./64.,4./64.,52./64.,11./64.,59./64.,7./64.,55./64.,
  40./64.,24./64.,36./64.,20./64.,43./64.,27./64.,39./64.,23./64.,
  2./64.,50./64.,14./64.,62./64.,1./64.,49./64.,13./64.,61./64.,
  34./64.,18./64.,46./64.,30./64.,33./64.,17./64.,45./64.,29./64.,
  10./64.,58./64.,6./64.,54./64.,9./64.,57./64.,5./64.,53./64.,
  42./64.,26./64.,38./64.,22./64.,41./64.,25./64.,37./64.,21./64.
);

vec3 dither(vec2 uv,vec3 color){
  vec2 res = max(resolution, vec2(1.0));
  vec2 coord=floor(uv*res/pixelSize);
  int x=int(mod(coord.x,8.0)),y=int(mod(coord.y,8.0));
  float threshold=matrix[y*8+x]-.25;
  float stepSize=1.0/max(colorNum-1.0, 1.0);
  color+=threshold*stepSize;
  float luminance=dot(color,vec3(.2126,.7152,.0722));
  color=clamp(color-mix(.2,0.,smoothstep(.45,.8,luminance)),0.,1.);
  return floor(color*(colorNum-1.0)+.5)/max(colorNum-1.0, 1.0);
}

void mainImage(in vec4 inputColor,in vec2 uv,out vec4 outputColor){
  vec2 res = max(resolution, vec2(1.0));
  vec2 normalized=pixelSize/res;
  vec2 pixelUv=normalized*floor(uv/normalized);
  vec4 color=texture2D(inputBuffer,pixelUv);
  color.rgb=dither(uv,color.rgb);
  outputColor=color;
}
`;

class RetroEffectImpl extends Effect {
  uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ["colorNum", new THREE.Uniform(4)],
      ["pixelSize", new THREE.Uniform(2)],
      ["resolution", new THREE.Uniform(new THREE.Vector2(1, 1))],
    ]);
    super("RetroEffect", ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
  setSize(width: number, height: number) {
    const res = this.uniforms.get("resolution");
    if (res) res.value.set(width, height);
  }
  set colorNum(value: number) {
    const u = this.uniforms.get("colorNum");
    if (u) u.value = value;
  }
  set pixelSize(value: number) {
    const u = this.uniforms.get("pixelSize");
    if (u) u.value = value;
  }
}

const WrappedRetro = wrapEffect(RetroEffectImpl) as unknown as ComponentType<{
  ref?: Ref<RetroEffectImpl>;
  colorNum: number;
  pixelSize: number;
}>;

const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>(
  function RetroEffect({ colorNum, pixelSize }, ref) {
    return <WrappedRetro ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;
  }
);

type WavesProps = Required<DitherProps> & { pointer: { current: THREE.Vector2 } };

function Waves(props: WavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size, gl } = useThree();
  const uniforms = useRef({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    waveSpeed: new THREE.Uniform(props.waveSpeed),
    waveFrequency: new THREE.Uniform(props.waveFrequency),
    waveAmplitude: new THREE.Uniform(props.waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...props.waveColor)),
    backgroundColor: new THREE.Uniform(new THREE.Color(...props.backgroundColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(props.enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(props.mouseRadius),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    uniforms.current.resolution.value.set(Math.floor(size.width * dpr), Math.floor(size.height * dpr));
  }, [size, gl]);

  useFrame(({ clock }) => {
    const u = uniforms.current;
    if (!props.disableAnimation) u.time.value = clock.getElapsedTime();
    u.waveSpeed.value = props.waveSpeed;
    u.waveFrequency.value = props.waveFrequency;
    u.waveAmplitude.value = props.waveAmplitude;
    u.waveColor.value.set(...props.waveColor);
    u.backgroundColor.value.set(...props.backgroundColor);
    u.enableMouseInteraction.value = props.enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = props.mouseRadius;
    if (props.enableMouseInteraction) u.mousePos.value.copy(props.pointer.current);
  });

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={uniforms.current}
        />
      </mesh>
      <EffectComposer>
        <RetroEffect colorNum={props.colorNum} pixelSize={props.pixelSize} />
      </EffectComposer>
    </>
  );
}

export function bindDitherPointer(
  host: HTMLElement,
  onMove: (x: number, y: number) => void,
  dpr = 1,
  onLeave?: () => void
): () => void {
  const move = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      onLeave?.();
      return;
    }
    onMove((event.clientX - rect.left) * dpr, (event.clientY - rect.top) * dpr);
  };
  window.addEventListener("pointermove", move, { passive: true });
  return () => window.removeEventListener("pointermove", move);
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    if (!enableMouseInteraction || !host.current) return;
    return bindDitherPointer(host.current, (x, y) => pointer.current.set(x, y));
  }, [enableMouseInteraction]);

  const props = {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    backgroundColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  };

  return (
    <div ref={host} className="absolute inset-0 overflow-hidden" data-reactbits-background="dither">
      <Canvas
        camera={{ position: [0, 0, 6] }}
        dpr={1}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        frameloop={disableAnimation ? "demand" : "always"}
      >
        <Waves {...props} pointer={pointer} />
      </Canvas>
    </div>
  );
}
