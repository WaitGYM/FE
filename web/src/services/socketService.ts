import { useNotificationStore } from "../stores/notificationStore";

interface ServerNotificationPayload {
  type: string;
  message: string;
}

let socket: WebSocket | null = null;
const WEBSOCKET_URL = `${import.meta.env.VITE_API_BASE_URL}/ws`;

// 재연결 시도를 위한 변수
let isReconnecting = false;

const connectWebSocket = (userId: string | number) => {
  // 기존 연결이 있다면 종료
  if (socket) {
    socket.close();
  }

  // 새 웹소켓 연결 시작
  socket = new WebSocket(`${WEBSOCKET_URL}`);

  // 연결이 성공적으로 열렸을 때
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "auth",
        token: userId,
      })
    );

    // console.log("순수 웹소켓 연결 성공!");
    isReconnecting = false;
  };

  // 서버로부터 메시지를 받았을 때
  socket.onmessage = (event) => {
    try {
      // 데이터는 보통 문자열 형태의 JSON이므로 파싱합니다.
      const data: ServerNotificationPayload = JSON.parse(event.data);
      // console.log("새로운 메시지 수신:", data);

      if (
        data.type === "EQUIPMENT_AVAILABLE" ||
        data.type === "QUEUE_EXPIRED" ||
        data.type === "WAITING_COUNT"
      ) {
        // console.log("새로운 메시지 수신:", data.type, data.message);
        useNotificationStore.getState().addNotification({
          id: Date.now(),
          createdAt: new Date().toISOString(),
          ...data,
        });
      }
    } catch (error) {
      console.error("메시지 파싱 오류:", error);
    }
  };

  // 에러가 발생했을 때
  socket.onerror = (error) => {
    console.error("웹소켓 에러 발생:", error);
  };

  // 연결이 닫혔을 때 (가장 중요한 차이점!)
  socket.onclose = () => {
    // console.log("웹소켓 연결이 닫혔습니다. 3초 후 재연결을 시도합니다.");
    // 자동 재연결 로직
    if (!isReconnecting) {
      isReconnecting = true;
      setTimeout(() => {
        connectWebSocket(userId);
      }, 3000); // 3초 후 재연결 시도
    }
  };
};

export const socketService = {
  connect: (userId: string | number): void => {
    connectWebSocket(userId);
  },

  disconnect: (): void => {
    if (socket) {
      // 재연결 로직을 막기 위해 onclose 핸들러를 비활성화하고 연결을 닫습니다.
      socket.onclose = null;
      socket.close();
      socket = null;
    }
  },
};
