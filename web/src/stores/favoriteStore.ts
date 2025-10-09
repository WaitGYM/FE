import { create } from "zustand";
import { favoriteApi } from "../services";
import type { FavoriteType } from "../types";
import { useLoadingStore } from "./loadingStore";
const setLoading = useLoadingStore.getState().setLoading;

interface FavoriteStoreType {
  favoriteList: FavoriteType[];

  getFavoriteList: () => Promise<void>;
  addFavorite: (eqId: number) => Promise<void>;
  deleteFavorite: (eqId: number) => Promise<void>;
  resetState: () => void;
}

const initialState = {
  favoriteList: [],
};

export const useFavoriteStore = create<FavoriteStoreType>((set, get) => ({
  ...initialState,

  getFavoriteList: async () => {
    setLoading(true);
    try {
      const { data } = await favoriteApi.getFavoriteList();
      set({ favoriteList: data });
    } catch (error) {
      console.log("즐겨찾기 목록 조회 실패!!", error);
    } finally {
      setLoading(false);
    }
  },

  addFavorite: async (eqId) => {
    setLoading(true);
    try {
      await favoriteApi.addFavorite(eqId);
    } catch (error) {
      console.log("즐겨찾기 추가에 실패!!", error);
    } finally {
      setLoading(false);
    }
  },

  deleteFavorite: async (eqId) => {
    setLoading(true);
    try {
      await favoriteApi.deleteFavorite(eqId);
    } catch (error) {
      console.log("즐겨찾기 삭제에 실패!!", error);
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
