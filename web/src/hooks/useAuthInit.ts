import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useUIStore } from "../stores/UIStore";

export const useAuthInit = () => {
  const { login } = useAuthStore();
  const { getUserInfo } = useUserStore();
  const { initIsEquipAutoSorting } = useUIStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth-storage");
    if (savedToken) {
      const parsed = JSON.parse(savedToken);
      if (parsed?.state?.token) {
        login(parsed.state.token);
        getUserInfo();
        initIsEquipAutoSorting();
      }
    }
  }, []);
};
