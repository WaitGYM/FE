import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PreferenceState {
  currentUserId: number | null;
  setUserId: (id: number | null) => void;

  hasDragTooltip: boolean;
  setHasDragTooltip: (val: boolean) => void;

  hasSortTooltip: boolean;
  setHasSortTooltip: (val: boolean) => void;

  hasSeenWaitRequestTooltip: boolean;
  setHasSeenWaitRequestTooltip: (val: boolean) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  devtools((set, get) => ({
    currentUserId: null,
    hasDragTooltip: false,
    hasSortTooltip: false,
    hasSeenWaitRequestTooltip: false,

    setUserId: (id) => {
      set({ currentUserId: id });

      // 로그아웃 시 모든 설정 초기화 (기본값 false)
      if (!id) {
        set({
          hasDragTooltip: false,
          hasSortTooltip: false,
          hasSeenWaitRequestTooltip: false,
        });
        return;
      }

      const keys = {
        drag: `user_${id}_drag_tooltip`,
        sort: `user_${id}_sort_tooltip`,
        wait: `user_${id}_wait_tooltip`,
      };

      set({
        hasDragTooltip: localStorage.getItem(keys.drag) === "true",
        hasSortTooltip: localStorage.getItem(keys.sort) === "true",
        hasSeenWaitRequestTooltip: localStorage.getItem(keys.wait) === "true",
      });
    },

    setHasDragTooltip: (val) => {
      set({ hasDragTooltip: val });
      const { currentUserId } = get();
      if (currentUserId)
        localStorage.setItem(`user_${currentUserId}_drag_tooltip`, String(val));
    },

    setHasSortTooltip: (val) => {
      set({ hasSortTooltip: val });
      const { currentUserId } = get();
      if (currentUserId)
        localStorage.setItem(`user_${currentUserId}_sort_tooltip`, String(val));
    },

    setHasSeenWaitRequestTooltip: (val) => {
      set({ hasSeenWaitRequestTooltip: val });
      const { currentUserId } = get();
      if (currentUserId)
        localStorage.setItem(`user_${currentUserId}_wait_tooltip`, String(val));
    },
  }))
);
