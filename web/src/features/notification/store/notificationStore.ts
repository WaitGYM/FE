import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { notificationApi } from "../services/notificationApi";
import type { NotificationType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";

interface NotificationState {
  notifications: NotificationType[];
  popupMessage: NotificationType | null;
  notificationList: NotificationType[];
  unreadNotiCount: number;
}

interface NotificationActions {
  addNotification: (notification: NotificationType) => void;
  // markAllAsRead: () => void;
  clearPopupMessage: () => void;
  getNotificationList: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  notifications: [],
  popupMessage: null,
  notificationList: [],
  unreadNotiCount: 0,
};

export const useNotificationStore = create<
  NotificationState & NotificationActions
>()(
  devtools((set) => ({
    ...initialState,

    addNotification: (newNotification) =>
      set((state) => ({
        notifications: [
          { ...newNotification, read: false },
          ...state.notifications,
        ],
        // unreadNotiCount: state.unreadNotiCount + 1,
        popupMessage: { ...newNotification, read: false },
      })),

    // markAllAsRead: () =>
    //   set((state) => ({
    //     notifications: state.notifications.map((n) => ({ ...n, read: true })),
    //     unreadNotiCount: 0,
    //   })),

    clearPopupMessage: () => {
      set({ popupMessage: null });
    },

    getNotificationList: async () => {
      setLoading(true);
      try {
        const { data } = await notificationApi.getNotificationList();
        set({
          notificationList: data.notifications.filter(
            (noti) =>
              noti.type === "EQUIPMENT_AVAILABLE" ||
              noti.type === "WAITING_COUNT" ||
              noti.type === "QUEUE_EXPIRED"
          ),
        });
      } catch (error) {
        console.log("⛔알림 목록 조회 실패!!!!", error);
      } finally {
        setLoading(false);
      }
    },

    getUnreadNotiCount: async () => {
      setLoading(true);
      try {
        const { data } = await notificationApi.getUnreadNotiCount();
        set({
          unreadNotiCount: data.unreadCount,
        });
      } catch (error) {
        console.log("⛔알림 안읽음 카운팅 조회 실패!!!!", error);
      } finally {
        setLoading(false);
      }
    },
  }))
);
