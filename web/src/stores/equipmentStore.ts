import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { equipmentApi } from "../services";
import type { EquipmentType } from "../types";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { useLoadingStore } from "./loadingStore";
import { useUIStore } from "./UIStore";

const setLoading = useLoadingStore.getState().setLoading;

interface EquipmentStoreType {
  equipmentList: EquipmentType[];
  loading: boolean;
  error: string | null;

  getEquipments: () => Promise<void>;
  clearError: () => void;
}

export const useEquipmentStore = create<EquipmentStoreType>()(
  devtools((set, get) => ({
    equipmentList: [],
    loading: false,
    error: null,

    getEquipments: async () => {
      setLoading(true);
      try {
        const { routineId } = useUIStore.getState();
        const { getRoutineDetail } = useRoutineStore.getState();
        console.log("routineId : ", routineId);

        const eqAllData = (await equipmentApi.getEquipmentList()).data;
        if (routineId && eqAllData) {
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
              arr.push(newItem);
            }
            return arr;
          }, []);
          // console.log("eqAllData : ", eqAllData);
          console.log(
            "routineDetail : ",
            useRoutineStore.getState().routineDetail
          );
          console.log("routineData : ", routineData);
          set({ equipmentList: routineData });
        } else {
          set({ equipmentList: eqAllData });
        }
      } catch (error) {
        set({
          error: "기구 목록을 불러오는데 실패했습니다.",
        });
      } finally {
        setLoading(false);
      }
    },

    clearError: () => set({ error: null }),
  }))
);
