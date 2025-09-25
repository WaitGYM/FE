import { apiClient } from "../apiClient";
import type { UserType } from "../../types";

export const userApi = {
  getUserInfo: () => apiClient.get<UserType>(`/auth/me`),
  // clearUser: (id: number) =>
  //   apiClient.delete(`/auth/me/${id}`),
};
