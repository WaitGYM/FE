import type { EquipmentType } from "../../types";
import CircularTimer from "../../components/ui/CircularTimer";
import { ChevronLeft, Star, Equal, RefreshCcw } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkoutReservation({
  name = "힙어브덕션",
  imgSrc = "/equipment_01.png",
  waitingTime = 40,
  waitingCount = 2,
}: EquipmentType) {
  //휴식타이머
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setIsZoomingOut(true);
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  //새로고침 아이콘회전
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };

  return (
    <div className="reservation-page" id="workout-reservation">
      <div className="content-scroll">
        <Header
          leftContent={
            <button className="btn btn-icon">
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<span>8월 22일 운동 루틴</span>}
          rightContent={
            <button className="btn btn-icon" onClick={handleRefreshClick}>
              <RefreshCcw
                size={20}
                strokeWidth="2"
                className={isRefreshing ? "rotating" : ""}
              />
            </button>
          }
        />
        <section className="container">
          <div className="equipment">
            <div className="icon-drag">
              <Equal size={20} strokeWidth="2" />
            </div>
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={20} strokeWidth="2" />
                </div>
              </div>
              <div className={`status ${waitingTime ? "waiting" : null}`}>
                <span className="badge waiting">대기중</span>
                <span>대기 {waitingTime}분</span>
                <span className="dot"></span>
                <span>{waitingCount}명</span>
              </div>
            </div>
          </div>
          <div className="equipment">
            <div className="icon-drag">
              <Equal size={20} strokeWidth="2" />
            </div>
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={20} strokeWidth="2" />
                </div>
              </div>
              <div className="status">
                <span className="badge complete">운동완</span>
                <span>이용가능</span>
              </div>
            </div>
          </div>
          <div className="equipment">
            <div className="icon-drag">
              <Equal size={20} strokeWidth="2" />
            </div>
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={20} strokeWidth="2" />
                </div>
              </div>
              <div className={`status ${waitingTime ? "waiting" : null}`}>
                <span>대기 {waitingTime}분</span>
                <span className="dot"></span>
                <span>{waitingCount}명</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomButtonWrapper>
        <button className="btn btn-orange">대기하기</button>
      </BottomButtonWrapper>

      {/* 휴식시간타이머 */}
      <div onClick={() => handleNavigate("/workout/breaktimer")}>
        <CircularTimer
          thickness={2}
          showSetIcons={false}
          className={isZoomingOut ? "zoom-out" : ""}
        />
      </div>
    </div>
  );
}
