import { useMemo, useRef, type ReactNode } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { ModelKind } from "../data/catalogue";
import { metal } from "./materials";
import {
  Beam,
  DanceFloor,
  LedPar,
  makeHeadControl,
  MovingHead,
  Pool,
  Sparkles,
  Speaker,
  Subwoofer,
  Tripod,
  Truss,
  Tubes,
} from "./parts";
import { GoboProjection, SparkFountain } from "./effects";

type V3 = [number, number, number];

/** Camera framing for each model, used by the viewer and the thumbnail renderer. */
export const modelViews: Record<ModelKind, { position: V3; target: V3 }> = {
  speakerPair: { position: [2.3, 1.7, 3.9], target: [0, 1.05, 0] },
  speakerStack: { position: [2.6, 1.6, 4.3], target: [0, 1.0, 0] },
  lineArray: { position: [3.4, 2.0, 5.2], target: [0, 1.7, 0] },
  mics: { position: [0.62, 0.55, 0.95], target: [0, 0.14, 0] },
  djBooth: { position: [1.9, 1.7, 2.8], target: [0, 0.75, 0] },
  uplighter: { position: [0.35, 1.0, 3.7], target: [0, 0.95, -0.3] },
  movingHead: { position: [1.9, 1.5, 3.2], target: [0, 1.0, 0] },
  discoRig: { position: [2.6, 2.0, 4.2], target: [0, 1.5, 0] },
  stageWash: { position: [4.2, 2.6, 6.4], target: [0, 1.5, 0] },
  gobo: { position: [0.3, 2.4, 3.4], target: [0, 0.3, 0] },
  danceFloor: { position: [3.8, 3.2, 4.9], target: [0, 0, 0] },
  stageDecks: { position: [5.0, 2.8, 6.8], target: [0, 0.4, 0] },
  truss: { position: [4.2, 2.3, 7.0], target: [0, 1.75, 0] },
  lowFog: { position: [2.2, 1.5, 3.6], target: [0, 0.25, 0] },
  sparks: { position: [0.4, 1.6, 4.6], target: [0, 1.3, 0] },
  hazer: { position: [1.1, 0.75, 1.8], target: [0, 0.2, 0] },
};

/** Slow sweeping pan/tilt, for fixtures shown on their own. */
function useSweep(controls: ReturnType<typeof makeHeadControl>[], opts: { tilt: number; pan: number; speed?: number; animate: boolean }) {
  useFrame((s) => {
    const t = s.clock.elapsedTime * (opts.speed ?? 0.6);
    controls.forEach((c, i) => {
      const phase = i * 1.7;
      c.pan = opts.animate ? Math.sin(t + phase) * opts.pan : (i % 2 ? -1 : 1) * opts.pan * 0.6;
      c.tilt = opts.animate ? opts.tilt + Math.sin(t * 0.8 + phase) * 0.18 : opts.tilt;
    });
  });
}

function useHeadControls(n: number, colour: string) {
  const controls = useMemo(() => Array.from({ length: n }, () => makeHeadControl(colour)), [n]); // eslint-disable-line react-hooks/exhaustive-deps
  controls.forEach((c) => c.color.set(colour));
  return controls;
}

/* ——— Sound ——— */

function Mixer(props: ThreeElements["group"]) {
  const knobs = useMemo(() => {
    const k: V3[] = [];
    for (let x = 0; x < 4; x++) for (let z = 0; z < 3; z++) k.push([-0.1 + x * 0.066, 0.085, -0.06 + z * 0.05]);
    return k;
  }, []);
  return (
    <group {...props}>
      <RoundedBox args={[0.3, 0.08, 0.24]} radius={0.012} position={[0, 0.04, 0]} material={metal.body} castShadow />
      {knobs.map((p, i) => (
        <mesh key={i} position={p} material={metal.chrome}>
          <cylinderGeometry args={[0.008, 0.008, 0.012, 10]} />
        </mesh>
      ))}
      {[-0.1, -0.034, 0.032, 0.098].map((x) => (
        <mesh key={x} position={[x, 0.082, 0.085]} material={metal.dark}>
          <boxGeometry args={[0.006, 0.004, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

function SpeakerPair() {
  return (
    <group>
      {[-0.9, 0.9].map((x) => (
        <group key={x} position={[x, 0, 0]} rotation-y={x < 0 ? 0.18 : -0.18}>
          <Tripod height={1.45} />
          <Speaker size={12} position={[0, 1.45, 0]} />
        </group>
      ))}
      <Mixer position={[0, 0, 0.7]} rotation-y={-0.3} />
    </group>
  );
}

function SpeakerStack() {
  return (
    <group>
      {[-0.72, 0.72].map((x) => (
        <group key={x} position={[x, 0, 0]} rotation-y={x < 0 ? 0.14 : -0.14}>
          <Subwoofer size={18} />
          <mesh position={[0, 0.62 + 0.3, 0]} material={metal.trussBlack}>
            <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
          </mesh>
          <Speaker size={15} position={[0, 1.2, 0]} />
        </group>
      ))}
    </group>
  );
}

function ArrayCab({ depth, splays }: { depth: number; splays: number[] }): ReactNode {
  if (depth >= splays.length) return null;
  return (
    <group position={[0, -0.27, 0]} rotation-x={THREE.MathUtils.degToRad(splays[depth])}>
      <RoundedBox args={[0.92, 0.25, 0.5]} radius={0.02} position={[0, -0.125, 0]} material={metal.body} castShadow />
      <mesh position={[0, -0.125, 0.252]} material={metal.grille}>
        <boxGeometry args={[0.86, 0.2, 0.01]} />
      </mesh>
      <ArrayCab depth={depth + 1} splays={splays} />
    </group>
  );
}

function LineArray() {
  const splays = [0, 1, 1, 2, 3, 5, 7, 10];
  return (
    <group>
      <group position={[0, 3.35, 0]}>
        <Tubes
          segments={[
            [[-0.35, 0.03, 0], [-0.35, 0.9, 0]],
            [[0.35, 0.03, 0], [0.35, 0.9, 0]],
          ]}
          radius={0.008}
          material={metal.chrome}
        />
        <mesh material={metal.trussBlack} position={[0, 0.03, 0]}>
          <boxGeometry args={[1.0, 0.06, 0.55]} />
        </mesh>
        <group position={[0, 0.27, 0]}>
          <ArrayCab depth={0} splays={splays} />
        </group>
      </group>
      {[-1.0, 1.0].map((x) => (
        <group key={x} position={[x, 0, 0.4]}>
          <Subwoofer size={21} />
        </group>
      ))}
    </group>
  );
}

function HandheldMic(props: ThreeElements["group"]) {
  const grille = useMemo(() => new THREE.MeshStandardMaterial({ color: "#a8a8a8", roughness: 0.4, metalness: 0.9, wireframe: true }), []);
  return (
    <group {...props}>
      <mesh material={metal.body} position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.021, 0.015, 0.2, 24]} />
      </mesh>
      <mesh material={metal.chrome} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.024, 0.021, 0.012, 24]} />
      </mesh>
      <mesh material={metal.dark} position={[0, 0.235, 0]}>
        <sphereGeometry args={[0.03, 24, 16]} />
      </mesh>
      <mesh material={grille} position={[0, 0.235, 0]}>
        <sphereGeometry args={[0.032, 18, 12]} />
      </mesh>
      <mesh position={[0, 0.06, 0.018]}>
        <boxGeometry args={[0.01, 0.02, 0.004]} />
        <meshBasicMaterial color="#c589e3" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Mics() {
  return (
    <group>
      <RoundedBox args={[0.42, 0.07, 0.22]} radius={0.01} position={[0, 0.035, -0.08]} material={metal.body} castShadow />
      <mesh position={[0, 0.045, 0.031]}>
        <planeGeometry args={[0.12, 0.03]} />
        <meshBasicMaterial color="#c589e3" toneMapped={false} />
      </mesh>
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, 0.16, -0.17]} rotation-z={x < 0 ? 0.25 : -0.25} material={metal.dark}>
          <cylinderGeometry args={[0.005, 0.007, 0.2, 8]} />
        </mesh>
      ))}
      <HandheldMic position={[-0.09, 0, 0.14]} rotation={[-Math.PI / 2 + 0.02, 0, 0.5]} />
      <HandheldMic position={[0.12, 0.022, 0.1]} rotation={[-Math.PI / 2 + 0.02, 0, -0.9]} />
    </group>
  );
}

export function DjBooth({ colour }: { colour: string }) {
  // lit lycra front: glows from the LED bar at its foot
  const front = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(colour) } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; varying vec2 vUv;
          void main(){ float g = 0.12 + 0.7 * pow(1.0 - vUv.y, 2.2) + 0.08 * smoothstep(0.5, 0.0, abs(vUv.x - 0.5));
          gl_FragColor = vec4(uColor * g, 1.0); }`,
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  front.uniforms.uColor.value.set(colour);
  return (
    <group>
      <RoundedBox args={[1.5, 1.02, 0.62]} radius={0.02} position={[0, 0.51, 0]} material={metal.body} castShadow />
      <mesh position={[0, 0.5, 0.315]} material={front}>
        <planeGeometry args={[1.38, 0.9]} />
      </mesh>
      <Pool color={colour} size={2.4} intensity={0.45} position={[0, 0.005, 0.9]} />
      {[-0.42, 0.42].map((x) => (
        <group key={x} position={[x, 1.02, 0]}>
          <RoundedBox args={[0.32, 0.07, 0.38]} radius={0.012} position={[0, 0.035, 0]} material={metal.body} />
          <mesh position={[0, 0.075, 0.03]} material={metal.chrome}>
            <cylinderGeometry args={[0.1, 0.1, 0.01, 40]} />
          </mesh>
          <mesh position={[0, 0.071, -0.13]}>
            <planeGeometry args={[0.16, 0.07]} />
            <meshBasicMaterial color="#c589e3" toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      <Mixer position={[0, 1.02, 0]} scale={[0.9, 1, 1.4]} />
    </group>
  );
}

/* ——— Lighting ——— */

function Uplighters({ colour }: { colour: string }) {
  const wall = useMemo(() => new THREE.MeshStandardMaterial({ color: "#262626", roughness: 1 }), []);
  return (
    <group>
      <mesh position={[0, 1.4, -0.45]} material={wall} receiveShadow>
        <planeGeometry args={[4.2, 2.8]} />
      </mesh>
      <mesh position={[0, 0, 0.15]} rotation-x={-Math.PI / 2} material={metal.deck} receiveShadow>
        <planeGeometry args={[4.2, 1.2]} />
      </mesh>
      {[-1, 0, 1].map((x) => (
        <group key={x} position={[x, 0, -0.2]}>
          <RoundedBox args={[0.13, 0.19, 0.13]} radius={0.02} position={[0, 0.095, 0]} material={metal.body} castShadow />
          <group position={[0, 0.19, 0]} rotation-x={-0.35}>
            <mesh>
              <cylinderGeometry args={[0.045, 0.045, 0.01, 20]} />
              <meshStandardMaterial color="#000" emissive={colour} emissiveIntensity={1} toneMapped={false} />
            </mesh>
            <Beam length={1.9} lensRadius={0.05} spread={0.32} color={colour} intensity={0.7} />
          </group>
          <WallWash colour={colour} />
        </group>
      ))}
    </group>
  );
}

function WallWash({ colour }: { colour: string }) {
  const m = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(colour) } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; varying vec2 vUv;
          void main(){ vec2 p = vUv - vec2(0.5, 0.0); p.x *= 1.6; float d = length(p);
          float a = smoothstep(1.0, 0.05, d) * 0.95; gl_FragColor = vec4(uColor * a, a); }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  m.uniforms.uColor.value.set(colour);
  return (
    // the fixture group sits 0.2 m off the wall, so the wash is 0.24 m behind it
    <mesh position={[0, 1.15, -0.24]} scale={[1, 1.9, 1]} material={m}>
      <planeGeometry args={[1.25, 1.25]} />
    </mesh>
  );
}

function MovingHeadPair({ colour, animate }: { colour: string; animate: boolean }) {
  const controls = useHeadControls(2, colour);
  useSweep(controls, { tilt: 0.45, pan: 0.7, animate });
  return (
    <group>
      {controls.map((c, i) => (
        <MovingHead key={i} control={c} position={[i ? 0.55 : -0.55, 0, 0]} beamLength={4} spread={0.05} />
      ))}
      <Sparkles count={90} area={[4, 3, 3]} y={0.3} size={10} twinkle={0.4} opacity={0.35} soft drift={0.3} />
    </group>
  );
}

function TBar({ colour, animate }: { colour: string; animate: boolean }) {
  const controls = useHeadControls(2, colour);
  useSweep(controls, { tilt: 0.55, pan: 0.8, animate, speed: 0.9 });
  const second = colour === "#f2eef6" ? "#9a4de0" : "#f2eef6";
  return (
    <group>
      <Tripod height={2.15} />
      <mesh position={[0, 2.15, 0]} rotation-z={Math.PI / 2} material={metal.trussBlack}>
        <cylinderGeometry args={[0.024, 0.024, 1.3, 12]} />
      </mesh>
      {controls.map((c, i) => (
        <MovingHead key={i} control={c} position={[i ? 0.5 : -0.5, 2.17, 0]} beamLength={3.2} spread={0.05} />
      ))}
      {[-0.17, 0.17].map((x) => (
        <LedPar key={x} color={second} position={[x, 2.06, 0.06]} rotation-x={1.25} beamLength={2.4} />
      ))}
    </group>
  );
}

function DiscoRig({ colour, animate }: { colour: string; animate: boolean }) {
  return (
    <group>
      <TBar colour={colour} animate={animate} />
      <RoundedBox args={[0.34, 0.22, 0.26]} radius={0.02} position={[0.8, 0.11, 0.3]} material={metal.body} castShadow />
      <Sparkles count={160} area={[5, 3.5, 3.5]} y={0.2} size={12} twinkle={0.3} opacity={0.35} soft drift={0.25} />
    </group>
  );
}

function StageWash({ colour, animate }: { colour: string; animate: boolean }) {
  const controls = useHeadControls(2, colour);
  useSweep(controls, { tilt: 0.35, pan: 0.6, animate, speed: 0.5 });
  const h = 3.2;
  const half = 2.2;
  return (
    <group>
      <Truss from={[-half, 0, 0]} to={[-half, h, 0]} />
      <Truss from={[half, 0, 0]} to={[half, h, 0]} />
      <Truss from={[-half - 0.15, h + 0.15, 0]} to={[half + 0.15, h + 0.15, 0]} />
      {[-half, half].map((x) => (
        <mesh key={x} position={[x, 0.01, 0]} material={metal.trussBlack}>
          <boxGeometry args={[0.7, 0.02, 0.7]} />
        </mesh>
      ))}
      {[-1.35, -0.45, 0.45, 1.35].map((x) => (
        <LedPar key={x} color="#f2eef6" position={[x, h - 0.05, 0.25]} rotation-x={Math.PI - 0.6} beamLength={3.4} />
      ))}
      {controls.map((c, i) => (
        <MovingHead key={i} control={c} hanging position={[i ? 0.9 : -0.9, h - 0.02, -0.2]} beamLength={4} spread={0.05} />
      ))}
      <group position={[0, 0, 0.9]}>
        <StageDeckRun cols={2} rows={1} height={0.4} />
      </group>
      <Pool color="#f2eef6" size={3.2} intensity={0.35} position={[0, 0.42, 1.5]} />
      <Sparkles count={160} area={[5, 3.2, 3]} y={0.3} size={12} twinkle={0.3} opacity={0.3} soft drift={0.25} />
    </group>
  );
}

function Gobo({ colour }: { colour: string }) {
  const lensMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#000", emissiveIntensity: 1, toneMapped: false }), []);
  lensMat.emissive.set(colour);
  const from = new THREE.Vector3(0, 2.2, -1.2);
  const to = new THREE.Vector3(0, 0, 0.2);
  const dir = to.clone().sub(from);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} material={metal.deck} receiveShadow>
        <circleGeometry args={[2.6, 48]} />
      </mesh>
      <Tubes segments={[[[0, 0, -1.4], [0, 2.3, -1.4]]]} radius={0.02} material={metal.trussBlack} />
      <group position={from.toArray()} quaternion={q}>
        <RoundedBox args={[0.2, 0.34, 0.2]} radius={0.02} position={[0, -0.12, 0]} material={metal.body} castShadow />
        <mesh position={[0, 0.1, 0]} material={metal.body}>
          <cylinderGeometry args={[0.06, 0.07, 0.12, 24]} />
        </mesh>
        <mesh position={[0, 0.162, 0]} material={lensMat}>
          <cylinderGeometry args={[0.05, 0.05, 0.005, 24]} />
        </mesh>
        <group position={[0, 0.165, 0]}>
          <Beam length={dir.length() - 0.2} lensRadius={0.045} spread={0.3} color={colour} intensity={0.5} />
        </group>
      </group>
      <GoboProjection color={colour} size={1.8} position={[0, 0.012, 0.2]} />
    </group>
  );
}

/* ——— Staging ——— */

function StageDeckRun({ cols, rows, height }: { cols: number; rows: number; height: number }) {
  const w = 2.44;
  const d = 1.22;
  const legs = useMemo(() => {
    const segs: [V3, V3][] = [];
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++)
        for (const [lx, lz] of [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ]) {
          const x = (c - (cols - 1) / 2) * w + lx * (w / 2 - 0.08);
          const z = (r - (rows - 1) / 2) * d + lz * (d / 2 - 0.08);
          segs.push([[x, 0, z], [x, height - 0.03, z]]);
        }
    return segs;
  }, [cols, rows, height]);
  const skirt = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 1, transparent: true, opacity: 0.94 }), []);
  return (
    <group>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (
          <mesh
            key={i}
            position={[(c - (cols - 1) / 2) * w, height - 0.025, (r - (rows - 1) / 2) * d]}
            material={metal.deck}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[w - 0.01, 0.05, d - 0.01]} />
          </mesh>
        );
      })}
      <Tubes segments={legs} radius={0.025} material={metal.chrome} />
      <mesh position={[0, (height - 0.05) / 2, (rows * d) / 2 + 0.005]} material={skirt}>
        <planeGeometry args={[cols * w, height - 0.05]} />
      </mesh>
    </group>
  );
}

function StageDecks() {
  const h = 0.6;
  return (
    <group>
      <StageDeckRun cols={3} rows={2} height={h} />
      {/* steps */}
      <group position={[-2.4, 0, 1.22 + 0.25]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, (h / 3) * (i + 0.5) - 0.01, -i * 0.25 + 0.2]} material={metal.deck} castShadow>
            <boxGeometry args={[0.9, 0.05, 0.3]} />
          </mesh>
        ))}
        <Tubes
          segments={[
            [[-0.44, 0, 0.3], [-0.44, h, -0.3]],
            [[0.44, 0, 0.3], [0.44, h, -0.3]],
          ]}
          radius={0.02}
          material={metal.chrome}
        />
      </group>
    </group>
  );
}

function Goalpost() {
  const h = 3.5;
  const half = 3;
  return (
    <group>
      <Truss from={[-half, 0.02, 0]} to={[-half, h, 0]} />
      <Truss from={[half, 0.02, 0]} to={[half, h, 0]} />
      <Truss from={[-half - 0.15, h + 0.15, 0]} to={[half + 0.15, h + 0.15, 0]} />
      {[-half, half].map((x) => (
        <mesh key={x} position={[x, 0.01, 0]} material={metal.trussBlack} receiveShadow>
          <boxGeometry args={[0.8, 0.02, 0.8]} />
        </mesh>
      ))}
    </group>
  );
}

/* ——— Effects ——— */

function FogMachine(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[0.55, 0.38, 0.4]} radius={0.03} position={[0, 0.19, 0]} material={metal.body} castShadow />
      <mesh position={[0.3, 0.12, 0]} rotation-z={Math.PI / 2} material={metal.chrome}>
        <cylinderGeometry args={[0.06, 0.08, 0.1, 20]} />
      </mesh>
    </group>
  );
}

function LowFog() {
  return (
    <group>
      <DanceFloor tilesX={6} tilesZ={6} />
      <FogMachine position={[-2.3, 0, -1.2]} rotation-y={-0.5} />
      <Sparkles count={340} area={[4.2, 0.3, 4.2]} y={0.05} size={560} twinkle={0} opacity={0.26} soft color="#e8e8e8" drift={0.35} />
    </group>
  );
}

function Sparks() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} material={metal.deck} receiveShadow>
        <circleGeometry args={[3, 48]} />
      </mesh>
      {[-0.9, 0.9].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <RoundedBox args={[0.34, 0.26, 0.34]} radius={0.02} position={[0, 0.13, 0]} material={metal.body} castShadow />
          <mesh position={[0, 0.262, 0]} material={metal.dark}>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 20]} />
          </mesh>
          <SparkFountain position={[0, 0.27, 0]} height={2.4} />
          <Pool color="#ffb26b" size={1.8} intensity={0.5} position={[0, 0.005, 0]} />
        </group>
      ))}
    </group>
  );
}

function Hazer() {
  return (
    <group>
      <RoundedBox args={[0.42, 0.28, 0.3]} radius={0.025} position={[0, 0.14, 0]} material={metal.body} castShadow />
      <mesh position={[0, 0.15, 0.152]} material={metal.grille}>
        <circleGeometry args={[0.1, 32]} />
      </mesh>
      <mesh position={[0.14, 0.23, 0.152]}>
        <planeGeometry args={[0.06, 0.02]} />
        <meshBasicMaterial color="#c589e3" toneMapped={false} />
      </mesh>
      <group position={[0, 0.15, 1.1]}>
        <Sparkles count={200} area={[1.6, 0.8, 1.8]} y={-0.2} size={300} twinkle={0} opacity={0.2} soft color="#e6e6e6" drift={0.3} />
      </group>
    </group>
  );
}

/* ——— Registry ——— */

export function ProductModel({ kind, colour, animate = true }: { kind: ModelKind; colour: string; animate?: boolean }) {
  switch (kind) {
    case "speakerPair":
      return <SpeakerPair />;
    case "speakerStack":
      return <SpeakerStack />;
    case "lineArray":
      return <LineArray />;
    case "mics":
      return <Mics />;
    case "djBooth":
      return <DjBooth colour={colour} />;
    case "uplighter":
      return <Uplighters colour={colour} />;
    case "movingHead":
      return <MovingHeadPair colour={colour} animate={animate} />;
    case "discoRig":
      return <DiscoRig colour={colour} animate={animate} />;
    case "stageWash":
      return <StageWash colour={colour} animate={animate} />;
    case "gobo":
      return <Gobo colour={colour} />;
    case "danceFloor":
      return <DanceFloor tilesX={8} tilesZ={8} />;
    case "stageDecks":
      return <StageDecks />;
    case "truss":
      return <Goalpost />;
    case "lowFog":
      return <LowFog />;
    case "sparks":
      return <Sparks />;
    case "hazer":
      return <Hazer />;
  }
}

/** Gentle turntable for fixtures that don't animate themselves. */
export function Turntable({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (enabled && ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return <group ref={ref}>{children}</group>;
}
