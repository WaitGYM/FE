import { useNavigate } from "react-router-dom";
import { CircleCheck, Circle } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useWorkoutStore } from "./stores/workoutStore";
import { motion } from "framer-motion";

export default function WorkoutExercising() {
  const navigate = useNavigate();
  const { stopWorkout } = useWorkoutStore();

  const handleWorkoutFinish = () => {
    console.log("handleWorkoutFinish");

    setIsRunning(false);
    setTime(0);
    stopWorkout();
    navigate("/workout/complete");
  };

  const handleSetComplete = () => {
    navigate("/workout/breaktimer");
  };

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

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <motion.div
      className="workout-page"
      id="exercising"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
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
          <h6>스텝밀</h6>
          <h1>{formatTime(time)}</h1>
          <p>
            <CircleCheck size={18} strokeWidth="2" className="on" />
            <Circle size={18} strokeWidth="2" />
            <Circle size={18} strokeWidth="2" />
          </p>
        </div>
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-blue" onClick={handleSetComplete}>
          세트 완료
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
