import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { useUserStore } from "../../../stores/userStore";

import { CircularProgress } from "@mui/material";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { getUserInfo } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      getUserInfo()
        .then(() => navigate("/"))
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="container">
        <CircularProgress color="inherit" />
      </div>
    </div>
  );
}
