import { io, Socket } from "socket.io-client";
import { useNotificationStore } from "../features/notification/store/notificationStore";
import { useReservationStore } from "../features/reservation/stores/reservationStore";
import { useEquipmentStore } from "../stores/equipmentStore";

interface ServerNotificationPayload {
  type: string;
  message: string;
}

let socket: Socket | null = null;
const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

const connectWebSocket = (token: string) => {
  // 기존 연결이 있다면 종료
  if (socket) {
    socket.disconnect();
  }

  // Socket.IO 클라이언트 연결
  socket = io(WEBSOCKET_URL, {
    auth: {
      token: token,
    },
    transports: ["websocket", "polling"], // WebSocket 우선, 폴백으로 polling
    reconnection: true, // 자동 재연결 활성화
    reconnectionDelay: 1000, // 재연결 지연 시간 (ms)
    reconnectionDelayMax: 5000, // 최대 재연결 지연 시간
    reconnectionAttempts: Infinity, // 무제한 재연결 시도
  });

  // 연결 성공
  socket.on("connect", () => {
    console.log("Socket.IO 연결 성공!", socket?.id);
  });

  // 서버로부터 알림 메시지 수신
  socket.on("notification", (data: ServerNotificationPayload) => {
    console.log("새로운 알림 수신:", data.type, data.message);

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

      // 내차례 됐을때 현황 즉시 새로고침
      if (data.type === "EQUIPMENT_AVAILABLE") {
        useEquipmentStore.getState().triggerRefresh();
      }

      // 대기만료시 대기정보 삭제
      if (data.type === "QUEUE_EXPIRED") {
        useReservationStore.getState().resetWaitingInfoState();
        useEquipmentStore.getState().triggerRefresh();
      }
    }
  });

  // 연결 에러
  socket.on("connect_error", (error) => {
    console.error("Socket.IO 연결 에러:", error.message);
  });

  // 재연결 시도 중
  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(`재연결 시도 중... (${attemptNumber}번째)`);
  });

  // 재연결 성공
  socket.on("reconnect", (attemptNumber) => {
    console.log(`재연결 성공! (${attemptNumber}번의 시도 후)`);
  });

  // 재연결 실패
  socket.on("reconnect_failed", () => {
    console.error("재연결 실패");
  });

  // 연결 해제
  socket.on("disconnect", (reason) => {
    console.log("Socket.IO 연결 해제:", reason);

    // 서버가 강제로 연결을 끊은 경우나 transport 에러인 경우
    // Socket.IO가 자동으로 재연결을 시도합니다
    if (reason === "io server disconnect") {
      // 서버가 연결을 끊었다면 수동으로 재연결
      socket?.connect();
    }
  });

  // 커스텀 에러 처리 (서버에서 보낸 에러)
  socket.on("error", (error) => {
    console.error("서버 에러:", error);
  });
};

export const socketService = {
  connect: (token: string): void => {
    connectWebSocket(token);
  },

  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log("Socket.IO 연결 종료");
    }
  },

  // 연결 상태 확인
  isConnected: (): boolean => {
    return socket?.connected || false;
  },
};
