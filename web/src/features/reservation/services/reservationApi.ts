import { apiClient } from "../../../services/apiClient";

type ReservationCreateType = {
  totalSets: number;
  restSeconds: number;
};

export const reservationApi = {
  getEquipmentReservationStatus: (equipmentId: number) =>
    apiClient.get(`/waiting/status/${equipmentId}`),
  createReservation: (equipmentId: number, data: ReservationCreateType) =>
    apiClient.post(`/waiting/queue/${equipmentId}`, data),
  deleteReservation: (queueId: number) =>
    apiClient.delete(`/waiting/queue/${queueId}`),
};
