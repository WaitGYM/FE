import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { reservationApi } from "../services/reservationApi";
import type { EquipmentType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";
import { useRoutineStore } from "../../../features/routine/store/routineStore";

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
type RoutineWaitingInfoType = {
  equipment: {
    category: string;
    id: number;
    imageUrl: string;
    name: string;
  };
  exerciseInfo: {
    order: number;
    restSeconds: number;
    targetSets: number;
  };
  queue: {
    estimatedWaitMinutes: number;
    queueId: number;
    queuePosition: number;
  };
  message: string;
};

interface ReservationStoreType {
  selectedEquipment: EquipmentType & WorkoutGoalType;
  waitingInfo: (WaitingInfoType & RoutineWaitingInfoType) | null;

  setSelectedEquipment: (equipmentInfo: EquipmentType) => void;
  updateSelectedEquipment: (
    field: "sets" | "restSeconds",
    delta: number
  ) => void;
  getEquipmentReservationStatus: () => Promise<boolean>;
  createReservation: () => Promise<boolean>;
  deleteReservation: () => Promise<void>;
  resetSelectedEquipmentState: () => void;
  resetWaitingInfoState: () => void;
  resetState: () => void;
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  selectedEquipment: [],
  waitingInfo: null,
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
          const { data } = await reservationApi.getEquipmentReservationStatus(
            eq.id
          );

          set((state) => ({
            selectedEquipment: { ...state.selectedEquipment, ...data },
          }));
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
        if (!eq) throw Error;

        let res;
        const { routineDetail } = useRoutineStore.getState();
        if (routineDetail) {
          res = await reservationApi.createRoutineEquipReservation(
            routineDetail.id,
            eq.id
          );
          set({
            waitingInfo: {
              totalSets: eq.sets,
              restSeconds: eq.restSeconds,
              ...res.data,
            },
          });
        } else {
          const reqData = {
            totalSets: eq.sets,
            restSeconds: eq.restSeconds,
          };
          res = await reservationApi.createReservation(eq.id, reqData);
          set({
            waitingInfo: { ...reqData, ...res.data },
          });
        }
        return true;
      } catch (error) {
        console.log("기구 예약에 실패", error);
        return false;
      } finally {
        get().resetSelectedEquipmentState();
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
        get().resetSelectedEquipmentState();
        setLoading(false);
      }
    },

    resetSelectedEquipmentState: () =>
      set({
        selectedEquipment: { ...initialState.selectedEquipment },
      }),
    resetWaitingInfoState: () =>
      set({
        waitingInfo: null,
      }),
    resetState: () => set(initialState),
  }))
);
