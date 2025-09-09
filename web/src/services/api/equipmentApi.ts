import axios from "axios";
import type { EquipmentType } from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const equipmentApi = {
  getEquipments: () => axios.get<EquipmentType[]>(`${API_BASE}/api/equipment`),
};
