import { create } from "zustand";
// import { planApi } from "@apis";
import type { PlanType, PlanDetailType } from "../types";

interface PlanStoreType {
  planList: PlanType[];
  planDetail: PlanDetailType | null;
  planLoading: boolean;
  planError: string | null;

  // Actions
  getPlanList: () => Promise<void>;
  getPlanDetail: (id: number) => Promise<void>;
  // createPlan: (plan: Omit<Plan, "id">) => Promise<void>;
  // updatePlan: (id: number, plan: Omit<Plan, "id">) => Promise<void>;
  // deletePlan: (id: number) => Promise<void>;
  clearError: () => void;
}

// 루틴 리스트 로딩, 에러, 임시데이터 확인용
function getPlanListTempData(): Promise<string> {
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
    }, 2000);
  });
}

// 루틴 로딩, 에러, 임시데이터 확인용
function getPlanTempData(): Promise<string> {
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

export const usePlanStore = create<PlanStoreType>((set, get) => ({
  planList: [],
  planDetail: null,
  planLoading: false,
  planError: null,

  getPlanList: async () => {
    set({ planLoading: true, planError: null });
    try {
      // const response = await planApi.getPlanList();
      const response = await getPlanListTempData();
      set({ planList: response.data, planLoading: false });
    } catch (error) {
      set({
        planError: "루틴 목록을 불러오는데 실패했습니다.",
        planLoading: false,
      });
    }
  },

  getPlanDetail: async (id) => {
    set({ planLoading: true, planError: null });
    try {
      // const response = await planApi.getPlan();
      const response = await getPlanTempData();
      set({
        planDetail: response?.data?.find((x: PlanDetailType) => x.id === id),
        planLoading: false,
      });
    } catch (error) {
      set({
        planError: "루틴을 불러오는데 실패했습니다.",
        planLoading: false,
      });
    }
  },

  // createPlan: async (planData) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await planApi.createPlan(planData);
  //     set((state) => ({
  //       plans: [...state.plans, response.data],
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({
  //       error: "사용자 생성에 실패했습니다.",
  //       loading: false,
  //     });
  //   }
  // },

  // updatePlan: async (id, planData) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await planApi.updatePlan(id, planData);
  //     set((state) => ({
  //       plans: state.plans.map((plan) =>
  //         plan.id === id ? response.data : plan
  //       ),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({
  //       error: "사용자 수정에 실패했습니다.",
  //       loading: false,
  //     });
  //   }
  // },

  // deletePlan: async (id) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await planApi.deletePlan(id);
  //     set((state) => ({
  //       plans: state.plans.filter((plan) => plan.id !== id),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({
  //       error: "사용자 삭제에 실패했습니다.",
  //       loading: false,
  //     });
  //   }
  // },

  clearError: () => set({ planError: null }),
}));
