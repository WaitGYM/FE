import { create } from "zustand";
import { equipmentApi } from "../services";
import type { EquipmentType } from "../types";

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
    set({ loading: true, error: null });
    try {
      const response = await equipmentApi.getEquipments();
      set({ equipmentList: response.data, loading: false });
    } catch (error) {
      set({
        error: "기구 목록을 불러오는데 실패했습니다.",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
