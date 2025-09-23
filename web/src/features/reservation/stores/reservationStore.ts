import { create } from "zustand";
import { reservationApi } from "../services/reservationApi";
import type { EquipmentType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";

type WorkoutGoalType = {
  sets: number;
  restMinutes: number;
};

interface ReservationStoreType {
  selectedEquipment: WorkoutGoalType | (EquipmentType & WorkoutGoalType);
  equipmentReservationStatus: string;
  // loading: boolean;
  reservationError: string | null;
  workoutError: string | null;

  setSelectedEquipment: (equipmentInfo: EquipmentType) => void;
  updateSelectedEquipment: (
    field: "sets" | "restMinutes",
    delta: number
  ) => void;
  getEquipmentReservationStatus: () => Promise<void>;
  createReservation: () => Promise<void>;
  resetState: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  selectedEquipment: {
    sets: 0,
    restMinutes: 0,
  },
  equipmentReservationStatus: "",
  // loading: false,
  reservationError: null,
  workoutError: null,
};

export const useReservationStore = create<ReservationStoreType>((set, get) => ({
  ...initialState,

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
        console.log("getEquipmentReservationStatus :", response.data);

        set({ equipmentReservationStatus: response.data.reservations });
      } else {
        throw Error;
      }
    } catch (error) {
      console.log("기구 대기 조회 실패!", error);
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
        reservationError: "기구 예약에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
