import { apiClient } from "../../../services/apiClient";

type ReservationCreateType = {
  equipmentId: number;
  sets: number;
  restMinutes: number;
};

export const reservationApi = {
  getEquipmentReservationStatus: (equipmentId: number) =>
    apiClient.get(`/equipment/${equipmentId}`),
  createReservation: (data: ReservationCreateType) =>
    apiClient.post(`/reservations/`, data),
  startWorkout: (data: ReservationCreateType) =>
    apiClient.post(`/waiting/start-using/${data.equipmentId}`, {
      totalSets: data.sets,
      restMinutes: data.restMinutes,
    }),
};
