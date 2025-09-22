import { create } from "zustand";
import type { WorkoutModeType } from "../types";

interface UIStateType {
  workoutMode: WorkoutModeType | null;
  setWorkoutMode: (workoutMode: WorkoutModeType) => void;
  planId: number | null;
  setPlanId: (planId: number) => void;
  resetWorkoutMode: () => void;

  isWorkingOut: boolean;
  toggleWorkingOut: () => void;

  isRestTimerMiniView: boolean;
  setRestTimerMiniView: (isMini: boolean) => void;
}

export const useUIStore = create<UIStateType>((set, get) => ({
  workoutMode: null,
  planId: null,
  setWorkoutMode: (workoutMode) => set({ workoutMode }),
  setPlanId: (planId) => set({ planId }),
  // 운동모드 리셋시 진행중인 루틴값도 리셋
  resetWorkoutMode: () =>
    set({
      workoutMode: null,
      planId: null,
    }),

  isWorkingOut: false,
  toggleWorkingOut: () =>
    set({
      isWorkingOut: !get().isWorkingOut,
    }),

  isRestTimerMiniView: false,
  setRestTimerMiniView: (isRestTimerMiniView) => set({ isRestTimerMiniView }),
}));
