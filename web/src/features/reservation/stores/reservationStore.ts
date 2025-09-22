import { create } from "zustand";
import { reservationApi } from "../services/reservationApi";
import type { EquipmentType } from "../../../types";
// import type { ReservationType } from "../types";
import { useLoadingStore } from "../../../stores/loadingStore";
const setLoading = useLoadingStore.getState().setLoading;

type WorkoutGoalType = {
  sets: number;
  restMinutes: number;
};

interface ReservationStoreType {
  // 선택한 기구 정보
  //// 기구 대기 현황 업데이트 언제 할건지?
  selectedEquipment: WorkoutGoalType | (EquipmentType & WorkoutGoalType);
  equipmentReservationStatus: string;
  loading: boolean;
  error: string | null;

  setSelectedEquipment: (equipmentInfo: EquipmentType) => void;
  updateSelectedEquipment: (
    field: "sets" | "restMinutes",
    delta: number
  ) => void;
  getEquipmentReservationStatus: () => Promise<void>;
  createReservation: () => Promise<void>;
}

export const useReservationStore = create<ReservationStoreType>((set, get) => ({
  selectedEquipment: {
    sets: 0,
    restMinutes: 0,
  },
  equipmentReservationStatus: "",
  loading: false,
  error: null,

  setSelectedEquipment: (equipmentInfo) =>
    set((state) => ({
      selectedEquipment: {
        ...state.selectedEquipment,
        ...equipmentInfo,
      },
    })),

  updateSelectedEquipment: (field, changeValue) =>
    set((state) => ({
      selectedEquipment: {
        ...state.selectedEquipment,
        [field]: Math.max(0, state.selectedEquipment[field] + changeValue),
      },
    })),

  getEquipmentReservationStatus: async () => {
    setLoading(true);
    try {
      const eq = get().selectedEquipment;
      if (eq) {
        const response = await reservationApi.getEquipmentReservationStatus(
          eq.id
        );
        set({ equipmentReservationStatus: response.data.reservations });
      } else {
        throw Error;
      }
    } catch (error) {
      set({
        error: "기구 대기 현황을 불러오는데 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  createReservation: async () => {
    setLoading(true);
    try {
      const eq = get().selectedEquipment;
      if (eq) {
        const reqData = {
          equipmentId: eq.id,
          sets: eq.sets,
          restMinutes: eq.restMinutes,
        };
        const response = await reservationApi.createReservation(reqData);
        console.log(response.data);
      } else {
        throw Error;
      }
    } catch (error) {
      set({
        error: "기구 예약에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },
}));
