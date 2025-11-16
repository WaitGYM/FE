import { apiClient } from "../../../services/apiClient";
import type { NewRoutineType, RoutineType } from "../../../types";

export const routineApi = {
  createRoutine: (data: NewRoutineType) => apiClient.post(`/routines`, data),
  updateRoutine: (
    routineId: number,
    updateData: Pick<NewRoutineType, "exercises">
  ) => apiClient.put(`/routines/${routineId}`, updateData),
  deleteRoutine: (routineId: number) =>
    apiClient.delete(`/routines/${routineId}`),
  getRoutineList: () => apiClient.get<RoutineType[]>(`/routines`),
  getRoutine: (id: number) => apiClient.get<RoutineType>(`/routines/${id}`),
};
