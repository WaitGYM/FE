// services/notificationService.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const notificationService = {
  registerForPushNotificationsAsync: async (): Promise<string | undefined> => {
    // ... (이전 index.tsx에 있던 registerForPushNotificationsAsync 함수 내용 전체를 여기에 붙여넣기)
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("푸시 알림을 위한 토큰을 얻는 데 실패했습니다!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("푸시 알림은 실제 기기에서만 작동합니다.");
    }

    return token;
  },

  // 알림 리스너 설정
  addNotificationListeners: (
    onReceived: (notification: Notifications.Notification) => void,
    onResponse: (response: Notifications.NotificationResponse) => void
  ) => {
    const notificationListener =
      Notifications.addNotificationReceivedListener(onReceived);
    const responseListener =
      Notifications.addNotificationResponseReceivedListener(onResponse);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  },
};
