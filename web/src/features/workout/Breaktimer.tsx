import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Circle, CircleCheck } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import { useEffect } from "react";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "./stores/workoutStore";

const formatTime = (sec: number): string => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default function WorkoutBreaktimer() {
  const navigate = useNavigate();
  const {
    isRestTimerModalOpen,
    toggleRestTimerModalOpen,
    isRestTimerMiniView,
    setIsRestTimerMiniView,
  } = useUIStore();
  const adjustRest = useWorkoutStore((state) => state.adjustRest);
  const {
    workingOutInfo,
    workoutProgressInfo,
    leftRestTime,
    completeRest,
    skipRest,
    autoDecreaseRest,
  } = useWorkoutStore();

  // 자동 타이머: 1초마다 감소
  useEffect(() => {
    if (!isRestTimerModalOpen) return;
    if (leftRestTime === 0) return;

    const interval = setInterval(() => {
      autoDecreaseRest();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRestTimerModalOpen, leftRestTime, autoDecreaseRest]);

  const progressValue =
    workoutProgressInfo.restSeconds > 0
      ? (leftRestTime / workoutProgressInfo.restSeconds) * 100
      : 0;

  // 0초 되면 자동 이동
  useEffect(() => {
    if (!isRestTimerModalOpen) return;

    if (leftRestTime === 5) {
      setIsRestTimerMiniView(false);
    }
    if (leftRestTime === 0) {
      goWorkoutPage();
    }
  }, [isRestTimerModalOpen, leftRestTime]);

  // 휴식 건너뛰기
  function handleSkipRest() {
    skipRest();
    goWorkoutPage();
  }

  // 운동 타이머로 이동
  function goWorkoutPage() {
    completeRest();
    navigate("/workout/exercising", { replace: true });
    toggleRestTimerModalOpen();
  }

  if (!isRestTimerModalOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal"
        className={`workout-page breaktimer modal ${
          isRestTimerMiniView ? "mini" : "full"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
      >
        {!isRestTimerMiniView ? (
          <>
            <Header
              className="header--breaktimer"
              rightContent={
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRestTimerMiniView(true);
                    navigate("/reservation/select-equipment");
                  }}
                  type="button"
                >
                  <span>기구 현황 보기</span>
                </button>
              }
            />
            <section className="container">
              <Box className={`circular-timer`}>
                {/* 배경 트랙 */}
                <CircularProgress
                  className="track"
                  variant="determinate"
                  value={100}
                  thickness={1.5}
                />
                {/* 진행률 바 */}
                <CircularProgress
                  className="progress"
                  variant="determinate"
                  value={progressValue}
                  thickness={1.5}
                />
                {/* 중앙의 시간 텍스트 */}
                <Box className="circular-timer__text-box">
                  <Typography variant="h2" component="div" color="white">
                    <div className="text-wrap">
                      <h6>휴식타이머</h6>
                      <h1>{formatTime(leftRestTime)}</h1>
                      <div className="set-count">
                        {Array.from({ length: workingOutInfo.totalSets }).map(
                          (_, index) =>
                            workingOutInfo.currentSet > index ? (
                              <CircleCheck
                                size={18}
                                strokeWidth="2"
                                className="on"
                                key={`set${index}check`}
                              />
                            ) : (
                              <Circle
                                size={18}
                                strokeWidth="2"
                                key={`set${index}`}
                              />
                            )
                        )}
                      </div>
                    </div>
                  </Typography>
                </Box>
              </Box>
            </section>
            <BottomButtonWrapper>
              <button
                className="btn btn-gray"
                onClick={() => adjustRest(-10)}
                disabled={leftRestTime < 11}
                type="button"
              >
                <Minus />
              </button>
              <button
                className="btn btn-orange"
                onClick={handleSkipRest}
                type="button"
              >
                휴식중단
              </button>
              <button
                className="btn btn-gray"
                onClick={() => adjustRest(10)}
                disabled={workoutProgressInfo.restSeconds > 299}
                type="button"
              >
                <Plus />
              </button>
            </BottomButtonWrapper>
          </>
        ) : (
          <button
            className={`circular-timer`}
            onClick={(e) => {
              e.stopPropagation();
              setIsRestTimerMiniView(false);
            }}
            type="button"
          >
            {/* 배경 트랙 */}
            <CircularProgress
              className="track"
              variant="determinate"
              value={100}
              thickness={1.5}
            />
            {/* 진행률 바 */}
            <CircularProgress
              className="progress"
              variant="determinate"
              value={progressValue}
              thickness={1.5}
            />
            {/* 중앙의 시간 텍스트 */}
            <Box className="circular-timer__text-box">
              <Typography variant="h2" component="div" color="white">
                <div className="text-wrap">
                  <h6>휴식</h6>
                  <h1>{formatTime(leftRestTime)}</h1>
                </div>
              </Typography>
            </Box>
          </button>
        )}
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
}
