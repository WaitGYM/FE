import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/sass/main.scss";
import LoadingOverlay from "./components/ui/LoadingOverlay.tsx";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

// 푸시알림 처리를 위한 모바일과 통신
// const isWebView = () => {
//   return window.ReactNativeWebView !== undefined;
// };

// useEffect(() => {
//   // 네이티브(집주인)로부터 메시지를 받을 이벤트 리스너 설정
//   const handleNativeMessage = (event: MessageEvent) => {
//     // event.data가 객체 형태가 아닐 수 있으므로 파싱이 필요할 수 있습니다.
//     // Expo에서 injectJavaScript로 보낸 데이터는 event.data.data 로 접근
//     const { type, token } = event.data.data;

//     if (type === "pushToken" && token) {
//       console.log("네이티브로부터 푸시 토큰 수신:", token);
//       // TODO: 이 토큰을 백엔드 서버로 전송하여 저장합니다.
//       // 예: api.post('/users/push-token', { token });
//     }
//   };

//   window.addEventListener("message", handleNativeMessage);

//   // 웹뷰 환경일 경우에만 네이티브에 푸시 토큰을 요청합니다.
//   if (isWebView()) {
//     window.ReactNativeWebView.postMessage("requestPushToken");
//   }

//   // 컴포넌트 언마운트 시 이벤트 리스너 정리
//   return () => {
//     window.removeEventListener("message", handleNativeMessage);
//   };
// }, []);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LoadingOverlay />
      {/* <div id="rest-timer-portal-root" /> */}
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
