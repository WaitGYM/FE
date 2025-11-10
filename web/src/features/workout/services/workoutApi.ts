import { apiClient } from "../../../services/apiClient";

type WorkoutCreateType = {
  totalSets: number;
  restSeconds: number;
};

export const workoutApi = {
  startWorkout: (equipmentId: number, data: WorkoutCreateType) =>
    apiClient.post(`/waiting/start-using/${equipmentId}`, data),
  startRoutineWorkout: (
    routineId: number,
    equipmentId: number,
    data: WorkoutCreateType
  ) => apiClient.post(`/routines/${routineId}/start/${equipmentId}`, data),
  completeWorkoutSet: () => apiClient.post(`/waiting/complete-set`),
  stopWorkout: () => apiClient.post(`/waiting/stop-exercise`),
  adjustRest: (adjustValue: number) =>
    apiClient.put(`/routines/active-usage/rest-time`, {
      adjustment: adjustValue,
    }),
  skipRest: () => apiClient.post(`/waiting/skip-rest`),
};
