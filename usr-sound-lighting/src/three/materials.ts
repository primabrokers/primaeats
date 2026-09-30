import * as THREE from "three";

/** Additive light-shaft material: brightest at the lens, fading along the beam and at its silhouette. */
export function createBeamMaterial(color: THREE.ColorRepresentation, intensity = 1) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying float vAlong;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      varying vec3 vWorld;
      void main() {
        vAlong = uv.y;
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vec4 mv = viewMatrix * world;
        vViewDir = normalize(-mv.xyz);
        vNormalV = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uTime;
      varying float vAlong;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      varying vec3 vWorld;
      void main() {
        float along = pow(1.0 - vAlong, 1.35);
        float edge = pow(abs(dot(normalize(vNormalV), normalize(vViewDir))), 1.6);
        // slow drifting haze so the shaft doesn't look like glass
        float haze = 0.78 + 0.22 * sin(vWorld.x * 1.7 + uTime * 0.6) * sin(vWorld.y * 2.3 - uTime * 0.45);
        float a = along * edge * haze * uIntensity * 0.55;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/** Soft round light pool for where a beam lands. */
export function createPoolMaterial(color: THREE.ColorRepresentation) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uIntensity: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = smoothstep(1.0, 0.15, d) * 0.9 + smoothstep(0.35, 0.0, d) * 0.5;
        a *= uIntensity;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Twinkling point sprites — used for starlit floors, haze specks, sparks and fog. */
export function createSparkleMaterial(opts: {
  color: THREE.ColorRepresentation;
  size: number;
  twinkle?: number;
  opacity?: number;
  soft?: boolean;
}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(opts.color) },
      uTime: { value: 0 },
      uSize: { value: opts.size },
      uTwinkle: { value: opts.twinkle ?? 1 },
      uOpacity: { value: opts.opacity ?? 1 },
      uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uSize;
      uniform float uTwinkle;
      uniform float uPixelRatio;
      varying float vGlow;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float tw = 0.5 + 0.5 * sin(uTime * (1.2 + aSeed * 2.6) + aSeed * 40.0);
        vGlow = mix(1.0, pow(tw, 3.0), uTwinkle);
        gl_PointSize = uSize * uPixelRatio * (0.6 + aSeed * 0.8) / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vGlow;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float a = ${opts.soft ? "smoothstep(1.0, 0.0, d) * 0.6" : "smoothstep(1.0, 0.2, d)"};
        a *= vGlow * uOpacity;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

export const metal = {
  body: new THREE.MeshStandardMaterial({ color: "#272833", roughness: 0.5, metalness: 0.35 }),
  dark: new THREE.MeshStandardMaterial({ color: "#0c0d12", roughness: 0.8, metalness: 0.2 }),
  truss: new THREE.MeshStandardMaterial({ color: "#c9ccd6", roughness: 0.35, metalness: 0.85 }),
  trussBlack: new THREE.MeshStandardMaterial({ color: "#2a2c35", roughness: 0.45, metalness: 0.7 }),
  grille: new THREE.MeshStandardMaterial({ color: "#30313b", roughness: 0.85, metalness: 0.3 }),
  cone: new THREE.MeshStandardMaterial({ color: "#121318", roughness: 0.95, metalness: 0, side: THREE.DoubleSide }),
  chrome: new THREE.MeshStandardMaterial({ color: "#e6e8ef", roughness: 0.15, metalness: 1 }),
  fabric: new THREE.MeshStandardMaterial({ color: "#0f1016", roughness: 1, metalness: 0 }),
  deck: new THREE.MeshStandardMaterial({ color: "#16171d", roughness: 0.7, metalness: 0.1 }),
};
