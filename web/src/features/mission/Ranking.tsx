// import { useNavigate } from "react-router-dom";
import { Bell, CalendarClock } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { motion } from "framer-motion";
import motionIcon from "@img/motion-trophy.png"; //이미지
import thumbDefault from "../../assets/images/thumb-default.jpg"; //프로필 default이미지

export default function Ranking() {
  // 미션 데이터를 객체 배열로 관리
  const rankings = [
    {
      imgSrc: thumbDefault,
      userName: "펭하",
      totalScore: "22000",
    },
    {
      imgSrc: thumbDefault,
      userName: "박철민",
      totalScore: "12000",
    },
    {
      imgSrc: thumbDefault,
      userName: "코코팝",
      totalScore: "5600",
    },
    {
      imgSrc: thumbDefault,
      userName: "라일라",
      totalScore: "4000",
    },
    {
      imgSrc: thumbDefault,
      userName: "근댕이는바보",
      totalScore: "2000",
    },
  ];

  return (
    <motion.div
      className="ranking"
      id="ranking-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--achive"
          leftContent={
            <div className="header-tab">
              <a href="/mission">미션</a>
              <a href="/ranking" className="active">
                랭킹
              </a>
            </div>
          }
          rightContent={
            <div className="icon-bell">
              <Bell size={24} strokeWidth="1.5" />
            </div>
          }
        />
        <div className="container">
          <div className="greeting">
            <div className="msg">
              짐박스 구로디지털단지점
              <br />
              <strong>이번주 챔피언은?</strong>
            </div>
            <div className="icon-motion">
              <img src={motionIcon} alt="화이팅" />
            </div>
          </div>
          <div className="ranking-wrap">
            <div className="top">
              <span className="time">
                <CalendarClock size={18} strokeWidth="1.5" />
                25/09/01 ~ 25/09/08
              </span>
              <span>상위 10명</span>
            </div>
            <div className="ranking-wrap-list">
              {rankings.map((ranking, index) => {
                return (
                  <div className="ranking-wrap-list-item" key={index}>
                    {/* 내 순위는 라벨이 오렌지색이여야 하므로 .me를 붙여주세요 */}
                    <div className="rank-num">{index + 1}</div>
                    {/* <div className="rank-num me">{index + 1}</div> */}

                    <div className="user-info">
                      <div className="profile-thumb">
                        <img src={ranking.imgSrc} alt="기본 이미지" />
                      </div>
                      <strong className="name">{ranking.userName}</strong>
                    </div>
                    <div className="total-score">{ranking.totalScore}점</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
