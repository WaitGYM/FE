import PushMsg from "../../components/ui/PushMsg";
import { Plus, Minus } from "lucide-react";
import CircularTimer from "../../components/ui/CircularTimer";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";

export default function WorkoutBreaktimer() {
  return (
    <div className="workout-page" id="breaktimer">
      <Header
        className="header--breaktimer"
        rightContent={
          <div className="btn-side">
            <span>루틴 현황 보기</span>
          </div>
        }
      />

      <section className="container">
        <PushMsg />
        <CircularTimer thickness={1.5} title="휴식 타이머" />
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-gray">
          <Plus />
        </button>
        <button className="btn btn-orange">휴식중단</button>
        <button className="btn btn-gray">
          <Minus />
        </button>
      </BottomButtonWrapper>
    </div>
  );
}
