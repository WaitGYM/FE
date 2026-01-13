import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { equipmentApi } from "../services";
import type { EquipmentType } from "../types";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { useUIStore } from "./UIStore";

interface EquipmentStoreType {
  equipmentList: EquipmentType[];
  equipmentListLoading: boolean;
  error: string | null;
  isRoutineCompelte: boolean;
  refreshTrigger: number;

  getEquipments: (filter: string) => Promise<void>;
  clearError: () => void;
  setIsRoutineCompelte: (val: boolean) => void;
  triggerRefresh: () => void;
  resetEquipmentState: () => void;
}

const initialState = {
  equipmentList: [],
  equipmentListLoading: false,
  error: null,
  isRoutineCompelte: false,
  refreshTrigger: 0,
};

export const useEquipmentStore = create<EquipmentStoreType>()(
  devtools((set, get) => ({
    ...initialState,
    getEquipments: async (filter) => {
      set({ equipmentListLoading: true });
      try {
        const { routineId, isEquipAutoSorting } = useUIStore.getState();

        const eqAllData = (
          await equipmentApi.getEquipmentList(isEquipAutoSorting)
        ).data;

        if (filter === "routine") {
          console.log("기구 스토어에서 루틴 정보 호출----");
          const { routineDetail } = useRoutineStore.getState();
          if (!routineDetail) {
            await useRoutineStore.getState().getRoutineDetail(routineId);
          }

          const updatedRoutineDetail = useRoutineStore.getState().routineDetail;
          console.log("기구 스토어에서 루틴 정보", updatedRoutineDetail);

          const routineData = eqAllData.reduce((arr, cur) => {
            const routineEq = updatedRoutineDetail.exercises.find(
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

    triggerRefresh: () =>
      set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),

    resetEquipmentState: () => set(initialState),
  }))
);
