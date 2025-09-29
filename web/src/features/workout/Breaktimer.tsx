import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CircularTimer from "../../components/ui/CircularTimer";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "./stores/workoutStore";

export default function WorkoutBreaktimer() {
  const navigate = useNavigate();
  const { isRestTimerMiniView, toggleRestTimerMiniView } = useUIStore();
  const adjustRest = useWorkoutStore((state) => state.adjustRest);
  const { workingOutInfo, leftRestTime, completeRest, skipRest } =
    useWorkoutStore();

  // 0초 되면 자동 이동
  useEffect(() => {
    if (leftRestTime === 0) {
      goWorkoutPage();
    }
  }, [leftRestTime]);

  // 플로트뷰로 보기 상태값 체크용
  useEffect(() => {
    console.log("isRestTimerMiniView: ", isRestTimerMiniView);
  }, [isRestTimerMiniView]);

  // 기구 현황 보기 버튼
  function handleEquipStatusNavigate() {
    toggleRestTimerMiniView();
    setTimeout(() => {
      navigate("/reservation/select-equipment");
    }, 200); // animation duration
  }

  // 휴식 건너뛰기
  function handleSkipRest() {
    skipRest();
    goWorkoutPage();
  }

  // 운동 타이머로 이동
  function goWorkoutPage() {
    // navigate("/workout/exercising");
    completeRest();
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
        <button className="btn btn-gray" onClick={() => adjustRest(-10)}>
          <Minus />
        </button>
        <button className="btn btn-orange" onClick={handleSkipRest}>
          휴식중단
        </button>
        <button className="btn btn-gray" onClick={() => adjustRest(10)}>
          <Plus />
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
