# 📱 기다려짐 Mobile Application

- React Native(Expo) 기반의 하이브리드 앱 쉘
- 웹뷰를 통해 웹앱을 래핑하고, 네이티브 기능을 제공

## 🛠 Tech Stack

- **Framework**: Expo 54, React Native 0.81
- **Language**: TypeScript 5.9
- **Key Libraries**:
  - `react-native-webview`: 웹뷰 통합 및 브릿지 통신

## ⚙️ Development Environment Setup

### ⚠️ Current Environment Constraints (중요)

현재 개발 환경에서 로컬 네트워크(IP)를 통한 백엔드 통신 시 CORS 보안 정책 이슈가 있어, **모바일 앱 구동 시에는 배포된 웹 서버를 바라보도록 설정**됨

- **WebView URL**: Production URL (`https://waitgym.life`) 사용
- **Local Debugging**: UI/UX 수정 사항은 로컬 웹 환경에서 우선 검증 후 배포하여 모바일에서 확인

### Prerequisites

- Node.js 18+
- Expo Go App (On Real Device)

## 🏃 Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 (.env 파일 생성)
# 주의: CORS 정책으로 인해 로컬 IP 대신 배포된 URL을 사용
EXPO_PUBLIC_WEBVIEW_URL=[https://waitgym.life](https://waitgym.life)

# 3. 개발 서버 실행
npm start
```

## 🌉 WebView Bridge Protocol (핵심 기능)

앱(Native)과 웹(Web)은 `postMessage`를 통해 유기적으로 통신

### 1. Web ➡️ Native (웹이 앱에게 요청)

| Action Type         | Payload       | 설명                                          |
| ------------------- | ------------- | --------------------------------------------- |
| `native-back-press` | `MODAL_CLOSE` | 웹의 모달이 닫혔음을 앱에 알림 (앱 종료 방지) |

### 2. Native ➡️ Web (앱이 웹에게 요청)

| Action Type           | Payload | 설명                                        |
| --------------------- | ------- | ------------------------------------------- |
| `ANDROID_BACK_BUTTON` | -       | 안드로이드 물리 백버튼 이벤트를 웹으로 전달 |

## 📱 주요 기능 구현

### 안드로이드 백버튼 제어 (UX 최적화)

웹뷰 내에서 모달이 열려있을 때 앱이 종료되지 않도록 `BackHandler` 이벤트를 가로채어 웹으로 신호를 전달

```typescript
// 예시 코드
const backAction = () => {
  if (webViewRef.current) {
    // 웹에게 백버튼 눌림 신호 전송
    webViewRef.current.postMessage(
      JSON.stringify({ type: "ANDROID_BACK_BUTTON" })
    );
    return true; // 앱 종료 방지
  }
  return false;
};
```
