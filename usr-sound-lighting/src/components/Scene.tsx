import { Component, lazy, Suspense, useMemo, type ReactNode } from "react";
import type { ProductViewerProps } from "../three/ProductViewer";

const HeroStage = lazy(() => import("../three/HeroStage"));
const ProductViewer = lazy(() => import("../three/ProductViewer"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** 3D is progressive: without WebGL, or while the chunk loads, the fallback shows. */
function Guarded({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  const ok = useMemo(hasWebGL, []);
  if (!ok) return <>{fallback}</>;
  return (
    <Boundary fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Boundary>
  );
}

export function HeroScene({ active, fallback }: { active: boolean; fallback: ReactNode }) {
  return (
    <Guarded fallback={fallback}>
      <HeroStage active={active} />
    </Guarded>
  );
}

export function ProductScene({ fallback, ...props }: ProductViewerProps & { fallback: ReactNode }) {
  return (
    <Guarded fallback={fallback}>
      <ProductViewer {...props} />
    </Guarded>
  );
}
