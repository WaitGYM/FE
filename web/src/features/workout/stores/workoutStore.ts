import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { workoutApi } from "../services/workoutApi";
import { useLoadingStore } from "../../../stores/loadingStore";
import { useUIStore } from "../../../stores/UIStore";
import type { WorkingoutType, WorkoutProgressInfoType } from "../../../types";

type WorkoutGoalType = {
  totalSets: number;
  restSeconds: number;
};

interface WorkoutStoreType {
  workoutGoal: WorkoutGoalType;
  workingOutInfo: WorkingoutType;
  workoutProgressInfo: WorkoutProgressInfoType | null;
  // workingOutLocalData: {
  //   totalSets: number;
  //   totalWorkoutSeconds: number;
  //   restSeconds: number;
  //   totalRestSeconds: number;
  // };
  // restStatus: {
  //   message: string;
  //   setStatus: string;
  //   restSeconds: number;
  // };
  restTime: number;

  startWorkout: (eqId: number, workoutGoal: WorkoutGoalType) => Promise<void>;
  adjustRest: (delta: number) => void;
  skipRest: () => Promise<void>;
  increaseSetsCount: () => void;
  stopWorkout: () => Promise<void>;
  completeWorkoutSet: () => Promise<void | string>;
  resetState: () => void;
}

const setLoading = useLoadingStore.getState().setLoading;
const { setWorkingOut } = useUIStore.getState();

const initialState = {
  workoutGoal: {
    totalSets: 0,
    restSeconds: 0,
  },
  workingOutInfo: {
    currentSet: 0,
    equipmentId: 0,
    equipmentName: "",
    estimatedEndAt: "",
    progress: 0,
    restSeconds: 0,
    startedAt: "",
    totalSets: 0,
  },
  workoutProgressInfo: null,
  // workingOutLocalData: {
  //   totalSets: 0,
  //   totalWorkoutSeconds: 0,
  //   restSeconds: 0,
  //   totalRestSeconds: 0,
  // },
  // restStatus: {
  //   message: "",
  //   setStatus: "",
  //   restSeconds: 10,
  // },
  restTime: 10,
};

export const useWorkoutStore = create<WorkoutStoreType>()(
  devtools((set, get) => ({
    ...initialState,

    startWorkout: async (eqId, workoutGoal) => {
      setLoading(true);
      try {
        const response = await workoutApi.startWorkout(eqId, workoutGoal);
        set({ workingOutInfo: response.data });
        console.log("workingOutInfo :", get().workingOutInfo);
        setWorkingOut(true);
      } catch (error) {
        console.log("운동 시작에 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    },

    // adjustRest: (delta) =>
    //   set((state) => ({
    //     restTime: Math.max(0, state.restTime + delta),
    //   })),

    adjustRest: async (adjustValue) => {
      setLoading(true);
      try {
        const response = await workoutApi.adjustRest(adjustValue);
        console.log("adjustRest", response);
        // set({ workoutProgressInfo: data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    skipRest: async () => {
      setLoading(true);
      try {
        const eqId = get().workingOutInfo?.equipmentId;
        if (eqId) {
          console.log("skipRest");
          const response = await workoutApi.skipRest(eqId);
          console.log(response.data);
        } else throw Error;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    increaseSetsCount: () =>
      set((state) => ({
        workingOutInfo: {
          ...state.workingOutInfo,
          currentSet: ++state.workingOutInfo.currentSet,
        },
      })),

    stopWorkout: async () => {
      setLoading(true);
      try {
        const eqId = get().workingOutInfo?.equipmentId;
        if (eqId) {
          console.log("stopWorkout");
          const response = await workoutApi.stopWorkout(eqId);
          console.log(response.data);
          setWorkingOut(false);
        } else throw Error;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    completeWorkoutSet: async () => {
      setLoading(true);
      try {
        const eqId = get().workingOutInfo?.equipmentId;
        if (eqId) {
          const { data } = await workoutApi.completeWorkoutSet(eqId);
          if (!data.completed) {
            set({ workoutProgressInfo: data, restTime: data.restSeconds });
            console.log("세트 완료!!!", data);
          } else {
            set({ workoutProgressInfo: data });
            console.log("기구 완료!!!", data);
            setWorkingOut(false);
            get().resetState();
          }
        } else throw Error;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    resetState: () => set(initialState),
  }))
);
