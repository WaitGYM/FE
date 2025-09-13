import PushMsg from "../../components/ui/PushMsg";
import { CircleCheck, Circle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function WorkoutExercising() {
  // const navigate = useNavigate();

  // const handleComplete = () => {
  //   navigate("/workout/complete");
  // };

  return (
    <div className="workout-page" id="exercising">
      <header className="header header--exercising">
        <div className="header-top">
          <div className="btn-side">
            <span>운동종료</span>
          </div>
        </div>
      </header>

      <section className="container">
        <PushMsg />

        <div className="text-wrap">
          <h6>스텝밀</h6>
          <h1>01:20</h1>
          <p>
            <CircleCheck size={18} strokeWidth="2" className="on" />
            <Circle size={18} strokeWidth="2" />
            <Circle size={18} strokeWidth="2" />
          </p>
        </div>
      </section>

      <div className="btn-wrap">
        <button className="btn btn-blue">세트 완료</button>
      </div>
    </div>
  );
}
