import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { authService } from "../services/authService";
import { config } from "../constants/appConstants";

const BACKEND_LOGIN_URL = config.api.googleLoginUrl;

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeepLink = ({ url }: { url: string }) => {
    const { queryParams } = Linking.parse(url);
    if (queryParams?.token && typeof queryParams.token === "string") {
      const receivedToken = queryParams.token;
      setAccessToken(receivedToken);
      authService.setToken(receivedToken);
    }
  };

  useEffect(() => {
    const loadInitialToken = async () => {
      const storedToken = await authService.getToken();
      if (storedToken) setAccessToken(storedToken);
      setIsLoading(false);
    };

    loadInitialToken();

    Linking.getInitialURL().then((url) => url && handleDeepLink({ url }));
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  const login = () => WebBrowser.openBrowserAsync(BACKEND_LOGIN_URL);
  const logout = async () => {
    await authService.removeToken();
    setAccessToken(null);
  };

  return { accessToken, isLoading, login, logout };
};
