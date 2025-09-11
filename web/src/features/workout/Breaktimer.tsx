import PushMsg from "../../components/ui/PushMsg";
import { Plus, Minus } from "lucide-react";
import CircularTimer from "../../components/ui/CircularTimer";

export default function WorkoutBreaktimer() {
  return (
    <div className="workout-page" id="breaktimer">
      <header>
        <div className="header-top">
          <div className="btn-side">
            <span>루틴 현황 보기</span>
          </div>
        </div>
      </header>

      <section className="container">
        <PushMsg />
        <CircularTimer thickness={1.5} title="휴식 타이머" />
      </section>

      <div className="btn-wrap">
        <button className="btn btn-gray">
          <Plus />
        </button>
        <button className="btn btn-orange">휴식중단</button>
        <button className="btn btn-gray">
          <Minus />
        </button>
      </div>
    </div>
  );
}
