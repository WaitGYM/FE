import { apiClient } from "../apiClient";
import type { UserType, GuestType } from "../../types";

export const userApi = {
  getUserInfo: () => apiClient.get<UserType>(`/auth/me`),
  guestLogin: () => apiClient.post<GuestType>(`/auth/guest`),
  deleteUser: () => apiClient.post(`/auth/logout`),
};
