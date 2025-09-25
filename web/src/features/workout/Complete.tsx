import { Dumbbell, Timer } from "lucide-react";
import motionIcon from "@img/motion-clap.png"; //이미지
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";

export default function WorkoutCompletePage() {
  return (
    <motion.div
      className="container workout-complete-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="complete-title">
        <div className="icon-motion" id="clap">
          <img src={motionIcon} alt="박수" />
        </div>
        <h1>
          스텝밀을
          <br />
          멋지게 성공하셨군요!
        </h1>
        <p>24.12.02.월</p>
      </div>

      <ul className="complete-time">
        <li>
          <strong>
            <Dumbbell /> 총 운동시간
          </strong>
          <span id="exercise-time">20:34</span>
        </li>
        <li>
          <strong>
            <Timer /> 총 휴식시간
          </strong>
          <span>02:34</span>
        </li>
      </ul>

      <BottomButtonWrapper>
        <button className="btn btn-orange" id="ok">
          확인
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
