import logo from "@img/logo.svg"; //이미지로고
import googleLogo from "@img/icon-google.svg"; //이미지로고
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";

export default function Login() {
  function handleLogin() {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_BASE}/api/auth/google`;
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="text-wrap">
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          >
            어서오세요!
            <br />
            오늘도 운동시작 해볼까요?
          </motion.h6>
          <motion.img
            src={logo}
            className="logo"
            alt="기다려짐"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
          />
        </div>

        <BottomButtonWrapper>
          <motion.button
            onClick={handleLogin}
            className="btn btn-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
          >
            <img src={googleLogo} className="icon-google" alt="google-logo" />
            구글아이디로 로그인
          </motion.button>
        </BottomButtonWrapper>
      </div>
    </div>
  );
}
