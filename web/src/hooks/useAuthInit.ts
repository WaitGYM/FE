import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

export const useAuthInit = () => {
  const { login } = useAuthStore();
  const { getUserInfo } = useUserStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth-storage");
    if (savedToken) {
      const parsed = JSON.parse(savedToken);
      if (parsed?.state?.token) {
        login(parsed.state.token);
        getUserInfo();
      }
    }
  }, []);
};
