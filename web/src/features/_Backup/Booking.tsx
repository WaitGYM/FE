import PushMsg from "../../components/ui/PushMsg";
import { ChevronLeft, UsersRound } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";

export default function WorkoutBooking() {
  return (
    <div className="workout-page" id="booking">
      <Header
        className="header--booking"
        leftContent={
          <button className="btn btn-icon">
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        rightContent={
          <div className="btn-side">
            <span>대기취소</span>
          </div>
        }
      />

      <section className="container">
        <PushMsg />

        <div className="text-wrap">
          <h6>트레드밀</h6>
          <h1>20분 대기</h1>
          <p>
            <UsersRound size={18} strokeWidth="2" />
            <span className="waiting-user">2명</span> 기다리는중
          </p>
        </div>
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-orange">사용 요청 보내기</button>
      </BottomButtonWrapper>
    </div>
  );
}
