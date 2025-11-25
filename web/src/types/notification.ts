export interface NotificationType {
  id: number | string;
  type: string;
  category: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt: string;
  equipmentId?: number;
  equipmentName?: string;
  title?: string;
}
