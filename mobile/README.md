## EXPO GO에서 확인법

- 앱스토어에서 Expo GO 다운로드
- mobile, web 폴더 각각에서 npm install
- web 실행 `npm run dev` 후 IP 주소 12자리 획득
- mobile 폴더에 env 파일 생성 후 `EXPO_PUBLIC_WEB_ADDRESS="IP 주소"` 입력 후 저장
- mobile 실행(npm run start)
- 터미널에 생성된 QR로 접속(동일 IP 환경이어야 확인 가능)

---

## 앱 설치 파일 추출

- Install EAS CLI

```npm install eas-cli

```

- Create an Expo account and login(by share acount)

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
