import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "./hooks/useAuth";
// import { usePushNotifications } from "./hooks/usePushNotifications";
import { LoginScreen } from "./components/LoginScreen";
import { WebViewScreen } from "./components/WebViewScreen";

export default function RootLayout() {
  const { accessToken, isLoading, login, logout } = useAuth();

  // 푸시 알림 훅 호출 (UI에 영향을 주지 않음)
  // usePushNotifications();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {accessToken ? (
          <WebViewScreen accessToken={accessToken} onLogout={logout} />
        ) : (
          <LoginScreen onLoginPress={login} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
  },
});
