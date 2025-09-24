import { Plus, Minus } from "lucide-react";
import CircularTimer from "../../components/ui/CircularTimer";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUIStore } from "../../stores/UIStore";

export default function WorkoutBreaktimer() {
  const navigate = useNavigate();
  const { isRestTimerMiniView, toggleRestTimerMiniView } = useUIStore();

  const handleEquipStatusNavigate = () => {
    toggleRestTimerMiniView();
    setTimeout(() => {
      navigate("/reservation/select-equipment");
    }, 200); // animation duration
  };

  useEffect(() => {
    console.log("isRestTimerMiniView: ", isRestTimerMiniView);
  }, [isRestTimerMiniView]);

  return (
    <div className={`workout-page`} id="breaktimer">
      <Header
        className="header--breaktimer"
        rightContent={
          <div className="btn-side" onClick={handleEquipStatusNavigate}>
            <span>기구 현황 보기</span>
          </div>
        }
      />

      <section className="container">
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
