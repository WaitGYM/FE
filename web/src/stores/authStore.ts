import { create } from "zustand";

interface AuthStoreType {
  token: string | null;
  // Actions
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
