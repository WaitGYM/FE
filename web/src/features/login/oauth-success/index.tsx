import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export default function OauthSuccess() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);
      navigate("/home"); // 로그인 후 이동
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
