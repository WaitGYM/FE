import { create } from "zustand";
import { equipmentApi } from "../services";
import type { EquipmentType } from "../types";
import { useLoadingStore } from "./loadingStore";
const setLoading = useLoadingStore.getState().setLoading;

interface EquipmentStoreType {
  equipmentList: EquipmentType[];
  loading: boolean;
  error: string | null;

  getEquipments: () => Promise<void>;
  clearError: () => void;
}

export const useEquipmentStore = create<EquipmentStoreType>((set, get) => ({
  equipmentList: [],
  loading: false,
  error: null,

  getEquipments: async () => {
    setLoading(true);
    try {
      const equipmentsData = (await equipmentApi.getEquipmentList()).data;
      set({ equipmentList: equipmentsData });
    } catch (error) {
      set({
        error: "기구 목록을 불러오는데 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  clearError: () => set({ error: null }),
}));
