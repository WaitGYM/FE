import axios from "axios";
import type { PlanType } from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const planApi = {
  getPlans: () => axios.get<PlanType[]>(`${API_BASE}/plan`),
  // createPlan: (plan: Omit<Plan, "id">) =>
  //   axios.post<Plan>(`${API_BASE}/api/plan`, plan),
  // updatePlan: (id: number, plan: Omit<Plan, "id">) =>
  //   axios.put<Plan>(`${API_BASE}/api/plan/${id}`, plan),
  // deletePlan: (id: number) => axios.delete(`${API_BASE}/api/plan/${id}`),
};
