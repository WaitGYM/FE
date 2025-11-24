import { motion } from "framer-motion";
import { Dumbbell, Timer } from "lucide-react";
import motionIcon from "@img/motion-clap.png"; //이미지
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useWorkoutStore } from "./stores/workoutStore";
import { formatDateStr } from "../../hooks/useDateFormatting";
import { useUIStore } from "../../stores/UIStore";
import { useEulReul } from "../../hooks/useEulReul";

export default function WorkoutCompletePage() {
  const navigate = useNavigate();
  const { workingOutInfo, workoutProgressInfo, resetWorkoutState } =
    useWorkoutStore();
  const { workoutMode } = useUIStore();
  const { pickEulReul } = useEulReul();

  function handleWorkoutComplete() {
    navigate(
      `/reservation/select-equipment${
        workoutMode === "routine" ? "/routine" : ""
      }`,
      { replace: true }
    );

    const timer = setTimeout(() => {
      resetWorkoutState();
    }, 100);
    return () => clearTimeout(timer);
  }

  return (
    <motion.div
      className="container workout-complete-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="complete-title">
        <div className="icon-motion" id="clap">
          <img src={motionIcon} alt="박수" />
        </div>
        <h1>
          {pickEulReul(workingOutInfo.equipmentName)}
          <br />
          멋지게 성공하셨군요!
        </h1>
        {workingOutInfo && <p>{formatDateStr(workingOutInfo.startedAt)}</p>}
      </div>

      {workoutProgressInfo?.summary && (
        <ul className="complete-time">
          <li>
            <strong>
              <Dumbbell /> 총 운동시간
            </strong>
            <span id="exercise-time">
              {workoutProgressInfo.summary?.workTime}
            </span>
          </li>
          <li>
            <strong>
              <Timer /> 총 휴식시간
            </strong>
            <span>
              {workoutProgressInfo.summary?.totalRest ||
                workoutProgressInfo.summary?.restTime}
            </span>
          </li>
        </ul>
      )}

      <BottomButtonWrapper>
        <button
          type="button"
          className="btn btn-orange"
          onClick={handleWorkoutComplete}
        >
          확인
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
