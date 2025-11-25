import { ChevronLeft, Camera } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { image } from "framer-motion/client";
import googleLogo from "@img/icon-google.svg"; //이미지로고

export default function Profile() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

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
            style={{ backgroundImage: `url(${userInfo.avatar})` }}
          >
            <button type="button" className="btn-file">
              {/* <input type="file" id="inputUpload" /> */}
              <Camera size={20} strokeWidth={1.5} />
            </button>
          </div>
        </section>
        <section className="info-section">
          <label htmlFor="inputId">
            <p className="label-title">아이디</p>
            <div className="input-with-icon">
              <img src={googleLogo} className="icon-google" alt="google-logo" />

              <input type="text" id="inputId" value={userInfo.email} readOnly />
            </div>
          </label>
          <label htmlFor="inputName">
            <p className="label-title">이름</p>
            <input type="text" id="inputName" value={userInfo.name} readOnly />
          </label>
        </section>

        <button type="button" className="btn-withdraw">
          탈퇴하기
        </button>
      </div>

      {/* <BottomButtonWrapper>
        <button className="btn btn-orange">수정하기</button>
      </BottomButtonWrapper> */}
    </motion.div>
  );
}
