export interface NotificationType {
  id: number | string;
  type: string;
  message: string;
  read?: boolean;
  createdAt: string; // ISO 8601 형식의 날짜 문자열을 사용하는 것이 일반적입니다.
}
