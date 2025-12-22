import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

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
    // persist 이용한 자동 로그인 처리
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
        logout: () =>
          set({ token: null, isAuthenticated: false, tokenExpiry: null }),
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
