# 🌐 기다려짐 Web Application

실질적인 비즈니스 로직과 UI가 구현된 React 기반 웹앱

## 🏗️ Architecture & Design Pattern

유지보수성과 기능별 응집도를 높이기 위해 **기능 중심(Feature-based) 아키텍처**를 채택

### Directory Structure Decision

```
src/
├── features/           # 도메인별 기능 모듈 (핵심)
│   ├── reservation/   # [예약] 관련 API, Store, Components 집합
│   ├── workout/       # [운동] 타이머, 세션 로직 집합
│   └── ...
├── components/ui/      # 도메인과 무관한 재사용 가능한 공통 UI (Button, Input)
├── stores/            # 전역 상태 관리 (Zustand)
└── services/          # 외부 통신 (Axios, WebSocket)
```

## 🛠 Tech Stack Details

- **Core**: React 19, TypeScript
- **State**: Zustand
- **Styling**: SCSS, MUI Base
- **Animation**: Framer Motion
- **Networking**: Axios (API), WebSocket (Notification)

## 💡 Key Features

### 1. 하이브리드 최적화 (Hybrid Optimization)

- **모달 제어**: `window.addEventListener('message')`를 통해 앱의 물리 백버튼 신호를 감지하여 모달 제어
- **반응형**: 모바일 뷰포트에 최적화된 `Touch` 인터랙션과 레이아웃을 제공

### 2. 데이터 동기화 전략 (Data Sync Strategy)

서버 부하와 사용자 경험 사이의 균형을 맞추기 위해 **이원화된 동기화 방식**을 사용했습니다.

- **실시간 알림 (WebSocket)**: '내 차례', '대기열 발생'등 즉시성이 필요한 중요 정보는 웹소켓으로 지연 없이 전달
- **현황 데이터 (Polling & Manual)**: 전체 기구의 대기열 변동 사항은 **30초 주기의 Polling**으로 갱신하며, 사용자가 원할 때 즉시 확인할 수 있도록 **새로고침 UI**를 제공

## 🚀 Setup & Run

```bash
npm install
npm run dev
```
