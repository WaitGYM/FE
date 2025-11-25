import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, BackHandler, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";
// import { pushNotificationService } from "./services/pushNotificationService";

const WEBVIEW_URL = process.env.EXPO_PUBLIC_WEBVIEW_URL;

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

  // 푸시알림 처리 - 제미나이
  // const handleWebViewMessage = (event: WebViewMessageEvent) => {
  //   const message = event.nativeEvent.data;
  //   console.log("웹으로부터 받은 메시지:", message);

  //   // 웹에서 푸시 토큰을 요청하면
  //   if (message === "requestPushToken") {
  //     // 네이티브 기능(푸시 알림 등록)을 호출
  //     pushNotificationService.register().then((token) => {
  //       if (token && webViewRef.current) {
  //         // 얻어낸 토큰을 웹(손님)에게 다시 전달
  //         const script = `
  //           window.dispatchEvent(new MessageEvent('message', { data: { type: 'pushToken', token: '${token}' } }));
  //           true; // injectJavaScript는 반드시 문자열을 반환해야 합니다.
  //         `;
  //         webViewRef.current.injectJavaScript(script);
  //       }
  //     });
  //   }
  // };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: WEBVIEW_URL }}
          userAgent="Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36"
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          style={styles.webview}
          // 성능 및 기능 활성화
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          originWhitelist={["*"]}
          // 사용자 경험 (UX) 및 제스처
          scalesPageToFit={true}
          scrollEnabled={true}
          allowsBackForwardNavigationGestures={true}
          // iOS 전용 설정
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          bounces={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          // 통신 및 이벤트 처리
          onMessage={handleMessage}
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
  },
  webview: {
    flex: 1,
    backgroundColor: "#293241",
    margin: 0,
    padding: 0,
    marginBottom: Platform.OS === "ios" ? -34 : 0,
  },
});
