import Button from "@comp/ui/Button";
import Footer from "@comp/layout/Footer";
import { Stack } from "@mui/material";
import { Bell } from "lucide-react";
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
            <Bell size={24} stroke-width="1.5" />
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
            <div className="not-routine">루틴을 추가하세요</div>
          ) : (
            <ul className="routine-list">
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
              <li className="routine">
                <div className="icon"></div>
                <div className="info">
                  <p className="title">루틴01</p>
                  <div className="detail">
                    <span>10개운동</span>
                    <span>예상시간28분</span>
                  </div>
                </div>
              </li>
            </ul>
          )}

          <Stack direction="row" spacing={2}>
            <Button title="바로운동" color="primary" />
            <Button title="루틴추가" color="secondary" />
          </Stack>
        </section>
      </div>

      <Footer />
    </div>
  );
}
