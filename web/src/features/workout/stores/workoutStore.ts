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
  leftRestTime: number;

  startWorkout: (eqId: number, workoutGoal: WorkoutGoalType) => Promise<void>;
  startRoutineWorkout: (
    routineId: number,
    routineExId: number,
    workoutGoal: WorkoutGoalType
  ) => Promise<void>;
  autoDecreaseRest: () => void;
  adjustRest: (delta: number) => void;
  resetRestTime: () => void;
  skipRest: () => Promise<void>;
  completeRest: () => void;
  stopWorkout: () => Promise<void>;
  completeWorkoutSet: () => Promise<void | string>;
  resetWorkoutState: () => void;
}

const setLoading = useLoadingStore.getState().setLoading;
const { setWorkingOut, isWorkingOut } = useUIStore.getState();

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

    startRoutineWorkout: async (routineId, routineExId, workoutGoal) => {
      setLoading(true);
      try {
        const { data } = await workoutApi.startRoutineWorkout(
          routineId,
          routineExId,
          workoutGoal
        );
        set({
          workingOutInfo: {
            ...data.workout,
            equipmentId: data.equipment.id,
            equipmentName: data.equipment.name,
          },
          leftRestTime: data.workout.restSeconds,
        });
        setWorkingOut(true);
      } catch (error) {
        console.log("루틴운동 시작에 실패했습니다.", error);
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
        set((state) => ({
          leftRestTime: state.leftRestTime + adjustValue,
          workoutProgressInfo: {
            ...state.workoutProgressInfo,
            restSeconds: data.newRestSeconds,
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
        const response = await workoutApi.skipRest();
        console.log(response.data);
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
        const { data } = await workoutApi.stopWorkout();
        console.log("stopWorkout ", data);
        set({ workoutProgressInfo: data });
        setWorkingOut(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    completeWorkoutSet: async () => {
      setLoading(true);
      try {
        const { data } = await workoutApi.completeWorkoutSet();
        if (!data.completed) {
          set({ workoutProgressInfo: data, leftRestTime: data.restSeconds });
          console.log("세트 완료!!!", data);
          return false;
        } else {
          set({ workoutProgressInfo: data });
          console.log("기구 완료!!!", data);
          setWorkingOut(false);
          return true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },

    resetWorkoutState: () => set(initialState),
  }))
);
