import { apiClient } from "../apiClient";
import type { FavoriteType } from "../../types";

export const favoriteApi = {
  getFavoriteList: () => apiClient.get<FavoriteType[]>("/favorites"),
  addFavorite: (equipmentId: number) =>
    apiClient.post(`/favorites/${equipmentId}`),
  deleteFavorite: (equipmentId: number) =>
    apiClient.delete(`/favorites/equipment/${equipmentId}`),
};
