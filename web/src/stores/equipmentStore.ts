import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { equipmentApi } from "../services";
import type { EquipmentType } from "../types";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { useLoadingStore } from "./loadingStore";
import { useUIStore } from "./UIStore";

interface EquipmentStoreType {
  equipmentList: EquipmentType[];
  equipmentListLoading: boolean;
  error: string | null;
  isRoutineCompelte: boolean;

  getEquipments: (filter: string) => Promise<void>;
  clearError: () => void;
  setIsRoutineCompelte: (val: boolean) => void;
  resetEquipmentState: () => void;
}

const setLoading = useLoadingStore.getState().setLoading;

const initialState = {
  equipmentList: [],
  equipmentListLoading: false,
  error: null,
  isRoutineCompelte: false,
};

export const useEquipmentStore = create<EquipmentStoreType>()(
  devtools((set, get) => ({
    ...initialState,
    getEquipments: async (filter) => {
      // setLoading(true);
      set({ equipmentListLoading: true });
      try {
        const { routineId, isEquipAutoSorting } = useUIStore.getState();
        const { getRoutineDetail } = useRoutineStore.getState();
        console.log("routineId : ", routineId);

        const eqAllData = (
          await equipmentApi.getEquipmentList(isEquipAutoSorting)
        ).data;
        if (filter === "routine") {
          console.log("기구 스토어에서 루틴 정보 호출----");
          await getRoutineDetail(routineId);

          const routineDetail = useRoutineStore.getState().routineDetail;
          const routineData = eqAllData.reduce((arr, cur) => {
            const routineEq = routineDetail.exercises.find(
              (ex) => cur.id === ex.equipment.id
            );
            if (routineEq) {
              let newItem = { ...cur };
              newItem.sets = routineEq.targetSets;
              newItem.restSeconds = routineEq.restSeconds;
              newItem.routineExId = routineEq.id;
              arr[routineEq.order - 1] = newItem;
            }
            return arr;
          }, []);
          console.log(
            "routineDetail : ",
            useRoutineStore.getState().routineDetail
          );
          console.log("routineData : ", routineData);
          set({
            equipmentList: routineData,
          });
        } else {
          // 대기 건 기구 있으면 최상단 배치
          const waitingEqIdx = eqAllData.findIndex(
            (eq) => eq.status.myQueuePosition
          );
          if (waitingEqIdx !== -1) {
            const [matched] = eqAllData.splice(waitingEqIdx, 1);
            eqAllData.unshift(matched);
          }
          set({ equipmentList: eqAllData });
        }
      } catch (error) {
        set({
          error: "기구 목록을 불러오는데 실패했습니다.",
        });
      } finally {
        // setLoading(false);
        set({ equipmentListLoading: false });

        const { isWorkingOut } = useUIStore.getState();
        if (!isWorkingOut && !get().error && filter === "routine") {
          get().setIsRoutineCompelte(
            get().equipmentList.every((eq) => eq.status.completedToday)
          );
        }
      }
    },

    clearError: () => set({ error: null }),

    setIsRoutineCompelte: (isRoutineCompelte) => set({ isRoutineCompelte }),

    resetEquipmentState: () => set(initialState),
  }))
);
