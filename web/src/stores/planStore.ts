import { create } from "zustand";
// import { planApi } from "@apis";
import type { PlanType } from "../types";

interface PlanStoreType {
  plans: PlanType[];
  loading: boolean;
  error: string | null;

  // Actions
  getPlans: () => Promise<void>;
  // createPlan: (plan: Omit<Plan, "id">) => Promise<void>;
  // updatePlan: (id: number, plan: Omit<Plan, "id">) => Promise<void>;
  // deletePlan: (id: number) => Promise<void>;
  clearError: () => void;
}

// 로딩, 에러, 임시데이터 확인용
function getTempData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            name: "8월 22일 루틴",
            isActive: false,
            equipmentNum: 10,
            duration: 156,
          },
          {
            id: 2,
            name: "하체 루틴",
            isActive: false,
            equipmentNum: 5,
            duration: 46,
          },
          {
            id: 3,
            name: "상체 루틴",
            isActive: false,
            equipmentNum: 7,
            duration: 46,
          },
          {
            id: 4,
            name: "루틴04444444",
            isActive: false,
            equipmentNum: 8,
            duration: 66,
          },
          {
            id: 5,
            name: "8월 22일 루틴",
            isActive: false,
            equipmentNum: 10,
            duration: 156,
          },
          {
            id: 6,
            name: "루틴0222222",
            isActive: false,
            equipmentNum: 5,
            duration: 46,
          },
          {
            id: 10,
            name: "루틴 끝",
            isActive: false,
            equipmentNum: 8,
            duration: 66,
          },
        ],
      });
    }, 2000);
  });
}

export const usePlanStore = create<PlanStoreType>((set, get) => ({
  plans: [],
  loading: false,
  error: null,

  getPlans: async () => {
    set({ loading: true, error: null });
    try {
      // const response = await planApi.getPlans();
      const response = await getTempData();
      set({ plans: response.data, loading: false });
    } catch (error) {
      set({
        error: "루틴 목록을 불러오는데 실패했습니다.",
        loading: false,
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

  clearError: () => set({ error: null }),
}));
