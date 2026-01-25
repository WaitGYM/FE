import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserType } from "../types";
import { useLoadingStore } from "./loadingStore";
import { userApi } from "../services";
import { useAuthStore } from "./authStore";
import { useUIStore } from "./UIStore";
import { usePreferenceStore } from "./preferenceStore";

interface UserState {
  userInfo: UserType;

  guestLogin: () => Promise<boolean>;
  getUserInfo: () => Promise<void>;
  terminateSession: () => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

const { setLoading } = useLoadingStore.getState();

const getEndOfDay = () => {
  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );
  return endOfDay.toISOString();
};

const initialState = {
  userInfo: {
    name: "회원",
    avatar: "/thumb-default.jpg",
    isGuest: false,
  },
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    ...initialState,

    _initUserStores: (userId: number) => {
      useUIStore.getState().setUserId(userId);
      usePreferenceStore.getState().setUserId(userId);
    },

    getUserInfo: async () => {
      setLoading(true);
      try {
        const { data } = await userApi.getUserInfo();

        // 게스트로 당일 재접속(재로그인X)시 토큰으로 받은 유저 데이터에 게스트 유무 값 없어 임시 처리
        if (data.name.includes("Guest")) {
          set({
            userInfo: {
              ...initialState.userInfo,
              id: data.id,
              name: `Guest_${data.id}`,
              isGuest: true,
            },
          });
          useUIStore.getState().setUserId(data.id);
          usePreferenceStore.getState().setUserId(data.id);
        } else {
          set({ userInfo: data });
          useUIStore.getState().setUserId(data.id);
          usePreferenceStore.getState().setUserId(data.id);
        }
      } catch (error) {
        console.log("사용자 정보 호출 실패!!", error);
      } finally {
        setLoading(false);
      }
    },

    guestLogin: async () => {
      setLoading(true);
      try {
        const { data } = await userApi.guestLogin();
        const { login } = useAuthStore.getState();

        login(data.token, getEndOfDay());

        set({
          userInfo: {
            ...initialState.userInfo,
            id: data.user.id,
            name: `Guest_${data.user.id}`,
            isGuest: data.user.isGuest,
          },
        });
        useUIStore.getState().setUserId(data.user.id);
        usePreferenceStore.getState().setUserId(data.user.id);

        return true;
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },

    terminateSession: async () => {
      setLoading(true);
      try {
        await userApi.terminateSession();
        return true;
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },

    deleteAccount: async () => {
      setLoading(true);
      try {
        await userApi.deleteAccount();
        return true;
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },
  })),
);
