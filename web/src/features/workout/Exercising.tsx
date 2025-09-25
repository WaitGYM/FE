import { useNavigate } from "react-router-dom";
import { CircleCheck, Circle } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useWorkoutStore } from "./stores/workoutStore";

export default function WorkoutExercising() {
  const navigate = useNavigate();
  const { workingOutInfo, stopWorkout, completeWorkoutSet } = useWorkoutStore();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      "0"
    )}`;
  }

  async function handleWorkoutFinish() {
    setIsRunning(false);
    setTime(0);
    await stopWorkout();
    navigate("/workout/complete");
  }

  async function handleSetComplete() {
    const workoutState = await completeWorkoutSet();
    if (workoutState !== "completed") {
      navigate("/workout/breaktimer");
    } else {
      handleWorkoutFinish();
    }
  }

  return (
    <div className="workout-page" id="exercising">
      <Header
        className="header--exercising"
        rightContent={
          <div className="btn-side" onClick={handleWorkoutFinish}>
            <span>운동종료</span>
          </div>
        }
      />

      <section className="container">
        <div className="text-wrap">
          <h6>{workingOutInfo?.equipmentName}</h6>
          <h1>{formatTime(time)}</h1>
          {workingOutInfo && (
            <div className="set-count">
              {Array.from({ length: workingOutInfo.totalSets }).map(
                (_, index) =>
                  workingOutInfo.currentSet > index ? (
                    <CircleCheck
                      size={18}
                      strokeWidth="2"
                      className="on"
                      key={`set${index}`}
                    />
                  ) : (
                    <Circle size={18} strokeWidth="2" key={`set${index}`} />
                  )
              )}
            </div>
          )}
        </div>
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-blue" onClick={handleSetComplete}>
          세트 완료
        </button>
      </BottomButtonWrapper>
    </div>
  );
}
