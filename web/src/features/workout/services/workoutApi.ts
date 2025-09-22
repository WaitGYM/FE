import { apiClient } from "../../../services/apiClient";

type WorkoutCreateType = {
  totalSets: number;
  restMinutes: number;
};

export const workoutApi = {
  createWorkout: (equipmentId: number, data: WorkoutCreateType) =>
    apiClient.post(`/waiting/start-using/${equipmentId}`, data),
};
