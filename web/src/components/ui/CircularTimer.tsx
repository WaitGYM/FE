import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// 총 휴식 시간을 초 단위로 설정 (props로 받으면 재사용성 높아짐)
const TOTAL_DURATION = 30;

interface CircularTimerProps {
  thickness?: number;
  title?: string;
}

export default function CircularTimer({
  thickness = 1.5,
  title = "휴식",
}: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(TOTAL_DURATION);

  React.useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 남은 시간을 0-100 사이의 진행률 값으로 변환
  const progressValue = (timeLeft / TOTAL_DURATION) * 100;

  return (
    <Box className="circular-timer">
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
            <h6>{title}</h6>
            <h1>00:{String(timeLeft).padStart(2, "0")}</h1>
          </div>
        </Typography>
      </Box>
    </Box>
  );
}
