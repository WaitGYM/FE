import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WorkoutModeType } from "../types";

interface UIStateType {
  isEquipAutoSorting: boolean;
  setIsEquipAutoSorting: (val: boolean) => void;
  initIsEquipAutoSorting: () => void;

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

const TOGGLE_KEY = "equipment_toggle";
const DATE_KEY = "equipment_toggle_date";
const today = new Date().toISOString().split("T")[0];

export const useUIStore = create<UIStateType>()(
  devtools((set) => ({
    isEquipAutoSorting: false,
    setIsEquipAutoSorting: (val) => {
      localStorage.setItem(TOGGLE_KEY, JSON.stringify(val));
      localStorage.setItem(DATE_KEY, today);
      set({ isEquipAutoSorting: val });
    },
    initIsEquipAutoSorting: () => {
      const storedDate = localStorage.getItem(DATE_KEY);
      const storedToggle = localStorage.getItem(TOGGLE_KEY);

      if (storedDate === today && storedToggle === "true") {
        set({ isEquipAutoSorting: true });
      } else {
        localStorage.removeItem(TOGGLE_KEY);
        localStorage.setItem(DATE_KEY, today);
        set({ isEquipAutoSorting: false });
      }
    },

    workoutMode: null,
    setWorkoutMode: (workoutMode) => set({ workoutMode }),

    routineId: null,
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
