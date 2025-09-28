import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface AuthStoreType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  devtools(
    // persist 이용한 자동 로그인 처리
    persist(
      (set) => ({
        token: null,
        isAuthenticated: false,
        login: (token) => set({ token, isAuthenticated: true }),
        logout: () => set({ token: null, isAuthenticated: false }),
      }),
      {
        name: "auth-storage", // localStorage key
      }
    )
  )
);
