import { apiClient } from "../apiClient";
import type { EquipmentType } from "../../types";

export const equipmentApi = {
  getEquipmentList: () => apiClient.get<EquipmentType[]>("/equipment"),
};
