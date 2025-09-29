import * as SecureStore from "expo-secure-store";
import { SECURE_STORE_TOKEN_KEY } from "../constants/appConstants";

export const authService = {
  getToken: async () => SecureStore.getItemAsync(SECURE_STORE_TOKEN_KEY),
  setToken: async (token: string) =>
    SecureStore.setItemAsync(SECURE_STORE_TOKEN_KEY, token),
  removeToken: async () => SecureStore.deleteItemAsync(SECURE_STORE_TOKEN_KEY),
};
