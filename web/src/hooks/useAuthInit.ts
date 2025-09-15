import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export const useAuthInit = () => {
  const { login } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth-storage");
    if (savedToken) {
      const parsed = JSON.parse(savedToken);
      if (parsed?.state?.token) {
        login(parsed.state.token);
      }
    }
  }, []);
};
