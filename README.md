<div align="center">

# 💪 기다려짐 - Frontend

<span style="color:#808080">헬스장에서 지루한 대기시간이 **기다려짐**</span>

[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://waitgym-fe-web-two.vercel.app)

[🌐 서비스 바로가기](https://waitgym-fe-web-two.vercel.app) | [📱 Mobile Repository](https://github.com/WaitGYM/FE/tree/main/mobile) | [🔗 Organization](https://github.com/WaitGYM)

---

</div>

## 📖 프로젝트 소개

헬스장에서 불편한 대면 및 대기상황으로 인해 플랜진행이 어려운 문제해결을 위한  
효율적인 플랜진행을 돕는 **기구 대기 서비스 "기다려짐"** 의 프론트엔드입니다.

### 🎯 핵심 기능

### 1. 👤 **운동 루틴 관리**

> 내가 사용하고싶은 운동기구와 세트수를 추가, 수정, 삭제해 **나의 운동루틴**을 관리할수 있습니다.

![운동루틴관리](./images/mockup01.gif)

---

### 2. 📋 **기구 예상 대기시간 파악**

> 기구마다 **예상 대기 시간**과 **자동제안** 기능으로 대기가 적은 플랜을 제공하여, 무분별하게 기다리는 상황없이 유연한 운동계획이 가능합니다.

<!-- [게스트 로그인 기능 시연 GIF/이미지] -->

---

### 3. 💺 **기구 예약 시스템**

> 사용 중인 기구를 실시간으로 예약하고, 내 차례가 되면 알림을 받아 효율적으로 운동할 수 있습니다.

<!-- [기구 예약 시스템 시연 GIF/이미지] -->

---

### 4. 🔔 **실시간 알림**

> WebSocket을 통해 대기 순서 변경, 운동 시작/종료 등 주요 이벤트에 대한 알림을 실시간으로 제공합니다.

<!-- [실시간 알림 시연 GIF/이미지] -->

---

## 🛠 기술 스택

### Web Application

```
Frontend Framework    React 19 + TypeScript
Build Tool           Vite
State Management     Zustand
Styling              Sass (SCSS)
Animation            Framer Motion
Drag & Drop          @dnd-kit
Icons                Lucide React
```

**선택 이유:**

- **React**: 컴포넌트 기반 아키텍처를 통해 재사용 가능하고 관리하기 쉬운 UI 구축
- **Vite**: 빠른 개발 서버와 빌드 속도로 개발 생산성 향상
- **TypeScript**: 정적 타입 지원으로 코드 안정성 및 가독성 향상, 런타임 오류 사전 방지
- **Zustand**: 가볍고 간단한 API로 복잡한 보일러플레이트 없이 효율적인 상태 관리
- **Sass**: 변수, 믹스인, 중첩 등의 기능으로 CSS를 효율적으로 작성 및 유지보수

### Mobile Application

```
Framework            React Native + Expo
Language             TypeScript
Secure Storage       Expo Secure Store
Push Notifications   Expo Notifications
WebView              React Native WebView
Authentication       Expo Auth Session
```

**선택 이유:**

- **React Native with Expo**: 하나의 코드베이스로 iOS/Android 동시 개발, 네이티브 코드 설정 없이 빠른 개발 시작
- **Expo Secure Store**: 인증 토큰 등 민감한 정보를 안전하게 기기에 저장
- **Expo Notifications**: 운동 순서 알림 등 푸시 알림 구현

---

## 📁 프로젝트 구조

```
FE/
├── 📱 mobile/
│   ├── assets/         # 폰트, 이미지 등 정적 에셋
│   ├── components/     # React Native 공통 컴포넌트
│   ├── hooks/          # 커스텀 훅
│   ├── services/       # API 서비스
│   ├── types/          # TypeScript 타입 정의
│   ├── App.tsx         # 모바일 앱 진입점
│   └── package.json    # 의존성 및 스크립트
│
└── 🌐 web/
    ├── src/
    │   ├── assets/         # 폰트, 이미지 등 정적 에셋
    │   ├── components/     # 공통 UI 컴포넌트
    │   ├── features/       # 도메인별 기능 컴포넌트
    │   ├── hooks/          # 커스텀 훅
    │   ├── routes/         # 라우팅 설정
    │   ├── services/       # API 클라이언트, 소켓 서비스
    │   ├── stores/         # Zustand 상태 관리 스토어
    │   ├── styles/         # Sass 스타일 시트
    │   └── types/          # TypeScript 타입 정의
    ├── package.json        # 의존성 및 스크립트
    └── vite.config.ts      # Vite 설정
```

### 🎨 설계 패턴

#### Atomic Design Pattern

컴포넌트를 `features` (도메인별), `components/ui` (재사용 가능한 UI 요소)로 구분하여 컴포넌트의 재사용성과 유지보수성 향상

#### Store Pattern (with Zustand)

전역 상태를 `stores` 디렉토리에서 중앙 집중적으로 관리하여 상태 변화를 예측 가능하게 하고, 컴포넌트 간 상태 공유 용이

#### Container/Presenter Pattern

- **Container** (`features`): 데이터 로직과 비즈니스 로직 처리
- **Presenter** (`components`): UI 렌더링에 집중

---

## ✨ 주요 기능 & 구현

### 🔐 인증 시스템 (Authentication)

#### OAuth 2.0 구현

- **Google OAuth** 연동으로 안전하고 편리한 로그인
- `react-router-dom`을 활용한 로그인 성공 후 리디렉션 및 인증 토큰 처리
- **Web & Mobile 연동**: `expo-auth-session`과 `react-native-webview`로 동일한 OAuth 프로세스 공유

#### 게스트 로그인

- 회원가입 없이 서비스 핵심 기능 체험 가능
- 사용자 초기 진입 장벽 완화 및 접근성 향상

### 🧭 라우팅 시스템

**Web**: `react-router-dom`으로 URL 경로에 따른 적절한 페이지 컴포넌트 렌더링

**Mobile**: `react-native-webview`를 통한 웹뷰 내 상호작용, 일부 네이티브 기능은 Expo 라이브러리로 구현

### 📊 상태 관리

**Web**: `Zustand`로 사용자 인증 정보, 운동 기구 목록 등 다양한 전역 상태 관리

**Mobile**: `expo-secure-store`로 로그인 토큰 관리, 주요 상태는 웹뷰와 통신하여 동기화

### 🔄 실시간 통신

**WebSocket** 기반 실시간 업데이트

- 대기열 순서 변경 즉시 반영
- 사용자 알림 실시간 푸시
- 기구 사용 현황 실시간 동기화

### 🎭 인터랙티브 UI

**드래그 앤 드롭** (`@dnd-kit/core`, `@dnd-kit/sortable`)

- 운동 루틴 순서를 직관적으로 변경
- 터치/마우스 이벤트 모두 지원

**애니메이션** (`framer-motion`)

- 부드러운 페이지 전환 효과
- 마이크로 인터랙션으로 사용자 경험 향상

---

## ♿️ 웹 접근성 (Web Accessibility)

모든 사용자가 원활하게 서비스를 이용할 수 있도록 웹 접근성을 준수하고자 노력했습니다.

### 🏷 시맨틱 HTML

HTML5 시맨틱 태그를 사용하여 웹 페이지 구조를 명확하게 하고, 스크린 리더 사용자의 콘텐츠 이해 지원

### 🎯 ARIA 속성

동적인 UI 컴포넌트(모달, 드롭다운 등)에 ARIA 속성을 부여하여 보조 기술 사용자의 상호작용 지원

### ⌨️ 키보드 네비게이션

모든 기능은 마우스 없이 키보드만으로도 접근 및 사용 가능하도록 구현

---

## 🚀 성능 최적화

### Code Splitting

`vite.config.ts`의 `manualChunks` 설정으로 큰 라이브러리를 별도 청크로 분리하여 **초기 로딩 속도 개선**

### Component Memoization

`React.memo`와 `useMemo`를 사용하여 **불필요한 리렌더링 방지**

### API 통신 최적화

`axios`를 사용한 비동기 통신으로 효율적인 데이터 페칭

---

## 🔧 트러블슈팅

### 게스트 로그인을 통한 사용성 개선

**🚨 문제**

- 프로젝트 평가자나 개인정보 노출을 원치 않는 사용자는 Google 계정 로그인을 불편하게 느낌
- 서비스 체험의 초기 진입 장벽 존재

**✅ 해결**

- 별도의 회원가입 없이 핵심 기능을 체험할 수 있는 **게스트 로그인 기능** 구현
- 사용자 초기 허들 완화 및 접근성 향상
- 게스트 세션 관리로 임시 데이터 저장 지원

### 웹 폰트 최적화: 2MB → 107KB (95% 감소)

**🚨 문제**

- Pretendard 웹 폰트 용량이 2MB로 초기 로딩 속도 저하
- 실제 사용하지 않는 11,172개의 한글 글자가 모두 포함

**✅ 해결**

- fonttools와 pyftsubset으로 Font Subsetting 구현
- 프로젝트에서 실제 사용하는 글자만 추출하여 서브셋 폰트 생성
- <link rel="preload">로 폰트 로딩 우선순위 설정
- CDN 대신 자체 호스팅으로 서버 장애 대응 및 속도 개선

**📊 결과**

- 폰트 용량 95% 감소 (2MB → 107KB)
- Lighthouse Performance 점수 대폭 개선

---

## 📝 코딩 컨벤션

### Naming Convention

```typescript
// 컴포넌트
PascalCase: UserProfile.tsx, EquipmentCard.tsx;

// 변수/함수
camelCase: getUserData(), isAuthenticated;

// 인터페이스/타입
PascalCase: User, EquipmentData, ApiResponse;
```

### ESLint & TypeScript

- **ESLint**: `eslint.config.js` 규칙 준수
- **typescript-eslint**: TypeScript 코드 스타일 강제
- **eslint-plugin-react-hooks**: React Hook 올바른 사용 보장
- **tsconfig.json**: 엄격한 타입 체크 적용, 경로 별칭으로 import 경로 간결화

---

## 👥 멤버 소개

<div align="center">
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/uri122">
        <img src="https://avatars.githubusercontent.com/u/64038879?v=4" width="100" alt="uri"/>
      </a><br />
      <a href="https://github.com/uri122"><b>최우리</b></a><br />
      Frontend Developer
    </td>
    <td align="center">
      <a href="https://github.com/lyla-bae">
        <img src="https://avatars.githubusercontent.com/u/188743295?v=4" width="100" alt="배근영"/>
      </a><br />
      <a href="https://github.com/lyla-bae"><b>배근영</b></a><br />
      Frontend Developer
    </td>
  </tr>
</table>
</div>

---

## 📆 프로젝트 기간

- 전체 기간: `2024.10 ~ 진행중`
- 개발 기간: `2025.08 ~ 진행중`

## 🔗 Links

- 🌐 [기다려짐 바로가기](https://waitgym.life)
- 📂 [Organization](https://github.com/WaitGYM)
- 🔙 [Backend Repository](https://github.com/WaitGYM/BE)

---

<div align="center">

Copyright 기다려짐. All rights reserved.

</div>
