import { create } from "zustand";
import { workoutApi } from "../services/workoutApi";
import { useLoadingStore } from "../../../stores/loadingStore";
const setLoading = useLoadingStore.getState().setLoading;

type WorkoutGoalType = {
  sets: number;
  restMinutes: number;
};

interface WorkoutStoreType {
  workoutGoal: WorkoutGoalType;
  equipmentWorkoutStatus: string;
  // loading: boolean;
  workoutError: string | null;

  startWorkout: () => Promise<void>;
  resetState: () => void;
}

const initialState = {
  workoutGoal: {
    sets: 0,
    restMinutes: 0,
  },
  equipmentWorkoutStatus: "",
  workoutError: null,
};

export const useWorkoutStore = create<WorkoutStoreType>((set, get) => ({
  ...initialState,

  startWorkout: async () => {
    setLoading(true);
    try {
      const response = await workoutApi.startWorkout(eq.id, reqData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
