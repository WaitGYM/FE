import { apiClient } from "../../../services/apiClient";
import type { NewRoutineType, RoutineType } from "../../../types";

export const routineApi = {
  createRoutine: (data: NewRoutineType) =>
    apiClient.post<RoutineType>(`/routines`, data),
  updateRoutine: (id: number, updateData: Omit<RoutineType, "id">) =>
    apiClient.put<RoutineType>(`/routines/${id}`, updateData),
  deleteRoutine: (id: number) => apiClient.delete(`/routines/${id}`),
  getRoutineList: () => apiClient.get<RoutineType[]>(`/routines`),
  getRoutine: (id: number) => apiClient.get<RoutineType[]>(`/routines/${id}`),
};
