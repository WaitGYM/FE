# 📱 기다려짐 Mobile Application

- React Native(Expo) 기반의 하이브리드 앱 쉘
- 웹뷰를 통해 웹앱을 래핑하고, 네이티브 기능을 제공

<br>

## 🛠 Tech Stack

- **Framework**: Expo 54, React Native 0.81
- **Language**: TypeScript 5.9
- **Key Libraries**:
  - `react-native-webview`: 웹뷰 통합 및 브릿지 통신

<br>

## ⚙️ Development Environment Setup

### ⚠️ Current Environment Constraints (중요)

현재 개발 환경에서 로컬 네트워크(IP)를 통한 백엔드 통신 시 CORS 보안 정책 이슈가 있어, **모바일 앱 구동 시에는 배포된 웹 서버를 바라보도록 설정**됨

- **WebView URL**: Production URL (`https://waitgym.life`) 사용
- **Local Debugging**: UI/UX 수정 사항은 로컬 웹 환경에서 우선 검증 후 배포하여 모바일에서 확인

### 🔧 Prerequisites

- Node.js 18+
- Expo Go App (On Real Device)

<br>

## 📱 Key Features & Implementation

### 1. Google OAuth WebView 호환성 처리

- Google의 보안 정책상 일반적인 WebView에서는 로그인이 차단
- 이를 해결하기 위해 Native 단에서 UserAgent를 모바일 브라우저 환경으로 위장하여 로그인을 지원

```typescript
<WebView
  userAgent="Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36"
  // ... other props
/>
```

### 2. 안드로이드 백버튼 제어 (UX 최적화)

웹뷰 내에서 모달이 열려있을 때 앱이 종료되지 않도록 `BackHandler` 이벤트를 가로채어 웹으로 신호를 전달

<br>

## 🌉 Bridge Protocol

| Action Type           | Payload       | 설명                               |
| --------------------- | ------------- | ---------------------------------- |
| `native-back-press`   | `MODAL_CLOSE` | 웹의 모달 닫힘 상태 동기화         |
| `ANDROID_BACK_BUTTON` | -             | 안드로이드 물리 백버튼 이벤트 전달 |

<br>

## 🚀 Setup & Run

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 (.env 파일 생성)
EXPO_PUBLIC_WEBVIEW_URL=[https://waitgym.life](https://waitgym.life)

# 3. 개발 서버 실행
npm run start
```
