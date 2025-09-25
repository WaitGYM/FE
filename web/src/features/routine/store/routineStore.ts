import { create } from "zustand";
import { routineApi } from "../services/routineApi";
import type { RoutineType, RoutineDetailType } from "../../../types";
import { useLoadingStore } from "../../../stores/loadingStore";

interface RoutineStoreType {
  routineList: RoutineType[];
  routineDetail: RoutineDetailType | null;
  routineLoading: boolean;
  routineError: string | null;

  // Actions
  getRoutineList: () => Promise<void>;
  getRoutine: (id: number) => Promise<void>;
  createRoutine: (routine: Omit<RoutineType, "id">) => Promise<void>;
  updateRoutine: (
    id: number,
    routine: Omit<RoutineType, "id">
  ) => Promise<void>;
  deleteRoutine: (id: number) => Promise<void>;
  resetState: () => void;
}

// 루틴 리스트 로딩, 에러, 임시데이터 확인용
function getRoutineListTempData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 211,
            name: "8월 22일 루틴",
            isActive: false,
            equipmentNum: 10,
            duration: 156,
          },
          {
            id: 212,
            name: "하체 루틴",
            isActive: false,
            equipmentNum: 5,
            duration: 46,
          },
        ],
      });
    }, 1000);
  });
}

// 루틴 로딩, 에러, 임시데이터 확인용
function getRoutineTempData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 211,
            name: "8월 22일 루틴",
            equipmentList: [
              {
                id: 3,
                name: "머신3",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 2,
                name: "머신2",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 1,
                name: "머신1",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 10,
                name: "머신10",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 7,
                name: "머신7",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 6,
                name: "머신6",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
            ],
          },
          {
            id: 212,
            name: "하체 루틴",
            equipmentList: [
              {
                id: 3,
                name: "머신3",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 2,
                name: "머신2",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 1,
                name: "머신1",
                isFavorite: true,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 10,
                name: "머신10",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 7,
                name: "머신7",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
              {
                id: 6,
                name: "머신6",
                isFavorite: false,
                imgSrc: "",
                waitingTime: 0,
                waitingCount: 0,
                bodyPart: "엉덩이",
              },
            ],
          },
        ],
      });
    }, 1000);
  });
}

const { setLoading } = useLoadingStore.getState();

const initialState = {
  routineList: [],
  routineDetail: null,
  routineLoading: false,
  routineError: null,
};

export const useRoutineStore = create<RoutineStoreType>((set, get) => ({
  ...initialState,

  getRoutineList: async () => {
    set({ routineLoading: true });
    try {
      // const response = await routineApi.getRoutineList();
      const response = await getRoutineListTempData();
      set({ routineList: response.data });
    } catch (error) {
      set({
        routineError: "루틴 목록을 불러오는데 실패했습니다.",
      });
    } finally {
      set({ routineLoading: false });
    }
  },

  getRoutine: async (id: number) => {
    setLoading(true);
    try {
      const response = await routineApi.getRoutine(id);
      // const response = await getRoutineTempData();
      set({
        routineDetail: response.data,
      });
    } catch (error) {
      set({
        routineError: "루틴을 불러오는데 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  createRoutine: async (routineData) => {
    setLoading(true);
    try {
      const response = await routineApi.createRoutine(routineData);
      console.log("루틴 생성 성공!!!", response);
    } catch (error) {
      set({
        error: "루틴 생성에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  updateRoutine: async (id, updateData) => {
    setLoading(true);
    try {
      const response = await routineApi.updateRoutine(id, updateData);
      console.log("루틴 업데이트 성공!!!", response);
    } catch (error) {
      set({
        error: "루틴 업데이트에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  deleteRoutine: async (id) => {
    setLoading(true);
    try {
      const response = await routineApi.deleteRoutine(id);
      console.log("루틴 삭제 성공!!!", response);
    } catch (error) {
      set({
        error: "루틴 삭제에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
