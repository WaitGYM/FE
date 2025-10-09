import {
  Bell,
  User,
  Dumbbell,
  Star,
  Headset,
  Settings,
  FileCheck2,
} from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/userStore";

export default function Mypage() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  return (
    <motion.div
      className="mypage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--mypage"
          leftContent={<h1 className="title">내 정보</h1>}
          rightContent={
            // 읽지않음표시는 옆에 .dot을 붙여주세요
            <button
              className="icon-bell dot"
              onClick={() => navigate("/home/pushlist")}
            >
              <Bell size={24} strokeWidth="1.5" />
            </button>
          }
        />
        <div className="container">
          <div className="greeting">
            <div className="msg">
              <p>짐박스 구로디지털단지점</p>
              <strong>{userInfo.name}</strong>님
            </div>
            <div className="profile-img">
              <img src={userInfo.avatar} alt="프로필 이미지" />
            </div>
          </div>
          <div className="menu-wrap">
            <Link className="menu" to="/profile">
              <User size={18} strokeWidth="1.5" />
              개인정보수정
            </Link>
            <Link className="menu" to="/gyms">
              <Dumbbell size={18} strokeWidth="1.5" />
              이용 헬스장 변경
            </Link>
            <Link className="menu" to="/favorites">
              <Star size={18} strokeWidth="1.5" />
              즐겨찾기한 기구
            </Link>
            <Link className="menu" to="#">
              <Headset size={18} strokeWidth="1.5" />
              고객센터
            </Link>
            <Link className="menu" to="#">
              <Settings size={18} strokeWidth="1.5" />앱 설정
            </Link>
            <Link className="menu" to="#">
              <FileCheck2 size={18} strokeWidth="1.5" />
              서비스 약관
            </Link>
          </div>

          <button className="btn-logout">로그아웃</button>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
