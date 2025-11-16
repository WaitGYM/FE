import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { routineApi } from "../services/routineApi";
import type {
  NewRoutineType,
  RoutineType,
  RoutineDetailType,
} from "../../../types";
import type { EquipmentType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";
import { getFormattedTodayDate } from "../../../hooks/useDateFormatting";

type WorkoutGoalType = {
  sets: number;
  restSeconds: number;
};

interface RoutineStoreType {
  workoutGoal: WorkoutGoalType;
  selectedEquipList: (EquipmentType & WorkoutGoalType)[];
  newRoutineName: string;
  routineDataBody: NewRoutineType;
  routineList: RoutineType[];
  routineDetail: RoutineDetailType | null;
  routineLoading: boolean;
  routineError: string | null;
  originRoutineDetail: NewRoutineType | null;

  setSelectedEquipList: (selectEquip: EquipmentType | EquipmentType[]) => void;
  setRoutineName: (name: string) => void;
  getRoutineFilteringData: () => NewRoutineType;
  setRoutineEquipSorting: (
    reoderingData: (EquipmentType & WorkoutGoalType)[]
  ) => void;
  updateSelectedEquipment: (
    equipmentId: number,
    field: "sets" | "restSeconds",
    delta: number
  ) => void;
  createRoutine: () => Promise<void>;
  updateRoutine: () => Promise<void>;
  deleteRoutine: () => Promise<void>;
  getRoutineList: () => Promise<void>;
  getRoutineDetail: (id: number) => Promise<void>;
  resetSelectedEquipList: () => void;
  resetRoutineState: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  workoutGoal: {
    sets: 1,
    restSeconds: 0,
  },
  selectedEquipList: [],
  newRoutineName: `${getFormattedTodayDate()} 운동 루틴`,
  routineDataBody: null,

  routineList: [],
  routineDetail: null,
  routineLoading: false,
  routineError: null,
  originRoutineDetail: null,
};

export const useRoutineStore = create<RoutineStoreType>()(
  devtools((set, get) => ({
    ...initialState,

    setSelectedEquipList: (selectEquip) =>
      set((state) => {
        const prevList = state.selectedEquipList;
        const isArray = Array.isArray(selectEquip);

        if (isArray) {
          const selectedIds = selectEquip.map((item) => item.id);
          const alreadySelectedIds = prevList.map((item) => item.id);
          const isAllSelected = selectedIds.every((id) =>
            alreadySelectedIds.includes(id)
          );

          if (isAllSelected) {
            return {
              selectedEquipList: prevList.filter(
                (item) => !selectedIds.includes(item.id)
              ),
            };
          } else {
            const newItems = selectEquip
              .filter((item) => !alreadySelectedIds.includes(item.id))
              .map((item) => ({
                ...item,
                sets: item.sets || state.workoutGoal.sets,
                restSeconds: item.restSeconds || state.workoutGoal.restSeconds,
              }));
            return {
              selectedEquipList: [...prevList, ...newItems],
            };
          }
        } else {
          const isSelected = prevList.some((x) => x.id === selectEquip.id);
          if (isSelected) {
            return {
              selectedEquipList: prevList.filter(
                (v) => v.id !== selectEquip.id
              ),
            };
          } else {
            const newEquip = {
              ...selectEquip,
              ...state.workoutGoal,
            };
            return {
              selectedEquipList: [...prevList, newEquip],
            };
          }
        }
      }),
    setRoutineName: (newName) => set({ newRoutineName: newName }),

    getRoutineFilteringData: () => ({
      name: get().newRoutineName,
      exercises: get().selectedEquipList.map((eq) => ({
        equipmentId: eq.id,
        targetSets: eq.sets,
        restSeconds: eq.restSeconds,
      })),
    }),

    setRoutineEquipSorting: (reoderingData) =>
      set({ selectedEquipList: reoderingData }),

    updateSelectedEquipment: (eqId, field, changeValue) =>
      set((state) => {
        const newEquipmentList = state.selectedEquipList.map((curEq) => {
          if (curEq.id !== eqId) {
            return curEq;
          } else {
            const updatedValue = Math.max(0, curEq[field] + changeValue);
            let newEquipment = {
              ...curEq,
              [field]: updatedValue,
            };
            // 세트수 조절 시 휴식시간 조건 적용
            if (field === "sets") {
              if (updatedValue >= 2 && newEquipment.restSeconds < 10) {
                newEquipment.restSeconds = 10;
              } else if (updatedValue < 2) {
                newEquipment.restSeconds = 0;
              }
            }
            // 휴식시간 조절 시 세트수 조건 고려
            if (field === "restSeconds") {
              if (newEquipment.sets >= 2 && updatedValue < 10) {
                newEquipment.restSeconds = 10;
              } else {
                newEquipment.restSeconds = updatedValue;
              }
            }
            return newEquipment;
          }
        });
        return { selectedEquipList: newEquipmentList };
      }),

    createRoutine: async () => {
      setLoading(true);
      try {
        const response = await routineApi.createRoutine(
          get().getRoutineFilteringData()
        );
        console.log("루틴 생성 성공!!!", response);
      } catch (error) {
        console.log("⛔루틴 생성 실패!!!!", error);
      } finally {
        get().resetRoutineState();
        setLoading(false);
      }
    },

    updateRoutine: async () => {
      setLoading(true);
      try {
        const response = await routineApi.updateRoutine(
          get().routineDetail.id,
          get().getRoutineFilteringData()
        );
        console.log("루틴 업데이트 성공!!!", response);
      } catch (error) {
        console.log("⛔루틴 업데이트 실패!!!!", error);
      } finally {
        setLoading(false);
      }
    },

    deleteRoutine: async () => {
      setLoading(true);
      try {
        if (get().routineDetail) {
          const response = await routineApi.deleteRoutine(
            get().routineDetail.id
          );
          console.log("루틴 삭제 성공!!!", response);
        } else {
          console.log("루틴 정보가 없음!!!");
        }
      } catch (error) {
        console.log("⛔루틴 삭제 실패!!!!", error);
      } finally {
        setLoading(false);
      }
    },

    getRoutineList: async () => {
      set({ routineLoading: true });
      try {
        const response = await routineApi.getRoutineList();
        set({ routineList: response.data });
      } catch (error) {
        set({
          routineError: "루틴 목록을 불러오는데 실패했습니다.",
        });
      } finally {
        set({ routineLoading: false });
      }
    },

    getRoutineDetail: async (id: number) => {
      setLoading(true);
      try {
        const { data } = await routineApi.getRoutine(id);
        set({
          routineDetail: data,
          originRoutineDetail: {
            name: data.name,
            exercises: data.exercises.map((val) => ({
              equipmentId: val.equipment.id,
              targetSets: val.targetSets,
              restSeconds: val.restSeconds,
            })),
          },
        });
        console.log("originRoutineDetail", get().originRoutineDetail);
      } catch (error) {
        console.log("루틴을 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    },

    resetSelectedEquipList: () => set({ selectedEquipList: [] }),
    resetRoutineState: () => set(initialState),
  }))
);
