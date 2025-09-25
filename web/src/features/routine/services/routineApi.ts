import { apiClient } from "../../../services/apiClient";
import type { RoutineType } from "../../../types";

export const routineApi = {
  getRoutineList: () => apiClient.get<RoutineType[]>(`/routines`),
  getRoutine: (id: number) => apiClient.get<RoutineType[]>(`/routines/${id}`),
  createRoutine: (data: Omit<RoutineType, "id">) =>
    apiClient.post<RoutineType>(`/routines`, data),
  updateRoutine: (id: number, updateData: Omit<RoutineType, "id">) =>
    apiClient.put<RoutineType>(`/routines/${id}`, updateData),
  deleteRoutine: (id: number) => apiClient.delete(`/routines/${id}`),
};
