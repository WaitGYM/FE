import { apiClient } from "../apiClient";
import type { UserType, GuestType } from "../../types";

export const userApi = {
  getUserInfo: () => apiClient.get<UserType>(`/auth/me`),
  guestLogin: () => apiClient.post<GuestType>(`/auth/guest`),
  terminateSession: () => apiClient.post(`/auth/terminate-session`),
  deleteAccount: () => apiClient.delete(`/auth/account`),
};
