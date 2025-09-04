import Button from "@comp/ui/Button";
import Footer from "@comp/layout/Footer";
import { Stack } from "@mui/material";
import { Bell, Dumbbell, Plus } from "lucide-react";
import logo from "@img/logo.svg"; //이미지로고

export default function HomePage() {
  const hasRoutine = true;

  return (
    <div className="home-page">
      <header>
        <div className="header-top">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="icon-bell">
            <Bell size={24} strokeWidth="1.5" />
          </div>
        </div>

        <div className="greeting">
          OO님,
          <br />
          오늘도 루틴대로 운동해볼까요?
        </div>
      </header>

      <div className="container">
        <section>
          {!hasRoutine ? (
            <ul className="not-routine">
              <li className="routine">
                <div className="icon">
                  <Plus size={32} strokeWidth="1.5" />
                </div>
                <div className="info">
                  <p className="title">루틴을 등록해주세요</p>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="routine-list">
              <li className="routine">
                <div className="icon">
                  <Dumbbell size={32} strokeWidth="1.5" />
                </div>
                <div className="info">
                  <p className="title">8월 22일 운동 루틴</p>
                  <div className="detail">
                    <span>10개 운동</span>
                    <span>예상시간 28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon">
                  <Dumbbell size={32} strokeWidth="1.5" />
                </div>
                <div className="info">
                  <p className="title">8월 23일 운동 루틴</p>
                  <div className="detail">
                    <span>10개 운동</span>
                    <span>예상시간 28분</span>
                  </div>
                </div>
              </li>
            </ul>
          )}

          <div className="btn-wrap">
            <div className="btn" id="no-routine">
              바로운동
            </div>
            <div className="btn" id="routine-add">
              루틴추가
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
