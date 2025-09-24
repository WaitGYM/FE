import { apiClient } from "../../../services/apiClient";

type ReservationCreateType = {
  totalSets: number;
  restMinutes: number;
};

export const reservationApi = {
  getEquipmentReservationStatus: (equipmentId: number) =>
    apiClient.get(`/equipment/${equipmentId}`),
  createReservation: (equipmentId: number, data: ReservationCreateType) =>
    apiClient.post(`/waiting/queue/${equipmentId}`, data),
  deleteReservation: (queueId: number) =>
    apiClient.post(`/waiting/queue/${queueId}`),
};
