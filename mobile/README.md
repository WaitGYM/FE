## EXPO GO에서 확인법

- 앱스토어에서 Expo GO 다운로드
- `FE/mobile` env 파일 생성 후 `EXPO_PUBLIC_WEBVIEW_URL="https://waitgym.life"` 입력 후 저장
- `FE/mobile` npm run start
- 'S'키 눌러서 `Using Expo Go`로 변경
- 생성된 QR로 접속
- 모바일에서 Expo Go 선택

#### 로컬 환경

모바일 로컬에서 확인하려면 개발환경의 아이피로 앱과 웹을 통신해야하는데 아이피로 접속시 백엔드는 통신 불가능(cors이슈)하므로 로컬의 웹은 확인할수 없음

---

## 앱 설치 파일 추출

- Install EAS CLI

```npm install eas-cli

```

- Create an Expo account and login(by share account)

```eas login

```

- Configure your project (> All)

```eas build:configure

```

- Create a build (android)

```eas build --platform android

```

- Create a build (ios)

```eas build --platform ios

```
