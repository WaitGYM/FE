import { ChevronLeft, Camera } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";
import googleLogo from "@img/icon-google.svg"; //이미지로고
import thumbDefault from "@img/thumb-default.jpg";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore";

export default function Profile() {
  const navigate = useNavigate();
  const { userInfo, deleteUser } = useUserStore();
  const logout = useAuthStore((state) => state.logout);

  async function handleDeleteUser() {
    // api 미작업으로 보류
    // await deleteUser();
    // logout();
    // navigate("/login");
  }

  return (
    <motion.div
      className="mypage-page"
      id="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <Header
        className="header--mypage"
        leftContent={
          <button
            type="button"
            className="btn btn-icon"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        title={<span>개인정보수정</span>}
      />

      <div className="container">
        <section className="profile-section">
          <div
            className="thumb-wrap"
            // style={{ backgroundImage: `url(${userInfo.avatar})` }}
          >
            <img
              src={`${userInfo.avatar || thumbDefault}`}
              alt="현재 프로필 이미지"
            />
            {/* <button type="button" className="btn-file">
              <Camera size={20} strokeWidth={1.5} />
            </button> */}
          </div>
        </section>
        <section className="info-section">
          <label htmlFor="inputId">
            <p className="label-title">아이디</p>
            <div className="input-with-icon">
              <img src={googleLogo} className="icon-google" alt="" />

              <input type="text" id="inputId" value={userInfo.email} readOnly />
            </div>
          </label>
          <label htmlFor="inputName">
            <p className="label-title">이름</p>
            <input type="text" id="inputName" value={userInfo.name} readOnly />
          </label>
        </section>

        <button
          type="button"
          className="btn-withdraw"
          onClick={handleDeleteUser}
        >
          탈퇴하기
        </button>
      </div>

      {/* <BottomButtonWrapper>
        <button className="btn btn-orange">수정하기</button>
      </BottomButtonWrapper> */}
    </motion.div>
  );
}
