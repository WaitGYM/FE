import axios from "axios";
// import type { EquipmentType } from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

type ReservationCreateType = {
  equipmentId: number;
  sets: number;
  restMinutes: number;
};

export const reservationApi = {
  // getReservationList: () => axios.get(`${API_BASE}/api/equipment`),
  // 기구별 예약 현황
  getEquipmentReservationStatus: (equipmentId: number) =>
    axios.get(`${API_BASE}/api/equipment/${equipmentId}`),
  createReservation: (data: ReservationCreateType) =>
    axios.post(`${API_BASE}/api/reservations/`, data),
};
