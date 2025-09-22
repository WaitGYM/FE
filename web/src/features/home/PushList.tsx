import { ChevronLeft } from "lucide-react";
import Header from "../../components/layout/Header";

export default function PushList() {
  return (
    <div className="pushlist-page">
      <div className="content-scroll">
        <Header
          leftContent={
            <button className="btn btn-icon">
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<span>알람</span>}
        />
        <section className="container">
          <div className="push-wrap">
            <div className="top">총 알람 3개</div>

            <div className="push-list-wrap">
              <div className="list">
                <div className="state">
                  <span className="badge push-res">예약</span>
                  <span className="time">30초전</span>
                </div>
                <div className="msg">예약한 스미스머신에 자리가 비었어요!</div>
              </div>

              <div className="list">
                <div className="state">
                  <span className="badge push-reser">대기</span>
                  <span className="time">30초전</span>
                </div>
                <div className="msg">
                  내 스텝밀 뒤에 기다리는 사람이 1명 있어요.
                </div>
              </div>

              <div className="list">
                <div className="state">
                  <span className="badge push-break">운동</span>
                  <span className="time">3일전</span>
                </div>
                <div className="msg">5초뒤 운동화면으로 전환됩니다.</div>
              </div>
            </div>

            <div className="bottom-notice">
              최근 30일간의 알림내역을 제공합니다.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
