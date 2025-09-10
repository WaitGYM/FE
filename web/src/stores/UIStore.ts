import { create } from "zustand";
import type { WorkoutModeType } from "../types";

interface UIStateType {
  workoutMode: WorkoutModeType;
  setWorkoutMode: (workoutMode: WorkoutModeType) => void;
  planId: number | null;
  setPlanId: (planId: number) => void;
}

export const useUIStore = create<UIStateType>((set) => ({
  workoutMode: "direct",
  setWorkoutMode: (workoutMode) => set({ workoutMode }),
  planId: null,
  setPlanId: (planId) => set({ planId }),
}));
