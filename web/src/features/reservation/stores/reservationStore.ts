import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { reservationApi } from "../services/reservationApi";
import type { EquipmentType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";

type WorkoutGoalType = {
  sets: number;
  restSeconds: number;
};

type WaitingInfoType = {
  equipmentName: string;
  estimatedWaitMinutes: number;
  message: string;
  queueId: number;
  queuePosition: number;
};

interface ReservationStoreType {
  selectedEquipment: EquipmentType & WorkoutGoalType;
  equipmentReservationStatus: string;
  waitingInfo: WaitingInfoType | null;
  reservationError: string | null;

  setSelectedEquipment: (equipmentInfo: EquipmentType) => void;
  updateSelectedEquipment: (
    field: "sets" | "restSeconds",
    delta: number
  ) => void;
  getEquipmentReservationStatus: () => Promise<void>;
  createReservation: () => Promise<void>;
  deleteReservation: () => Promise<void>;
  resetSelectedEquipmentState: () => void;
  resetState: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  selectedEquipment: [],
  equipmentReservationStatus: "",
  waitingInfo: null,
  reservationError: null,
};

export const useReservationStore = create<ReservationStoreType>()(
  devtools((set, get) => ({
    ...initialState,

    setSelectedEquipment: (equipmentInfo) =>
      set(() => ({
        selectedEquipment: {
          ...equipmentInfo,
          sets: equipmentInfo.sets || 1,
          restSeconds: equipmentInfo.restSeconds || 0,
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
          if (updatedValue >= 2 && current.restSeconds < 10) {
            newEquipment.restSeconds = 10;
          } else if (updatedValue < 2) {
            newEquipment.restSeconds = 0;
          }
        }

        // 휴식시간 조절 시 세트수 조건 고려
        if (field === "restSeconds") {
          if (current.sets >= 2 && updatedValue < 10) {
            newEquipment.restSeconds = 10;
          } else {
            newEquipment.restSeconds = updatedValue;
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
            restSeconds: eq.restSeconds,
          };
          const response = await reservationApi.createReservation(
            eq.id,
            reqData
          );
          console.log(response.data);
          set({
            waitingInfo: { ...reqData, ...response.data },
          });
        } else {
          throw Error;
        }
      } catch (error) {
        set({ reservationError: "기구 예약에 실패했습니다." });
        console.log("기구 예약에 실패", error);
      } finally {
        set({
          selectedEquipment: { ...initialState.selectedEquipment },
        });
        setLoading(false);
      }
    },

    deleteReservation: async () => {
      setLoading(true);
      try {
        const eq = get().selectedEquipment;
        if (eq) {
          const response = await reservationApi.deleteReservation(
            eq.status.myQueueId
          );
          console.log("waitingInfo", response.data);
          get().resetState();
        } else throw Error;
      } catch (error) {
        console.log("기구 예약 취소에 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    },

    resetSelectedEquipmentState: () =>
      set({
        selectedEquipment: { ...initialState.selectedEquipment },
      }),
    resetState: () => set(initialState),
  }))
);
