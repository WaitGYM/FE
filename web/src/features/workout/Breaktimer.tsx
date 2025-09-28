import { motion } from "framer-motion";
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
  const { increaseSetsCount, skipRest } = useWorkoutStore();

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
    increaseSetsCount();
    navigate(-1);
  }

  return (
    <motion.div
      className={`workout-page breaktimer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <Header
        className="header--breaktimer"
        rightContent={
          <div className="btn-side" onClick={handleEquipStatusNavigate}>
            <span>기구 현황 보기</span>
          </div>
        }
      />

      <section className="container">
        <CircularTimer thickness={1.5} />
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-gray" onClick={() => adjustRest(-5)}>
          <Minus />
        </button>
        <button className="btn btn-orange" onClick={handleSkipRest}>
          휴식중단
        </button>
        <button className="btn btn-gray" onClick={() => adjustRest(+5)}>
          <Plus />
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
