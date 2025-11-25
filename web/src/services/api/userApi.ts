import { apiClient } from "../apiClient";
import type { UserType } from "../../types";

export const userApi = {
  getUserInfo: () => apiClient.get<UserType>(`/auth/me`),
  deleteUser: () => apiClient.post(`/auth/logout`),
};
