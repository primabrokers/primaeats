import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createBeamMaterial, createPoolMaterial, createSparkleMaterial, metal } from "./materials";

type V3 = [number, number, number];

/* ——— Tubes: one instanced mesh for many cylinders (truss lacing, stands) ——— */

export function Tubes({
  segments,
  radius = 0.02,
  material = metal.truss,
}: {
  segments: [V3, V3][];
  radius?: number;
  material?: THREE.Material;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 8, 1), []);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const mid = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    const m = new THREE.Matrix4();
    segments.forEach(([s, e], i) => {
      a.set(...s);
      b.set(...e);
      mid.addVectors(a, b).multiplyScalar(0.5);
      dir.subVectors(b, a);
      const len = dir.length();
      q.setFromUnitVectors(up, dir.normalize());
      m.compose(mid, q, new THREE.Vector3(radius, len, radius));
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [segments, radius]);
  return <instancedMesh ref={ref} args={[geometry, material, segments.length]} castShadow />;
}

/** Box truss between two points along one axis. */
export function Truss({
  from,
  to,
  width = 0.29,
  material = metal.truss,
}: {
  from: V3;
  to: V3;
  width?: number;
  material?: THREE.Material;
}) {
  const segments = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const axis = new THREE.Vector3().subVectors(end, start);
    const length = axis.length();
    axis.normalize();
    // two directions perpendicular to the axis
    const helper = Math.abs(axis.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
    const u = new THREE.Vector3().crossVectors(axis, helper).normalize().multiplyScalar(width / 2);
    const v = new THREE.Vector3().crossVectors(axis, u).normalize().multiplyScalar(width / 2);
    const corners = [
      u.clone().add(v),
      u.clone().sub(v),
      u.clone().negate().sub(v),
      u.clone().negate().add(v),
    ];
    const at = (t: number, c: THREE.Vector3) => start.clone().addScaledVector(axis, t).add(c).toArray() as V3;
    const segs: [V3, V3][] = corners.map((c) => [at(0, c), at(length, c)]);
    const n = Math.max(1, Math.round(length / width));
    const step = length / n;
    for (let i = 0; i < n; i++) {
      for (let f = 0; f < 4; f++) {
        const c1 = corners[f];
        const c2 = corners[(f + 1) % 4];
        const flip = (i + f) % 2 === 0;
        segs.push([at(i * step, flip ? c1 : c2), at((i + 1) * step, flip ? c2 : c1)]);
      }
    }
    return segs;
  }, [from, to, width]);
  return (
    <>
      <Tubes segments={segments.slice(0, 4)} radius={0.024} material={material} />
      <Tubes segments={segments.slice(4)} radius={0.009} material={material} />
    </>
  );
}

/* ——— Beam ——— */

export interface BeamHandle {
  material: THREE.ShaderMaterial;
}

export function Beam({
  length = 6,
  lensRadius = 0.07,
  spread = 0.12,
  color = "#ffa630",
  intensity = 1,
  materialRef,
}: {
  length?: number;
  lensRadius?: number;
  /** end radius per metre of throw */
  spread?: number;
  color?: THREE.ColorRepresentation;
  intensity?: number;
  materialRef?: React.MutableRefObject<THREE.ShaderMaterial | null>;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(lensRadius + spread * length, lensRadius, length, 40, 1, true);
    g.translate(0, length / 2, 0);
    return g;
  }, [length, lensRadius, spread]);
  const material = useMemo(() => createBeamMaterial(color, intensity), []); // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    material.uniforms.uColor.value.set(color);
    material.uniforms.uIntensity.value = intensity;
  }, [color, intensity, material]);
  useLayoutEffect(() => {
    if (materialRef) materialRef.current = material;
  }, [material, materialRef]);
  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return <mesh geometry={geometry} material={material} renderOrder={10} frustumCulled={false} />;
}

export function Pool({
  color,
  size = 1.4,
  intensity = 1,
  position = [0, 0.01, 0] as V3,
}: {
  color: THREE.ColorRepresentation;
  size?: number;
  intensity?: number;
  position?: V3;
}) {
  const material = useMemo(() => createPoolMaterial(color), []); // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    material.uniforms.uColor.value.set(color);
    material.uniforms.uIntensity.value = intensity;
  }, [color, intensity, material]);
  return (
    <mesh position={position} rotation-x={-Math.PI / 2} material={material} renderOrder={5}>
      <planeGeometry args={[size, size]} />
    </mesh>
  );
}

/* ——— Moving head ——— */

/**
 * A mutable controller the parent writes to every frame (no React re-renders).
 * Either set `target` (world space) or `pan`/`tilt` (radians).
 */
export interface HeadControl {
  target: THREE.Vector3 | null;
  pan: number;
  tilt: number;
  color: THREE.Color;
  intensity: number;
  /** filled in by the fixture: the lens, for working out where the beam lands */
  lens?: THREE.Object3D;
}

export const makeHeadControl = (color: THREE.ColorRepresentation, pan = 0, tilt = 0): HeadControl => ({
  target: null,
  pan,
  tilt,
  color: new THREE.Color(color),
  intensity: 1,
});

const tmpLocal = new THREE.Vector3();

export function MovingHead({
  control,
  hanging = false,
  beamLength = 7,
  spread = 0.07,
  followSpeed = 4,
  ...props
}: {
  control: HeadControl;
  hanging?: boolean;
  beamLength?: number;
  spread?: number;
  followSpeed?: number;
} & ThreeElements["group"]) {
  const root = useRef<THREE.Group>(null);
  const mount = useRef<THREE.Group>(null);
  const yoke = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const lens = useRef<THREE.Mesh>(null);
  const beamMat = useRef<THREE.ShaderMaterial | null>(null);
  const lensMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#000", emissive: control.color.clone(), emissiveIntensity: 1, toneMapped: false }),
    [control],
  );
  const current = useRef({ pan: control.pan, tilt: control.tilt });

  useLayoutEffect(() => {
    if (lens.current) control.lens = lens.current;
  }, [control]);

  useFrame((_, dt) => {
    if (!mount.current || !yoke.current || !head.current) return;
    let pan = control.pan;
    let tilt = control.tilt;
    if (control.target) {
      // aim in the fixture's own frame; the rest direction of the lens is local +Y
      tmpLocal.copy(control.target);
      mount.current.worldToLocal(tmpLocal);
      tmpLocal.y -= 0.44;
      tmpLocal.normalize();
      tilt = Math.acos(THREE.MathUtils.clamp(tmpLocal.y, -1, 1));
      pan = Math.atan2(tmpLocal.x, tmpLocal.z);
    }
    const k = 1 - Math.exp(-followSpeed * dt);
    // shortest way round for pan
    let dp = pan - current.current.pan;
    dp = Math.atan2(Math.sin(dp), Math.cos(dp));
    current.current.pan += dp * k;
    current.current.tilt += (tilt - current.current.tilt) * k;
    yoke.current.rotation.y = current.current.pan;
    head.current.rotation.x = current.current.tilt;
    if (beamMat.current) {
      beamMat.current.uniforms.uColor.value.lerp(control.color, k);
      beamMat.current.uniforms.uIntensity.value += (control.intensity - beamMat.current.uniforms.uIntensity.value) * k;
    }
    lensMat.emissive.lerp(control.color, k);
    lensMat.emissiveIntensity = 0.3 + 0.7 * control.intensity;
  });

  return (
    <group ref={root} {...props}>
      <group ref={mount} rotation-x={hanging ? Math.PI : 0}>
        {/* base */}
        <RoundedBox args={[0.42, 0.16, 0.34]} radius={0.03} position={[0, 0.08, 0]} material={metal.body} castShadow />
        <mesh position={[0, 0.09, 0.172]}>
          <planeGeometry args={[0.1, 0.05]} />
          <meshBasicMaterial color="#2d6cff" toneMapped={false} />
        </mesh>
        <group ref={yoke} position={[0, 0.16, 0]}>
          <mesh position={[0, 0.02, 0]} material={metal.body}>
            <cylinderGeometry args={[0.12, 0.14, 0.04, 24]} />
          </mesh>
          <RoundedBox args={[0.06, 0.34, 0.14]} radius={0.02} position={[0.2, 0.2, 0]} material={metal.body} />
          <RoundedBox args={[0.06, 0.34, 0.14]} radius={0.02} position={[-0.2, 0.2, 0]} material={metal.body} />
          <RoundedBox args={[0.46, 0.05, 0.14]} radius={0.02} position={[0, 0.045, 0]} material={metal.body} />
          <group ref={head} position={[0, 0.28, 0]}>
            <mesh material={metal.body} castShadow>
              <cylinderGeometry args={[0.14, 0.16, 0.34, 32]} />
            </mesh>
            <mesh position={[0, 0.172, 0]} material={metal.dark}>
              <cylinderGeometry args={[0.125, 0.125, 0.01, 32]} />
            </mesh>
            <mesh ref={lens} position={[0, 0.178, 0]} material={lensMat}>
              <cylinderGeometry args={[0.085, 0.085, 0.01, 32]} />
            </mesh>
            <group position={[0, 0.18, 0]}>
              <Beam length={beamLength} lensRadius={0.07} spread={spread} color={control.color} intensity={control.intensity} materialRef={beamMat} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ——— LED par can ——— */

export function LedPar({
  color = "#ffa630",
  beam = true,
  beamLength = 4,
  ...props
}: { color?: THREE.ColorRepresentation; beam?: boolean; beamLength?: number } & ThreeElements["group"]) {
  const lensMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#000", emissive: new THREE.Color(color), emissiveIntensity: 1, toneMapped: false }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  useLayoutEffect(() => {
    lensMat.emissive.set(color);
  }, [color, lensMat]);
  return (
    <group {...props}>
      <mesh material={metal.body} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.22, 24]} />
      </mesh>
      <mesh position={[0, 0.112, 0]} material={lensMat}>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 24]} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation-z={Math.PI / 2} material={metal.body}>
        <torusGeometry args={[0.15, 0.012, 6, 16, Math.PI]} />
      </mesh>
      {beam && (
        <group position={[0, 0.12, 0]}>
          <Beam length={beamLength} lensRadius={0.09} spread={0.22} color={color} intensity={0.55} />
        </group>
      )}
    </group>
  );
}

/* ——— Speakers ——— */

function Driver({ radius, position }: { radius: number; position: V3 }) {
  const depth = radius * 0.35;
  // local +Y points into the cabinet
  return (
    <group position={position} rotation-x={-Math.PI / 2}>
      <mesh material={metal.cone} position={[0, depth / 2, 0]}>
        <coneGeometry args={[radius * 0.86, depth, 40, 1, true]} />
      </mesh>
      <mesh material={metal.dark} rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius * 0.9, radius * 0.07, 10, 40]} />
      </mesh>
      <mesh material={metal.grille} position={[0, depth * 0.6, 0]}>
        <sphereGeometry args={[radius * 0.2, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>
    </group>
  );
}

/** Two-way active cabinet. `size` is the woofer in inches. */
export function Speaker({ size = 12, ...props }: { size?: number } & ThreeElements["group"]) {
  const s = size / 12;
  const w = 0.4 * s;
  const h = 0.64 * s;
  const d = 0.36 * s;
  return (
    <group {...props}>
      <RoundedBox args={[w, h, d]} radius={0.025} position={[0, h / 2, 0]} material={metal.body} castShadow />
      <Driver radius={w * 0.4} position={[0, h * 0.36, d / 2 + 0.005]} />
      {/* horn */}
      <mesh position={[0, h * 0.8, d / 2 + 0.004]} material={metal.dark}>
        <boxGeometry args={[w * 0.62, h * 0.18, 0.01]} />
      </mesh>
      <mesh position={[0, h * 0.8, d / 2 + 0.006]} material={metal.cone}>
        <boxGeometry args={[w * 0.16, h * 0.08, 0.01]} />
      </mesh>
      {/* badge */}
      <mesh position={[w * 0.32, h * 0.06, d / 2 + 0.006]}>
        <planeGeometry args={[w * 0.18, h * 0.03]} />
        <meshBasicMaterial color="#f1f3fa" />
      </mesh>
    </group>
  );
}

export function Subwoofer({ size = 18, ...props }: { size?: number } & ThreeElements["group"]) {
  const s = size / 18;
  const w = 0.56 * s;
  const h = 0.62 * s;
  const d = 0.7 * s;
  return (
    <group {...props}>
      <RoundedBox args={[w, h, d]} radius={0.025} position={[0, h / 2, 0]} material={metal.body} castShadow />
      <mesh position={[0, h / 2, d / 2 + 0.002]} material={metal.grille}>
        <boxGeometry args={[w * 0.92, h * 0.9, 0.01]} />
      </mesh>
      <Driver radius={w * 0.42} position={[0, h / 2, d / 2 + 0.01]} />
    </group>
  );
}

/** Tripod speaker stand, top at `height`. */
export function Tripod({ height = 1.5, ...props }: { height?: number } & ThreeElements["group"]) {
  const segs = useMemo(() => {
    const out: [V3, V3][] = [[[0, 0.45, 0], [0, height, 0]]];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      out.push([[0, 0.55, 0], [Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5]]);
    }
    return out;
  }, [height]);
  return (
    <group {...props}>
      <Tubes segments={segs} radius={0.018} material={metal.trussBlack} />
      <mesh position={[0, 0.45 + (height - 0.45) / 2, 0]} material={metal.trussBlack}>
        <cylinderGeometry args={[0.026, 0.026, height - 0.45 - 0.35, 12]} />
      </mesh>
    </group>
  );
}

/* ——— Floor sparkles and particles ——— */

export function Sparkles({
  count,
  area,
  y = 0,
  color = "#ffffff",
  size = 22,
  twinkle = 1,
  opacity = 1,
  soft = false,
  drift = 0,
}: {
  count: number;
  area: [number, number, number];
  y?: number;
  color?: THREE.ColorRepresentation;
  size?: number;
  twinkle?: number;
  opacity?: number;
  soft?: boolean;
  drift?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, base } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * area[0];
      pos[i * 3 + 1] = y + Math.random() * area[1];
      pos[i * 3 + 2] = (Math.random() - 0.5) * area[2];
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, base: pos.slice() };
  }, [count, area, y]);
  const material = useMemo(() => createSparkleMaterial({ color, size, twinkle, opacity, soft }), []); // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    material.uniforms.uColor.value.set(color);
    material.uniforms.uOpacity.value = opacity;
  }, [color, opacity, material]);
  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime;
    if (drift && ref.current) {
      const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const t = s.clock.elapsedTime * drift;
      for (let i = 0; i < count; i++) {
        attr.array[i * 3] = base[i * 3] + Math.sin(t + i) * 0.25;
        attr.array[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.7 + i * 1.3) * 0.15;
      }
      attr.needsUpdate = true;
    }
  });
  return <points ref={ref} geometry={geometry} material={material} renderOrder={8} frustumCulled={false} />;
}

/** Gloss starlit dance floor: black tiles with twinkling LEDs. */
export function DanceFloor({
  tilesX = 8,
  tilesZ = 8,
  tile = 0.61,
  finish = "black",
  twinkle = 1,
  ...props
}: {
  tilesX?: number;
  tilesZ?: number;
  tile?: number;
  finish?: "black" | "white";
  twinkle?: number;
} & ThreeElements["group"]) {
  const w = tilesX * tile;
  const d = tilesZ * tile;
  const area = useMemo(() => [w - 0.1, 0, d - 0.1] as [number, number, number], [w, d]);
  const seams = useMemo(() => {
    const segs: [V3, V3][] = [];
    for (let i = 1; i < tilesX; i++) segs.push([[-w / 2 + i * tile, 0.031, -d / 2], [-w / 2 + i * tile, 0.031, d / 2]]);
    for (let i = 1; i < tilesZ; i++) segs.push([[-w / 2, 0.031, -d / 2 + i * tile], [w / 2, 0.031, -d / 2 + i * tile]]);
    return segs;
  }, [tilesX, tilesZ, tile, w, d]);
  const top = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: finish === "black" ? "#07070b" : "#e9eaf0",
        roughness: 0.24,
        metalness: 0.3,
      }),
    [finish],
  );
  return (
    <group {...props}>
      <mesh position={[0, 0.015, 0]} material={top} receiveShadow>
        <boxGeometry args={[w, 0.03, d]} />
      </mesh>
      <mesh position={[0, 0.008, 0]} material={metal.chrome}>
        <boxGeometry args={[w + 0.12, 0.016, d + 0.12]} />
      </mesh>
      <Tubes segments={seams} radius={0.003} material={metal.dark} />
      <Sparkles count={Math.round(tilesX * tilesZ * 14)} area={area} y={0.034} size={finish === "black" ? 22 : 12} twinkle={twinkle} color={finish === "black" ? "#ffffff" : "#fff6e0"} />
    </group>
  );
}
