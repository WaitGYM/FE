// import { useNavigate } from "react-router-dom";
import { Bell, AlarmClock } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import motion from "@img/motion-strong.png"; //이미지
import LinearProgress from "@mui/material/LinearProgress";

export default function Mission() {
  const maxMissionCount = 4;

  // 미션 데이터를 객체 배열로 관리
  const missions = [
    {
      title: "아침 9~12시에 출석하기",
      score: "2000",
      progress: 3,
    },
    {
      title: "총 휴식시간을 3분이하로 휴식하기",
      score: "2000",
      progress: 1,
    },
    {
      title: "주 4회 기다려짐 출석하기",
      score: "5000",
      progress: 4,
    },
  ];

  return (
    <div className="mission-page">
      <div className="content-scroll">
        <Header
          className="header--mission"
          leftContent={
            <div className="header-tab">
              <a href="/" className="active">
                미션
              </a>
              <a href="/ranking">랭킹</a>
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
              철민님, 미션달성을 위해
              <br />
              조금만 더 힘내세요!
            </div>
            <div className="icon-motion">
              <img src={motion} alt="화이팅" />
            </div>
          </div>
          <div className="mission-wrap">
            <div className="top">
              <span>총 {missions.length}개 미션</span>
              <span className="time">
                <AlarmClock size={18} strokeWidth="1.5" />
                8시간
              </span>
            </div>
            <div className="mission-list">
              {missions.map((mission, index) => {
                return (
                  <div className="mission-item" key={index}>
                    <div className="info">
                      <div className="title">{mission.title}</div>
                      <div className="score">{mission.score}점</div>
                    </div>
                    <div className="progress-bar">
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={(mission.progress / maxMissionCount) * 100}
                      />
                      <p className="num-count">
                        {mission.progress}/{maxMissionCount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
