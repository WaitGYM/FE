import { Dumbbell, Trophy, CircleUserRound } from "lucide-react";
import { NavLink } from "react-router-dom"; // Link 대신 NavLink를 import

export default function Footer() {
  return (
    <footer>
      <nav>
        <NavLink to="/" className="nav">
          <Dumbbell size={24} strokeWidth="1.5" />
          <p>홈</p>
        </NavLink>
        <NavLink to="/mission" className="nav">
          <Trophy size={24} strokeWidth="1.5" />
          <p>미션/랭킹</p>
        </NavLink>
        <NavLink to="/mypage" className="nav">
          <CircleUserRound size={24} strokeWidth="1.5" />
          <p>내정보</p>
        </NavLink>
      </nav>
    </footer>
  );
}
