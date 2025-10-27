import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WorkoutModeType } from "../types";

interface UIStateType {
  workoutMode: WorkoutModeType | null;
  setWorkoutMode: (workoutMode: WorkoutModeType) => void;

  routineId: number | null;
  setRoutineId: (routineId: number) => void;
  resetWorkoutMode: () => void;

  isWorkingOut: boolean;
  setWorkingOut: (isWorkingOut: boolean) => void;

  isRestTimerModalOpen: boolean;
  toggleRestTimerModalOpen: () => void;

  isRestTimerMiniView: boolean;
  setIsRestTimerMiniView: (isMiniView: boolean) => void;
}

export const useUIStore = create<UIStateType>()(
  devtools((set, get) => ({
    workoutMode: null,
    routineId: null,
    setWorkoutMode: (workoutMode) => set({ workoutMode }),
    setRoutineId: (routineId) => set({ routineId }),
    // 운동모드 리셋시 진행중인 루틴값도 리셋
    resetWorkoutMode: () =>
      set({
        workoutMode: null,
        routineId: null,
      }),

    isWorkingOut: false,
    setWorkingOut: (isWorkingOut) => set({ isWorkingOut }),

    isRestTimerModalOpen: false,
    toggleRestTimerModalOpen: () =>
      set((state) => ({ isRestTimerModalOpen: !state.isRestTimerModalOpen })),

    isRestTimerMiniView: false,
    setIsRestTimerMiniView: (isRestTimerMiniView) =>
      set({ isRestTimerMiniView }),
  }))
);
