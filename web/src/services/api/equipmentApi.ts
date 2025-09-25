import { apiClient } from "../apiClient";
import type { EquipmentType } from "../../types";

export const equipmentApi = {
  // getEquipmentList: () => apiClient.get<EquipmentType[]>("/equipment"),
  getEquipmentList: (category: string = "all", searchWord: string = "") =>
    apiClient.get<EquipmentType[]>(
      `/equipment?category=${category}&search=${searchWord}&include_status=true`
    ),
};
