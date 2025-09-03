## 모바일에서 확인법

- mobile, web 폴더 각각에서 npm install
- web 실행 `npm run dev` 후 IP 주소 12자리 획득
- mobile 폴더에 env 파일 생성 후 `EXPO_PUBLIC_LOCAL_ADDRES="IP 주소"` 입력 후 저장
- 앱스토어에서 Expo GO 다운로드
- mobile 실행(npm run start)
- 터미널에 생성된 QR로 접속(동일 IP 환경이어야 확인 가능)
