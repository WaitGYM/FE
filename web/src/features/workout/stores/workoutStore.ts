import { create } from "zustand";
import { workoutApi } from "../services/workoutApi";
import { useLoadingStore } from "../../../stores/loadingStore";
import { useUIStore } from "../../../stores/UIStore";

// type workingOutStatusType = {
//   totalSets: number;
//   currentSet: number;
//   restSeconds: number;
//   status: "IN_USE" | "COMPLETED";
//   setStatus: "EXERCISING" | "RESTING";
//   currentSetStartedAt: Date;
//   estimatedEndAt: number;
// };

type WorkoutGoalType = {
  totalSets: number;
  restMinutes: number;
};

interface WorkoutStoreType {
  workingOutEqId: number | null;
  workoutGoal: WorkoutGoalType;
  // equipmentWorkoutStatus: string;
  // loading: boolean;
  workoutError: string | null;

  startWorkout: (eqId: number, workoutGoal: WorkoutGoalType) => Promise<void>;
  stopWorkout: () => Promise<void>;
  resetState: () => void;
}

const setLoading = useLoadingStore.getState().setLoading;
const { setWorkingOut } = useUIStore.getState();

const initialState = {
  workingOutEqId: null,
  workoutGoal: {
    totalSets: 0,
    restMinutes: 0,
  },
  // equipmentWorkoutStatus: "",
  workoutError: null,
};

export const useWorkoutStore = create<WorkoutStoreType>((set, get) => ({
  ...initialState,

  startWorkout: async (eqId, workoutGoal) => {
    setLoading(true);
    try {
      const response = await workoutApi.startWorkout(eqId, workoutGoal);
      console.log(response.data);
      set({ workingOutEqId: response.data.equipmentId });
      setWorkingOut(true);
    } catch (error) {
      set({
        workoutError: "운동 시작에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  stopWorkout: async () => {
    setLoading(true);
    try {
      const curEqId = get().workingOutEqId;
      if (curEqId) {
        console.log("stopWorkout");
        const response = await workoutApi.stopWorkout(curEqId);
        console.log(response.data);
      } else throw Error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
