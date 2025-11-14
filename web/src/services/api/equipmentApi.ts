import { apiClient } from "../apiClient";
import type { EquipmentType } from "../../types";

export const equipmentApi = {
  getEquipmentList: (isEquipAutoSorting: boolean = false) =>
    apiClient.get<EquipmentType[]>(
      `/equipment${
        isEquipAutoSorting ? "?include_status=true&sort_by=available" : ""
      }`
    ),
  // getEquipmentList: (category: string = "all", searchWord: string = "") =>
  //   apiClient.get<EquipmentType[]>(
  //     `/equipment?category=${category}&search=${searchWord}&include_status=true`
  //   ),
};
