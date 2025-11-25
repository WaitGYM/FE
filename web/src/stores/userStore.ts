import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserType } from "../types";
import { useLoadingStore } from "./loadingStore";
import { userApi } from "../services";

interface UserState {
  userInfo: UserType;

  // setUser: (user: UserType) => void;
  getUserInfo: () => Promise<void>;
  deleteUser: () => Promise<void>;
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
        const { data } = await userApi.getUserInfo();
        set({ userInfo: data });
      } catch (error) {
        console.log("사용자 정보 호출 실패!!", error);
      } finally {
        setLoading(false);
      }
    },

    deleteUser: async () => {
      setLoading(true);
      try {
        await userApi.getUserInfo();
      } catch (error) {
        console.log("탈퇴하기 실패!!", error);
      } finally {
        setLoading(false);
      }
    },
  }))
);
