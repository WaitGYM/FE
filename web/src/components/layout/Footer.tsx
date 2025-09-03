import { Dumbbell, Trophy, CircleUserRound } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="on">
        <Dumbbell size={24} strokeWidth="1.5" />
        <p>홈</p>
      </div>
      <div>
        <Trophy size={24} strokeWidth="1.5" />
        <p>미션</p>
      </div>
      <div>
        <CircleUserRound size={24} strokeWidth="1.5" />
        <p>내정보</p>
      </div>
    </footer>
  );
}
