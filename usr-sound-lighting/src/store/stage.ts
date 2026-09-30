import { create } from "zustand";

/**
 * Shared state between the scroll layer (GSAP ScrollTrigger) and the 3D rig.
 * `cue` is discrete (which lighting look is live); `progress` is continuous
 * scroll progress through the stage section, read every frame without re-rendering.
 */
interface StageState {
  cue: number;
  setCue: (cue: number) => void;
}

export const useStage = create<StageState>((set) => ({
  cue: 0,
  setCue: (cue) => set({ cue }),
}));

export const stageScroll = { progress: 0 };
