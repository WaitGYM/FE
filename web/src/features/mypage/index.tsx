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
import { useNavigate } from "react-router-dom";
import thumbDefault from "../../assets/images/thumb-default.jpg"; //프로필 default이미지

export default function Mypage() {
  const navigate = useNavigate();

  return (
    <div className="mypage">
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
              <strong>박철민</strong>님
            </div>
            <div className="profile-img">
              <img src={thumbDefault} alt="프로필 이미지" />
            </div>
          </div>
          <div className="menu-wrap">
            <a className="menu" href="/profile">
              <User size={18} strokeWidth="1.5" />
              개인정보 수정
            </a>
            <a className="menu" href="/gyms">
              <Dumbbell size={18} strokeWidth="1.5" />
              이용 헬스장 변경
            </a>
            <a className="menu" href="/favorites">
              <Star size={18} strokeWidth="1.5" />
              즐겨찾기한 기구
            </a>
            <a className="menu" href="/cs">
              <Headset size={18} strokeWidth="1.5" />
              고객센터
            </a>
            <a className="menu" href="/settings">
              <Settings size={18} strokeWidth="1.5" />앱 설정
            </a>
            <a className="menu" href="/legal">
              <FileCheck2 size={18} strokeWidth="1.5" />
              서비스 약관
            </a>
          </div>

          <a className="btn-logout">로그아웃</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
