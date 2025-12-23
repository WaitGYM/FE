import logo from "@img/logo.svg"; //이미지로고
import googleLogo from "@img/icon-google.svg"; //이미지로고
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

export default function Login() {
  const navigate = useNavigate();
  const { guestLogin } = useUserStore();

  function handleGoogleLogin() {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_BASE}/api/auth/google`;
  }

  async function handleGuestLogin() {
    const success = await guestLogin();
    success
      ? navigate("/")
      : alert("게스트 로그인에 실패했습니다. 다시 시도해주세요.");
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="text-wrap">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
          >
            어서오세요!
            <br />
            오늘도 운동시작 해볼까요?
          </motion.h1>
          <motion.img
            src={logo}
            className="logo"
            alt="기다려짐"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
          />
        </div>

        <BottomButtonWrapper>
          <motion.button
            onClick={handleGoogleLogin}
            className="btn btn-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
          >
            <img src={googleLogo} className="icon-google" alt="" />
            구글아이디로 로그인
          </motion.button>

          <motion.button
            onClick={handleGuestLogin}
            className="btn btn-blue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
          >
            게스트로 로그인
          </motion.button>
        </BottomButtonWrapper>
      </div>
    </div>
  );
}
