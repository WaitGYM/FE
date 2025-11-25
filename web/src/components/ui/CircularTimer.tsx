import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Circle, CircleCheck } from "lucide-react";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "../../features/workout/stores/workoutStore";

interface CircularTimerProps {
  thickness?: number;
}

const formatTime = (sec: number): string => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default function CircularTimer({ thickness = 1.5 }: CircularTimerProps) {
  const { isRestTimerMiniView, setIsRestTimerMiniView } = useUIStore();
  const {
    leftRestTime,
    workingOutInfo,
    workoutProgressInfo,
    autoDecreaseRest,
  } = useWorkoutStore();

  // 자동 타이머: 1초마다 감소
  useEffect(() => {
    if (leftRestTime === 0) return;

    const interval = setInterval(() => {
      autoDecreaseRest();
    }, 1000);

    return () => clearInterval(interval);
  }, [autoDecreaseRest, leftRestTime]);

  const progressValue =
    workoutProgressInfo.restSeconds > 0
      ? (leftRestTime / workoutProgressInfo.restSeconds) * 100
      : 0;

  return (
    <Box
      className={`circular-timer ${isRestTimerMiniView && "miniview"}`}
      onClick={(e) => {
        e.stopPropagation();
        isRestTimerMiniView && setIsRestTimerMiniView();
      }}
      //miniview일때 키보드 접근 가능하도록 수정
      role={isRestTimerMiniView ? "button" : undefined}
      tabIndex={isRestTimerMiniView ? 0 : undefined}
      onKeyDown={(e) => {
        if (isRestTimerMiniView && (e.key === "Enter" || e.key === " ")) {
          e.stopPropagation();
          setIsRestTimerMiniView();
        }
      }}
      aria-label={isRestTimerMiniView ? "타이머 원래 크기로 보기" : undefined}
    >
      {/* 배경 트랙 */}
      <CircularProgress
        className="track"
        variant="determinate"
        value={100}
        thickness={thickness} // props로 받은 thickness 사용
      />
      {/* 진행률 바 */}
      <CircularProgress
        className="progress"
        variant="determinate"
        value={progressValue}
        thickness={thickness} // props로 받은 thickness 사용
      />
      {/* 중앙의 시간 텍스트 */}
      <Box className="circular-timer__text-box">
        <Typography variant="h2" component="div" color="white">
          <div className="text-wrap">
            <h6>휴식{isRestTimerMiniView ? "" : " 타이머"}</h6>
            <h1>{formatTime(leftRestTime)}</h1>
            {!isRestTimerMiniView && (
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
        </Typography>
      </Box>
    </Box>
  );
}
