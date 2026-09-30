import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import type { ModelKind } from "../data/catalogue";
import { gel } from "../lib/cssVar";
import { modelViews, ProductModel, Turntable } from "./models";

export interface ProductViewerProps {
  kind: ModelKind;
  colour: string;
  autoRotate?: boolean;
  animate?: boolean;
  /** Transparent background and no floor, for thumbnail renders. */
  cutout?: boolean;
  interactive?: boolean;
}

/** Models that move on their own don't need the turntable. */
const selfAnimated: ModelKind[] = ["movingHead", "discoRig", "stageWash", "sparks", "lowFog", "hazer"];

export default function ProductViewer({
  kind,
  colour,
  autoRotate = true,
  animate = true,
  cutout = false,
  interactive = true,
}: ProductViewerProps) {
  const view = modelViews[kind];
  const bg = gel.bg();
  const dist = Math.hypot(...view.position.map((v, i) => v - view.target[i]));
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: view.position, fov: 35, near: 0.05, far: 80 }}
      gl={{ antialias: true, alpha: cutout, preserveDrawingBuffer: cutout }}
      onCreated={({ camera }) => camera.lookAt(...view.target)}
    >
      {!cutout && <color attach="background" args={[bg]} />}
      {!cutout && <fog attach="fog" args={[bg, dist * 1.4, dist * 3.2]} />}
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#ddd2f2", "#1a1520", 1]} />
      <spotLight position={[3, 6, 4]} angle={0.6} penumbra={0.8} intensity={170} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={view.position} intensity={0.9} />
      <directionalLight position={[-4, 3, -3]} intensity={0.8} color={gel.sound()} />
      <directionalLight position={[4, 2, -4]} intensity={0.9} color={gel.beam()} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[6, 1.2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.5} position={[-5, 1.5, 0]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} color={gel.sound()} />
        <Lightformer form="rect" intensity={2.5} position={[5, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} color={gel.beam()} />
      </Environment>
      <Suspense fallback={null}>
        <Turntable enabled={autoRotate && animate && !selfAnimated.includes(kind)}>
          <ProductModel kind={kind} colour={colour} animate={animate} />
        </Turntable>
      </Suspense>
      {!cutout && (
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.002, 0]} receiveShadow>
          <circleGeometry args={[30, 64]} />
          <meshStandardMaterial color="#151518" roughness={0.55} metalness={0.2} />
        </mesh>
      )}
      <ContactShadows position={[0, 0.001, 0]} opacity={cutout ? 0.45 : 0.7} scale={12} blur={2.4} far={3} frames={animate ? Infinity : 1} />
      {interactive && (
        <OrbitControls
          makeDefault
          target={view.target}
          enablePan={false}
          enableDamping
          minDistance={dist * 0.45}
          maxDistance={dist * 1.8}
          maxPolarAngle={Math.PI / 2 - 0.04}
        />
      )}
    </Canvas>
  );
}
