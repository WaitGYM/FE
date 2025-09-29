import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserType } from "../types";
import { useLoadingStore } from "./loadingStore";
import { userApi } from "../services";

interface UserState {
  userInfo: UserType;

  // setUser: (user: UserType) => void;
  getUserInfo: () => Promise<void>;
  // clearUser: () => void;
}

const { setLoading } = useLoadingStore.getState();
const initialState = {
  userInfo: {
    name: "회원",
    avatar: "/thumb-default.jpg",
  },
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    ...initialState,

    // setUser: (user) => set({ user }),
    getUserInfo: async () => {
      setLoading(true);
      try {
        const resData = (await userApi.getUserInfo()).data;
        set({ userInfo: resData });
      } catch (error) {
        console.log("사용자 정보 호출 실패!!", error);
      } finally {
        setLoading(false);
      }
    },
    // clearUser: () => set({ user: null }),
  }))
);
