import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WorkoutModeType } from "../types";

interface UIStateType {
  currentUserId: number | null;
  setUserId: (id: number | null) => void;

  isEquipAutoSorting: boolean;
  setIsEquipAutoSorting: (val: boolean) => void;

  workoutMode: WorkoutModeType | null;
  setWorkoutMode: (workoutMode: WorkoutModeType) => void;

  routineId: number | null;
  setRoutineId: (routineId: number) => void;
  resetWorkoutMode: () => void;

  isWorkingOut: boolean;
  setWorkingOut: (isWorkingOut: boolean) => void;

  isRestTimerModalOpen: boolean;
  setRestTimerModalOpen: (isRestTimerModalOpen: boolean) => void;

  isRestTimerMiniView: boolean;
  setIsRestTimerMiniView: (isMiniView: boolean) => void;
}

const today = new Date().toISOString().split("T")[0];

const getKeys = (uid: number) => ({
  toggle: `user_${uid}_equip_sort`,
  date: `user_${uid}_equip_date`,
});

export const useUIStore = create<UIStateType>()(
  devtools((set, get) => ({
    currentUserId: null,
    setUserId: (id) => {
      set({ currentUserId: id });
      if (!id) {
        set({ isEquipAutoSorting: false });
        return;
      }

      const { toggle, date } = getKeys(id);
      const storedDate = localStorage.getItem(date);
      const storedToggle = localStorage.getItem(toggle);

      if (storedDate === today && storedToggle === "true") {
        set({ isEquipAutoSorting: true });
      } else {
        localStorage.removeItem(toggle);
        localStorage.setItem(date, today);
        set({ isEquipAutoSorting: false });
      }
    },

    isEquipAutoSorting: false,
    setIsEquipAutoSorting: (val) => {
      set({ isEquipAutoSorting: val });

      const { currentUserId } = get();
      if (currentUserId) {
        const { toggle, date } = getKeys(currentUserId);
        localStorage.setItem(toggle, JSON.stringify(val));
        localStorage.setItem(date, today);
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
    setRestTimerModalOpen: (isRestTimerModalOpen) =>
      set({ isRestTimerModalOpen }),

    isRestTimerMiniView: false,
    setIsRestTimerMiniView: (isRestTimerMiniView) =>
      set({ isRestTimerMiniView }),
  })),
);
