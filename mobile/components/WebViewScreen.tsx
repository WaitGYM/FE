import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { WEBVIEW_URL } from "../constants/appConstants";

interface MainWebViewProps {
  accessToken: string | null;
  onLogout: () => void;
}

export const WebViewScreen: React.FC<MainWebViewProps> = ({
  accessToken,
  onLogout,
}) => {
  const uriWithToken = `${WEBVIEW_URL}?token=${accessToken}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: uriWithToken }}
        style={styles.webview}
        onMessage={(event) => {
          if (event.nativeEvent.data === "logout") {
            onLogout();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});
