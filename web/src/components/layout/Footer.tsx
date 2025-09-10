import { Dumbbell, Trophy, CircleUserRound } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="nav on">
        <Dumbbell size={24} strokeWidth="1.5" />
        <p>홈</p>
      </div>
      <div className="nav">
        <Trophy size={24} strokeWidth="1.5" />
        <p>미션</p>
      </div>
      <div className="nav">
        <CircleUserRound size={24} strokeWidth="1.5" />
        <p>내정보</p>
      </div>
    </footer>
  );
}
