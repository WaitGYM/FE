import { apiClient } from "../../../services/apiClient";

type WorkoutCreateType = {
  totalSets: number;
  restSeconds: number;
};

export const workoutApi = {
  startWorkout: (equipmentId: number, data: WorkoutCreateType) =>
    apiClient.post(`/waiting/start-using/${equipmentId}`, data),
  completeWorkoutSet: (equipmentId: number) =>
    apiClient.post(`/waiting/complete-set/${equipmentId}`),
  stopWorkout: (equipmentId: number) =>
    apiClient.post(`/waiting/stop-exercise/${equipmentId}`),
  adjustRest: (adjustValue: number) =>
    apiClient.put(`/routines/active-usage/rest-time`, {
      adjustment: adjustValue,
    }),
  skipRest: (equipmentId: number) =>
    apiClient.post(`/waiting/skip-rest/${equipmentId}`),
};
