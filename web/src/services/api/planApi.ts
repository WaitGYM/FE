import axios from "axios";
import type { Plan } from "@types";

const API_BASE = "https://nomad-movies.nomadcoders.workers.dev";

export const planApi = {
  getPlans: () => axios.get<Plan[]>(`${API_BASE}/api/plan`),
  // createPlan: (plan: Omit<Plan, "id">) =>
  //   axios.post<Plan>(`${API_BASE}/api/plan`, plan),
  // updatePlan: (id: number, plan: Omit<Plan, "id">) =>
  //   axios.put<Plan>(`${API_BASE}/api/plan/${id}`, plan),
  // deletePlan: (id: number) => axios.delete(`${API_BASE}/api/plan/${id}`),
};
