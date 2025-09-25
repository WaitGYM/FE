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
  reservationError: string | null;
  workoutError: string | null;

  setSelectedEquipment: (equipmentInfo: EquipmentType) => void;
  updateSelectedEquipment: (
    field: "sets" | "restMinutes",
    delta: number
  ) => void;
  getEquipmentReservationStatus: () => Promise<void>;
  createReservation: () => Promise<void>;
  deleteReservation: () => Promise<void>;
  resetState: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  selectedEquipment: {
    sets: 1,
    restMinutes: 0,
  },
  equipmentReservationStatus: "",
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
    set((state) => {
      const current = state.selectedEquipment;
      const updatedValue = Math.max(0, current[field] + changeValue);

      let newEquipment = {
        ...current,
        [field]: updatedValue,
      };

      // 세트수 조절 시 휴식시간 조건 적용
      if (field === "sets") {
        if (updatedValue >= 2 && current.restMinutes < 10) {
          newEquipment.restMinutes = 10;
        } else if (updatedValue < 2) {
          newEquipment.restMinutes = 0;
        }
      }

      // 휴식시간 조절 시 세트수 조건 고려
      if (field === "restMinutes") {
        if (current.sets >= 2 && updatedValue < 10) {
          newEquipment.restMinutes = 10;
        } else {
          newEquipment.restMinutes = updatedValue;
        }
      }

      return { selectedEquipment: newEquipment };
    }),

  getEquipmentReservationStatus: async () => {
    setLoading(true);
    try {
      const eq = get().selectedEquipment;
      if (eq) {
        const resData = (
          await reservationApi.getEquipmentReservationStatus(eq.id)
        ).data;

        set({
          equipmentReservationStatus: resData.status,
        });
        console.log("getEquipmentReservationStatus :", resData.status);
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
          totalSets: eq.sets,
          restMinutes: eq.restMinutes,
        };
        const response = await reservationApi.createReservation(eq.id, reqData);
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

  deleteReservation: async () => {
    setLoading(true);
    try {
      console.log("예약 취소됨!!!");

      // const eq = get().selectedEquipment;
      // if (eq) {
      //   const reqData = {
      //     totalSets: eq.sets,
      //     restMinutes: eq.restMinutes,
      //   };
      //   const response = await reservationApi.deleteReservation(eq.id,);
      //   console.log(response.data);
      // } else {
      //   throw Error;
      // }
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
