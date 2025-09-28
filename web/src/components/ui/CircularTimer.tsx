import { useRef, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Circle, CircleCheck } from "lucide-react";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "../../features/workout/stores/workoutStore";

interface CircularTimerProps {
  thickness?: number;
}

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default function CircularTimer({ thickness = 1.5 }: CircularTimerProps) {
  const { isWorkingOut, isRestTimerMiniView, toggleRestTimerMiniView } =
    useUIStore();
  const { workingOutInfo } = useWorkoutStore();

  // let restSeconds: number = workingOutInfo?.restSeconds || 0;

  const restTime = useWorkoutStore((state) => state.restTime);
  const adjustRest = useWorkoutStore((state) => state.adjustRest);
  const initialTimeRef = useRef(restTime);

  // 자동 타이머: 1초마다 감소
  useEffect(() => {
    if (restTime === 0) return;

    const interval = setInterval(() => {
      adjustRest(-1);
    }, 1000);

    return () => clearInterval(interval);
  }, [restTime]);

  // 남은 시간을 0-100 사이의 진행률 값으로 변환
  const progressValue = (restTime / initialTimeRef.current) * 100;

  return (
    <Box
      className={`circular-timer ${isRestTimerMiniView && "miniview"}`}
      onClick={(e) => {
        e.stopPropagation();
        isRestTimerMiniView && toggleRestTimerMiniView();
      }}
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
            <h1>{formatTime(restTime)}</h1>
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
