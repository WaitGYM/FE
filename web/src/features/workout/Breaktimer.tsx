import { Plus, Minus } from "lucide-react";
import CircularTimer from "../../components/ui/CircularTimer";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "./stores/workoutStore";

export default function WorkoutBreaktimer() {
  const navigate = useNavigate();
  const { isRestTimerMiniView, toggleRestTimerMiniView } = useUIStore();
  const restTime = useWorkoutStore((state) => state.restTime);
  const adjustRest = useWorkoutStore((state) => state.adjustRest);
  const { skipRest } = useWorkoutStore();

  // 자동 타이머: 1초마다 감소
  // useEffect(() => {
  //   if (restTime === 0) return;

  //   const interval = setInterval(() => {
  //     adjustRest(-1);
  //   }, 1000);

  //   return () => clearInterval(interval); // 언마운트 시 정리
  // }, [restTime]);

  // 0초 되면 자동 이동
  useEffect(() => {
    if (restTime === 0) {
      goWorkoutPage();
    }
  }, [restTime, navigate]);

  useEffect(() => {
    console.log("isRestTimerMiniView: ", isRestTimerMiniView);
  }, [isRestTimerMiniView]);

  function handleEquipStatusNavigate() {
    toggleRestTimerMiniView();
    setTimeout(() => {
      navigate("/reservation/select-equipment");
    }, 200); // animation duration
  }

  function handleSkipRest() {
    skipRest();
    goWorkoutPage();
  }

  function goWorkoutPage() {
    // navigate("/workout/exercising");
    navigate(-1);
  }

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
        <button className="btn btn-gray" onClick={() => adjustRest(+5)}>
          <Plus />
        </button>
        <button className="btn btn-orange" onClick={handleSkipRest}>
          휴식중단
        </button>
        <button className="btn btn-gray" onClick={() => adjustRest(-5)}>
          <Minus />
        </button>
      </BottomButtonWrapper>
    </div>
  );
}
