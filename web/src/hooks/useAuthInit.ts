import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useUIStore } from "../stores/UIStore";

export const useAuthInit = () => {
  const { login, logout } = useAuthStore();
  const { getUserInfo } = useUserStore();
  const { initIsEquipAutoSorting } = useUIStore();

  useEffect(() => {
    const savedAuthInfo = localStorage.getItem("auth-storage");
    if (savedAuthInfo) {
      const parsed = JSON.parse(savedAuthInfo);
      if (parsed?.state?.token) {
        // 토큰 유효성 검사
        if (parsed.state.tokenExpiry) {
          const now = new Date();
          const expiryDate = new Date(parsed.state.tokenExpiry);

          if (now >= expiryDate) {
            console.log("게스트 토큰이 만료되었습니다.");
            logout();
            localStorage.removeItem("auth-storage");
            return;
          }
        }

        // 토큰이 유효하면 로그인 상태 복원
        login(parsed.state.token, parsed.state.tokenExpiry);
        getUserInfo();
        initIsEquipAutoSorting();
      }
    }
  }, []);
};
