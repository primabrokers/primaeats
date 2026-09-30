import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { brand } from "../brand";

/**
 * The brand logo drawn into a texture for gobo projections.
 * "metal": a white cut-out silhouette with a ring, tinted by the light colour.
 * "glass": the logo in its own colours, like a printed glass gobo.
 */
export function useLogoTexture(kind: "metal" | "glass" = "metal") {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const aspect = (img.naturalWidth || brand.logo.width) / (img.naturalHeight || brand.logo.height);
      const w = size * (kind === "glass" ? 0.86 : 0.7);
      const h = w / aspect;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      if (kind === "metal") {
        // metal gobos pass light through the cut-outs: keep the shape, make it white
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = size * 0.018;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.46, 0, Math.PI * 2);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      setTexture(tex);
    };
    img.src = brand.logo.src;
    return () => {
      alive = false;
    };
  }, [kind]);
  return texture;
}

/** A gobo image landing on a surface: additive, tinted, with a soft halo. */
export function GoboProjection({
  color,
  size = 1.8,
  spin = 0.08,
  intensity = 1,
  glass = false,
  ...props
}: {
  color: THREE.ColorRepresentation;
  size?: number;
  spin?: number;
  intensity?: number;
  glass?: boolean;
} & ThreeElements["group"]) {
  const texture = useLogoTexture(glass ? "glass" : "metal");
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: null as THREE.Texture | null },
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uAngle: { value: 0 },
          uGlass: { value: 0 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uMap;
          uniform vec3 uColor;
          uniform float uIntensity;
          uniform float uAngle;
          uniform float uGlass;
          varying vec2 vUv;
          void main() {
            vec2 p = vUv - 0.5;
            float c = cos(uAngle), s = sin(uAngle);
            vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y) + 0.5;
            vec4 t = texture2D(uMap, r);
            float d = length(p) * 2.0;
            float halo = smoothstep(1.0, 0.0, d) * 0.12;
            // metal: tint the silhouette; glass: project the artwork's own colours
            vec3 art = mix(uColor, t.rgb * uColor * 1.25, uGlass);
            vec3 col = art * t.a * 0.95 + uColor * halo;
            float a = (t.a * 0.95 + halo) * uIntensity;
            gl_FragColor = vec4(col * uIntensity, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  useLayoutEffect(() => {
    material.uniforms.uMap.value = texture;
    material.uniforms.uColor.value.set(color);
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uGlass.value = glass ? 1 : 0;
  }, [texture, color, intensity, glass, material]);
  useFrame((_, dt) => {
    material.uniforms.uAngle.value += dt * spin;
  });
  if (!texture) return null;
  return (
    <group {...props}>
      <mesh rotation-x={-Math.PI / 2} material={material} renderOrder={6}>
        <planeGeometry args={[size, size]} />
      </mesh>
    </group>
  );
}

/** Cold-spark fountain: ballistic particles computed on the GPU. */
export function SparkFountain({
  count = 380,
  height = 2.6,
  rate = 0.9,
  ...props
}: { count?: number; height?: number; rate?: number } & ThreeElements["group"]) {
  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const vel = new Float32Array(count * 3);
    const v0 = Math.sqrt(2 * 9.8 * height);
    for (let i = 0; i < count; i++) {
      seed[i] = Math.random();
      const a = Math.random() * Math.PI * 2;
      const spread = Math.random() * 0.16;
      const speed = v0 * (0.75 + Math.random() * 0.3);
      vel[i * 3] = Math.cos(a) * spread * speed;
      vel[i * 3 + 1] = speed;
      vel[i * 3 + 2] = Math.sin(a) * spread * speed;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aVel", new THREE.BufferAttribute(vel, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uRate: { value: rate }, uLife: { value: (2 * v0) / 9.8 } },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute vec3 aVel;
        uniform float uTime;
        uniform float uRate;
        uniform float uLife;
        varying float vHeat;
        void main() {
          float t = fract(uTime * uRate / uLife + aSeed) * uLife;
          vec3 p = aVel * t + vec3(0.0, -4.9 * t * t, 0.0);
          p.y = max(p.y, 0.0);
          vHeat = 1.0 - t / uLife;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (14.0 + 20.0 * vHeat) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vHeat;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = smoothstep(1.0, 0.0, d) * (0.35 + vHeat);
          vec3 col = mix(vec3(1.0, 0.45, 0.1), vec3(1.0, 0.95, 0.8), vHeat);
          gl_FragColor = vec4(col * a, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [count, height, rate]);
  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <group {...props}>
      <points geometry={geometry} material={material} frustumCulled={false} renderOrder={9} />
    </group>
  );
}
