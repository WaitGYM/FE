import * as React from "react";

import type { EquipmentType } from "../../types";
import CircularTimer from "../../components/ui/CircularTimer";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ChevronLeft, Star, StarOff, Equal } from "lucide-react";

export default function WorkoutReservation({
  name = "힙어브덕션",
  imgSrc = "/equipment_01.png",
  waitingTime = 40,
  waitingCount = 2,
  isFavorite = true,
}: EquipmentType) {
  return (
    <div className="reservation-page" id="workout-reservation">
      <div className="content-scroll">
        <header>
          <div className="header-top">
            <button className="btn btn-icon">
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
            <div className="page-title">
              <span>8월 22일 운동 루틴</span>
            </div>
          </div>
        </header>
        <section className="container">
          <div className="equipment">
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={18} strokeWidth="2" />
                </div>
              </div>
              <div className={`status ${waitingTime ? "waiting" : null}`}>
                <span className="badge waiting">대기중</span>
                <span>대기 {waitingTime}분</span>
                <span className="dot"></span>
                <span>{waitingCount}명</span>
              </div>
            </div>
            <div className="icon-drag">
              <Equal size={24} strokeWidth="2" />
            </div>
          </div>
          <div className="equipment">
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={18} strokeWidth="2" />
                </div>
              </div>
              <div className="status">
                <span className="badge complete">운동완</span>
                <span>이용가능</span>
              </div>
            </div>
            <div className="icon-drag">
              <Equal size={24} strokeWidth="2" />
            </div>
          </div>
          <div className="equipment">
            <img src={imgSrc} />
            <div className="info">
              <div className="title">
                <span className="name">{name}</span>
                <div className="favorite">
                  <Star size={18} strokeWidth="2" />
                </div>
              </div>
              <div className={`status ${waitingTime ? "waiting" : null}`}>
                <span>대기 {waitingTime}분</span>
                <span className="dot"></span>
                <span>{waitingCount}명</span>
              </div>
            </div>
            <div className="icon-drag">
              <Equal size={24} strokeWidth="2" />
            </div>
          </div>
        </section>
      </div>

      <div className="btn-wrap">
        <button className="btn btn-orange">대기하기</button>
      </div>

      {/* 휴식시간타이머 */}
      <CircularTimer thickness={2} />
    </div>
  );
}
