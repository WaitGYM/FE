import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, BackHandler, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const LOCAL_ADDRESS = process.env.EXPO_PUBLIC_LOCAL_ADDRES;

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isWebModalOpen, setIsWebModalOpen] = useState(false);

  // 웹에서 받은 메시지 처리
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "ready") {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "native-action",
            payload: "Hello from Expo!",
          })
        );
      } else if (data.type === "custom") {
        // 모달은 웹 히스토리 관리가 안되므로 따로 제어
        switch (data.payload) {
          case "MODAL_OPEN":
            setIsWebModalOpen(true);
            break;
          case "MODAL_CLOSE":
            setIsWebModalOpen(false);
            break;
        }
      }
    } catch (err) {
      console.warn("메시지 파싱 실패:", event.nativeEvent.data);
    }
  };

  useEffect(() => {
    // 안드로이드 뒤로가기 버튼 동작시
    const onBackPress = () => {
      // 웹에서 열린 모달이 있을 경우 - 모달은 웹 히스토리 관리가 안되므로 따로 제어
      if (isWebModalOpen) {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "native-back-press",
            payload: "MODAL_CLOSE",
          })
        );
        return true;
      }

      // 웹 히스토리가 있을 경우
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }

      // 히스토리 없을 경우 앱 종료
      if (Platform.OS === "android") {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove();
    };
  }, [canGoBack, isWebModalOpen]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: `http://${LOCAL_ADDRESS}:5173` }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        originWhitelist={["*"]}
        allowsBackForwardNavigationGestures={true}
        // iOS 전용 설정
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled={false}
        bounces={false}
        // 추가 iOS 최적화
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={handleMessage}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
    // iOS에서 추가 안전 영역 확보
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  webview: { flex: 1, backgroundColor: "#293241", margin: 0, padding: 0 },
});
