import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gel } from "../lib/cssVar";
import { prefersReducedMotion } from "../lib/format";
import { stageScroll, useStage } from "../store/stage";
import { createPoolMaterial } from "./materials";
import { DjBooth } from "./models";
import { DanceFloor, makeHeadControl, MovingHead, Sparkles, Speaker, Subwoofer, Truss, type HeadControl } from "./parts";
import { GoboProjection } from "./effects";

/*
 * The hero rig. Layered pattern: the DOM owns scroll (GSAP ScrollTrigger writes
 * `cue` to the stage store and `stageScroll.progress`), this scene only reads them.
 * Fixtures are driven through mutable HeadControl objects so nothing re-renders per frame.
 */

const HEAD_X = [-4.2, -2.1, 0, 2.1, 4.2];
const TRUSS_Y = 5;
const FLOOR_Z = 1.2;

type Mode = "pointer" | "speakers" | "fan" | "floor";
interface Cue {
  colours: string[];
  mode: Mode;
  floor: number;
  booth: string;
}

function buildCues(): Cue[] {
  // only the logo's colours: purple, orchid and white, like its bars
  const p = gel.beam();
  const w = gel.white();
  const t = gel.top();
  return [
    { colours: [p, w, p, w, p], mode: "pointer", floor: 0.8, booth: p },
    { colours: [w, w, p, w, w], mode: "speakers", floor: 0.45, booth: w },
    { colours: [p, p, t, p, p], mode: "fan", floor: 0.6, booth: p },
    { colours: [t, p, w, p, t], mode: "floor", floor: 1, booth: t },
  ];
}

const pointer = { x: 0.35, y: -0.15, active: false };

function usePointer() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, []);
}

function Rig() {
  const cue = useStage((s) => s.cue);
  const cues = useMemo(buildCues, []);
  const reduced = useMemo(prefersReducedMotion, []);
  const targets = useMemo(() => HEAD_X.map((x) => new THREE.Vector3(x, 0, FLOOR_Z)), []);
  const controls = useMemo<HeadControl[]>(
    () =>
      HEAD_X.map((_, i) => {
        const c = makeHeadControl(cues[0].colours[i], 0, 0.6);
        c.target = targets[i];
        return c;
      }),
    [cues, targets],
  );
  const poolRefs = useRef<(THREE.Mesh | null)[]>([]);
  const poolMats = useMemo(() => HEAD_X.map((_, i) => createPoolMaterial(cues[0].colours[i])), [cues]);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);
  const tmpColour = useMemo(() => new THREE.Color(), []);
  const P = useMemo(() => new THREE.Vector3(), []);
  const D = useMemo(() => new THREE.Vector3(), []);
  const smoothPointer = useRef({ x: pointer.x, y: pointer.y });
  const active = cues[Math.min(cue, cues.length - 1)];

  useFrame((state, dt) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const k = 1 - Math.exp(-3 * dt);
    smoothPointer.current.x += (pointer.x - smoothPointer.current.x) * k;
    smoothPointer.current.y += (pointer.y - smoothPointer.current.y) * k;
    const px = smoothPointer.current.x;
    const py = smoothPointer.current.y;

    controls.forEach((c, i) => {
      const target = targets[i];
      const off = i - 2;
      switch (active.mode) {
        case "pointer":
          target.set(px * 5.5 + off * 0.6 + Math.sin(t * 0.7 + i) * 0.35, 0, FLOOR_Z + 1 - py * 2.6 + Math.cos(t * 0.5 + i) * 0.3);
          break;
        case "speakers": {
          const side = off < 0 ? -1 : off > 0 ? 1 : 0;
          if (side === 0) target.set(Math.sin(t * 0.6) * 0.4, 1.1, -1.6);
          else target.set(side * 5.4 + Math.sin(t * 0.8 + i) * 0.3, 1.4 + Math.sin(t + i) * 0.3, 1.4);
          break;
        }
        case "fan":
          target.set(off * 2.6 + Math.sin(t * 0.9 + i * 1.3) * 2.4 + px * 1.5, 0, 4.5 + Math.cos(t * 0.7 + i) * 2.2);
          break;
        case "floor": {
          const a = t * 0.8 + (i / HEAD_X.length) * Math.PI * 2;
          target.set(Math.cos(a) * 1.9, 0, FLOOR_Z + Math.sin(a) * 1.1);
          break;
        }
      }
      c.color.set(active.colours[i]);
      c.intensity = 1;

      // light pool where the beam actually lands (it lags the target while the head moves)
      const pool = poolRefs.current[i];
      if (pool && c.lens) {
        c.lens.getWorldPosition(P);
        D.set(0, 1, 0).transformDirection(c.lens.matrixWorld);
        if (D.y < -0.08) {
          const s = -P.y / D.y;
          pool.position.set(P.x + D.x * s, 0.035, P.z + D.z * s);
          const size = 0.5 + s * 0.16;
          pool.scale.set(size, size / Math.max(0.35, -D.y), 1);
          pool.rotation.set(-Math.PI / 2, 0, Math.atan2(D.x, D.z));
          pool.visible = true;
        } else pool.visible = false;
        poolMats[i].uniforms.uColor.value.lerp(tmpColour.set(active.colours[i]), k);
        poolMats[i].uniforms.uIntensity.value = 0.8;
      }
    });

    lightA.current?.color.lerp(tmpColour.set(active.colours[0]), k);
    lightB.current?.color.lerp(tmpColour.set(active.colours[1]), k);
  });

  return (
    <group>
      {/* truss goalpost */}
      <Truss from={[-6.3, TRUSS_Y + 0.15, 0]} to={[6.3, TRUSS_Y + 0.15, 0]} />
      <Truss from={[-6.15, 0, 0]} to={[-6.15, TRUSS_Y, 0]} />
      <Truss from={[6.15, 0, 0]} to={[6.15, TRUSS_Y, 0]} />

      {controls.map((c, i) => (
        <MovingHead key={i} control={c} hanging position={[HEAD_X[i], TRUSS_Y - 0.02, 0]} beamLength={9} spread={0.06} followSpeed={2.2} />
      ))}

      {poolMats.map((m, i) => (
        <mesh key={i} ref={(el) => (poolRefs.current[i] = el)} material={m} renderOrder={5}>
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}

      {/* sound */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 5.4, 0, 1.4]} rotation-y={-side * 0.35} scale={1.25}>
          <Subwoofer size={18} />
          <mesh position={[0, 0.92, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.6, 10]} />
            <meshStandardMaterial color="#2c2c2c" metalness={0.7} roughness={0.4} />
          </mesh>
          <Speaker size={15} position={[0, 1.2, 0]} />
        </group>
      ))}

      <group position={[0, 0, -1.7]}>
        <DjBooth colour={active.booth} />
      </group>

      <DanceFloor tilesX={10} tilesZ={6} position={[0, 0, FLOOR_Z]} twinkle={1} />
      <GoboProjection glass color="#ffffff" size={3.2} intensity={active.mode === "floor" ? 1.5 : 1.1} position={[0, 0.04, FLOOR_Z]} spin={reduced ? 0 : 0.12} />

      {/* room */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#202020" roughness={0.42} metalness={0.25} />
      </mesh>
      <mesh position={[0, 6, -5]}>
        <planeGeometry args={[40, 14]} />
        <meshStandardMaterial color="#2a2a2a" roughness={1} />
      </mesh>

      <Sparkles count={520} area={[20, 7.5, 10]} y={0} size={12} twinkle={0.5} opacity={0.3} soft drift={reduced ? 0 : 0.18} color="#d8d8d8" />

      <pointLight ref={lightA} position={[-3.5, 1.2, 2.4]} intensity={9} distance={14} decay={1.6} />
      <pointLight ref={lightB} position={[3.5, 1.2, 2.4]} intensity={9} distance={14} decay={1.6} />
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  const goal = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef(0);
  useFrame((_, dt) => {
    const portrait = size.width / size.height < 0.9;
    smooth.current += (stageScroll.progress - smooth.current) * (1 - Math.exp(-4 * dt));
    const p = smooth.current;
    // desktop keeps the rig right of the headline; portrait centres it
    const baseX = portrait ? 0 : -1.3;
    const baseZ = portrait ? 17 : 12.5;
    goal.set(baseX + p * (portrait ? 0 : 1.6), (portrait ? 3.2 : 2.1) - p * 0.6 + (pointer.active ? pointer.y * 0.15 : 0), baseZ - p * 2.4);
    camera.position.lerp(goal, 1 - Math.exp(-3 * dt));
    // portrait: rig sits in the top half, the headline covers the floor
    look.set(baseX + p * (portrait ? 0 : 1.6), portrait ? 0.9 - p * 0.3 : 2.5 - p * 0.5, 0);
    camera.lookAt(look);
  });
  return null;
}

export default function HeroStage({ active = true }: { active?: boolean }) {
  usePointer();
  const bg = gel.bgDeep();
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [-1.3, 2.1, 12.5], fov: 40, near: 0.1, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 12, 30]} />
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#b99ad6", "#202020", 0.35]} />
      <directionalLight position={[0, 8, 6]} intensity={0.5} />
      <Rig />
      <CameraRig />
    </Canvas>
  );
}
