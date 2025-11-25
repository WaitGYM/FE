import { AlarmClock } from "lucide-react";
import motionIcon from "@img/motion-strong.png"; //이미지
import LinearProgress from "@mui/material/LinearProgress";

export default function TabMission() {
  //최대값 (임의값 4로 설정)
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
    <div className="container">
      <div className="greeting">
        <h2 className="msg">
          철민님, 미션달성을 위해
          <br />
          조금만 더 힘내세요!
        </h2>
        <div className="icon-motion">
          <img src={motionIcon} alt="화이팅" />
        </div>
      </div>
      <div className="mission-wrap">
        <div className="top">
          <span>총 {missions.length}개 미션</span>
          <span className="time">
            <AlarmClock size={20} strokeWidth="1.5" />
            8시간
          </span>
        </div>
        <ul className="mission-wrap-list">
          {missions.map((mission, index) => {
            return (
              <li className="mission-wrap-list-item" key={index}>
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
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
