import { apiClient } from "../../../services/apiClient";

type WorkoutCreateType = {
  totalSets: number;
  restMinutes: number;
};

export const workoutApi = {
  startWorkout: (equipmentId: number, data: WorkoutCreateType) =>
    apiClient.post(`/waiting/start-using/${equipmentId}`, data),
  stopWorkout: (equipmentId: number) =>
    apiClient.post(`/waiting/stop-exercise/${equipmentId}`),
};
