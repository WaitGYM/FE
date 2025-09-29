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
  workoutProgressInfo: WorkoutProgressInfoType;
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
  leftRestTime: number;

  startWorkout: (eqId: number, workoutGoal: WorkoutGoalType) => Promise<void>;
  autoDecreaseRest: () => void;
  adjustRest: (delta: number) => void;
  resetRestTime: () => void;
  skipRest: () => Promise<void>;
  completeRest: () => void;
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
    currentSet: 1,
    equipmentId: 0,
    equipmentName: "",
    estimatedEndAt: "",
    progress: 0,
    restSeconds: 10,
    startedAt: "",
    totalSets: 2,
  },
  workoutProgressInfo: {
    message: "",
    setStatus: "EXERCISING",
  },
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
  leftRestTime: 10,
};

export const useWorkoutStore = create<WorkoutStoreType>()(
  devtools((set, get) => ({
    ...initialState,

    startWorkout: async (eqId, workoutGoal) => {
      setLoading(true);
      try {
        const { data } = await workoutApi.startWorkout(eqId, workoutGoal);
        set({ workingOutInfo: data, leftRestTime: data.restSeconds });
        console.log("workingOutInfo :", get().workingOutInfo);
        setWorkingOut(true);
      } catch (error) {
        console.log("운동 시작에 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    },

    autoDecreaseRest: () =>
      set((state) => ({
        leftRestTime: Math.max(0, state.leftRestTime - 1),
      })),

    adjustRest: async (adjustValue) => {
      setLoading(true);
      try {
        const { data } = await workoutApi.adjustRest(adjustValue);
        console.log("adjustRest", data);
        set((state) => ({
          leftRestTime: state.leftRestTime + adjustValue,
          workoutProgressInfo: {
            ...state.workoutProgressInfo,
            restSeconds: state.workoutProgressInfo.restSeconds + adjustValue,
          },
        }));
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

    completeRest: () =>
      set((state) => ({
        workingOutInfo: {
          ...state.workingOutInfo,
          currentSet: ++state.workingOutInfo.currentSet,
        },
        restTime: state.workingOutInfo.restSeconds,
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
            set({ workoutProgressInfo: data, leftRestTime: data.restSeconds });
            console.log("세트 완료!!!", data);
            return false;
          } else {
            set({ workoutProgressInfo: data });
            console.log("기구 완료!!!", data);
            setWorkingOut(false);
            // get().resetState();
            return true;
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
