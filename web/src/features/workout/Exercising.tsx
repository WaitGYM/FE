import { useNavigate } from "react-router-dom";
import { CircleCheck, Circle } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useWorkoutStore } from "./stores/workoutStore";
import { motion } from "framer-motion";
import { useUIStore } from "../../stores/UIStore";

export default function WorkoutExercising() {
  const navigate = useNavigate();
  const { workingOutInfo, stopWorkout, completeWorkoutSet } = useWorkoutStore();
  const { isRestTimerModalOpen, setRestTimerModalOpen } = useUIStore();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRestTimerModalOpen) setIsRunning(true);
  }, [isRestTimerModalOpen]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function formatTime(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  function handleTimerReset() {
    setIsRunning(false);
    setTime(0);
  }

  async function handleSetComplete() {
    const isWorkoutCompleted = await completeWorkoutSet();
    if (!isWorkoutCompleted) {
      handleTimerReset();
      setRestTimerModalOpen(true);
    } else {
      handleWorkoutComplete();
    }
  }

  function handleWorkoutStop() {
    stopWorkout();
    handleWorkoutComplete();
  }

  function handleWorkoutComplete() {
    handleTimerReset();
    navigate("/workout/complete", { replace: true });
  }

  return (
    <motion.div
      className="workout-page exercising"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <Header
        className="header--exercising"
        rightContent={
          <button
            type="button"
            className="btn-delete"
            onClick={handleWorkoutStop}
          >
            <span>운동종료</span>
          </button>
        }
      />

      <section className="container">
        <div className="text-wrap">
          <h1>{workingOutInfo?.equipmentName}</h1>
          <h2 className="timer-text">{formatTime(time)}</h2>
          {workingOutInfo && (
            <>
              <div className="set-count" aria-hidden="true">
                {Array.from({ length: workingOutInfo.totalSets }).map(
                  (_, index) =>
                    workingOutInfo.currentSet > index ? (
                      <CircleCheck
                        size={20}
                        strokeWidth="2"
                        className="on"
                        key={`set${index}`}
                      />
                    ) : (
                      <Circle size={20} strokeWidth="2" key={`set${index}`} />
                    ),
                )}
              </div>
              <p className="visually-hidden" aria-live="polite">
                {workingOutInfo.totalSets}개 중 {workingOutInfo.currentSet}세트
                완료
              </p>
            </>
          )}
        </div>
      </section>

      <BottomButtonWrapper>
        <button
          className="btn btn-blue"
          onClick={handleSetComplete}
          type="button"
        >
          {workingOutInfo.currentSet !== workingOutInfo.totalSets
            ? "세트"
            : "운동"}{" "}
          완료
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
