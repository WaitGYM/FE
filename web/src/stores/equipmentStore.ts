import { create } from "zustand";
import { equipmentApi } from "@apis";
import type { Equipment } from "@types";

interface EquipmentStore {
  equipmentList: Equipment[];
  loading: boolean;
  error: string | null;

  getEquipments: () => Promise<void>;
  clearError: () => void;
}

export const useEquipmentStore = create<EquipmentStore>((set, get) => ({
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
