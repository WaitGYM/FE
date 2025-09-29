import { create } from "zustand";
import type { NotificationType } from "../types";
import { devtools } from "zustand/middleware";

interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  popupMessage: NotificationType | null;
}

interface NotificationActions {
  addNotification: (notification: NotificationType) => void;
  markAllAsRead: () => void;
  clearPopupMessage: () => void;
}

export const useNotificationStore = create<
  NotificationState & NotificationActions
>()(
  devtools((set) => ({
    notifications: [],
    unreadCount: 0,
    popupMessage: null,

    addNotification: (newNotification) =>
      set((state) => ({
        notifications: [
          { ...newNotification, read: false },
          ...state.notifications,
        ],
        unreadCount: state.unreadCount + 1,
        popupMessage: { ...newNotification, read: false },
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),
    clearPopupMessage: () => {
      set({ popupMessage: null });
    },
  }))
);
