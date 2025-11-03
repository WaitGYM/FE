import { apiClient } from "../../../services/apiClient";

export const notificationApi = {
  getNotificationList: () => apiClient.get(`/notifications`),
  getUnreadNotiCount: () => apiClient.get(`/notifications/unread-count`),
};
