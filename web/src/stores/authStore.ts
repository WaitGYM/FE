import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useUserStore } from "./userStore";

interface AuthStoreType {
  token: string | null;
  isAuthenticated: boolean;
  tokenExpiry: string | null;

  login: (token: string, expiry?: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        isAuthenticated: false,
        tokenExpiry: null,

        login: (token, expiry) =>
          set({
            token,
            isAuthenticated: true,
            tokenExpiry: expiry || null,
          }),

        logout: () => {
          const { userInfo } = useUserStore.getState();
          if (userInfo.isGuest) {
            localStorage.removeItem(`user_${userInfo.id}_drag_tooltip`);
            localStorage.removeItem(`user_${userInfo.id}_sort_tooltip`);
            localStorage.removeItem(`user_${userInfo.id}_wait_tooltip`);
            localStorage.removeItem(`user_${userInfo.id}_equip_date`);
            localStorage.removeItem(`user_${userInfo.id}_equip_sort`);
          }
          set({
            token: null,
            isAuthenticated: false,
            tokenExpiry: null,
          });
        },

        isTokenValid: () => {
          const { tokenExpiry } = get();
          if (!tokenExpiry) return true;

          const now = new Date();
          const expiryDate = new Date(tokenExpiry);
          return now < expiryDate;
        },
      }),
      {
        name: "auth-storage", // localStorage key
      }
    )
  )
);
