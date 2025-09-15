import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="container">
        <h1>로그인 처리중...</h1>
      </div>
    </div>
  );
}
