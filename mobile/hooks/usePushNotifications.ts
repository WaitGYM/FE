// hooks/usePushNotifications.ts
import { useEffect } from "react";
import { notificationService } from "../services/pushNotificationService";

export const usePushNotifications = () => {
  useEffect(() => {
    notificationService.registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // TODO: 이 토큰을 서버로 보내서 저장하는 로직
        console.log("푸시 알림 토큰:", token);
      }
    });

    const removeListeners = notificationService.addNotificationListeners(
      (notification) => console.log("알림 수신:", notification),
      (response) => console.log("알림 응답:", response)
    );

    return () => removeListeners();
  }, []);
};
