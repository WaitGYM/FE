import PushMsg from "../../components/ui/PushMsg";
import { ChevronLeft, UsersRound } from "lucide-react";

export default function WorkoutBooking() {
  return (
    <div className="workout-page" id="booking">
      <header>
        <div className="header-top">
          <button className="btn btn-icon">
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
          <div className="btn-side">
            <span>대기취소</span>
          </div>
        </div>
      </header>

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

      <div className="btn-wrap">
        <button className="btn btn-orange">사용 요청 보내기</button>
      </div>
    </div>
  );
}
