import { create } from "zustand";
import { favoriteApi } from "../services";
import type { FavoriteType } from "../types";
import { useLoadingStore } from "./loadingStore";
const setLoading = useLoadingStore.getState().setLoading;

interface FavoriteStoreType {
  favoriteList: FavoriteType[];
  error: string | null;

  getFavoriteList: () => Promise<void>;
  addFavorite: (eqId: number) => Promise<void>;
  deleteFavorite: (eqId: number) => Promise<void>;
  resetState: () => void;
}

const initialState = {
  favoriteList: [],
  error: null,
};

export const useFavoriteStore = create<FavoriteStoreType>((set, get) => ({
  ...initialState,

  getFavoriteList: async () => {
    setLoading(true);
    try {
      const favoritesData = (await favoriteApi.getFavoriteList()).data;
      set({ favoriteList: favoritesData });
    } catch (error) {
      set({
        error: "즐겨찾기 목록을 불러오는데 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  addFavorite: async (eqId) => {
    setLoading(true);
    try {
      const response = await favoriteApi.addFavorite(eqId);
      console.log("addFavorite :", response);
    } catch (error) {
      set({
        error: "즐겨찾기 추가에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  deleteFavorite: async (eqId) => {
    setLoading(true);
    try {
      const response = await favoriteApi.deleteFavorite(eqId);
      console.log("deleteFavorite :", response);
    } catch (error) {
      set({
        error: "즐겨찾기 삭제에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  },

  resetState: () => set(initialState),
}));
