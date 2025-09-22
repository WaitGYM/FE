import Footer from "../../components/layout/Footer";
import { Bell, Dumbbell, Plus } from "lucide-react";
import logo from "@img/logo.svg"; //이미지로고
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePlanStore } from "../../stores/planStore";
import type { PlanType } from "../../types";
import { useUIStore } from "../../stores/UIStore";
import type { WorkoutModeType } from "../../types";
import Skeleton from "@mui/material/Skeleton";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";

export default function HomePage() {
  const navigate = useNavigate();
  const { planList, planLoading, planError, getPlanList, clearError } =
    usePlanStore();
  const { setWorkoutMode, setPlanId, isWorkingOut } = useUIStore();

  useEffect(() => {
    getPlanList();
  }, [getPlanList]);

  function handleWorkoutMode(mode: WorkoutModeType, selectedPlanId?: number) {
    if (mode === "plan" && selectedPlanId) setPlanId(selectedPlanId);
    setWorkoutMode(mode);
    navigate("/reservation/select-equipment");
  }

  return (
    <div className="home-page">
      <div className="content-scroll">
        <Header
          className="header--home"
          leftContent={
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          }
          rightContent={
            <div className="icon-bell">
              <Bell size={24} strokeWidth="1.5" />
            </div>
          }
        />

        <div className="greeting">
          OO님,
          <br />
          오늘도 루틴대로 운동해볼까요?
        </div>
        <div className="container">
          <section>
            {planLoading ? (
              // 1. 로딩 중일 때 -> 스켈레톤 UI
              <ul className="routine-list">
                {Array.from(new Array(3)).map((_, index) => (
                  <li className="routine" key={index}>
                    <div className="icon">
                      <Skeleton
                        variant="rounded"
                        width={32}
                        height={32}
                        animation="wave"
                      />
                    </div>
                    <div className="info">
                      <Skeleton
                        variant="text"
                        width="70%"
                        style={{ marginBottom: "0.5" }}
                        animation="wave"
                      />
                      <Skeleton variant="text" width="90%" animation="wave" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : !planList || planList.length < 1 ? (
              // 2. 데이터가 없을 때 -> "루틴 등록" UI
              <ul className="not-routine">
                <li className="routine">
                  <div className="icon">
                    <Plus size={32} strokeWidth="1.5" />
                  </div>
                  <div className="info">
                    <p className="title">루틴을 등록해주세요</p>
                  </div>
                </li>
              </ul>
            ) : (
              // 3. 데이터가 있을 때 -> 실제 목록
              <ul className="routine-list">
                {planList.map((plan: PlanType) => (
                  <li
                    className="routine"
                    key={plan.id}
                    onClick={() => handleWorkoutMode("plan", plan.id)}
                  >
                    <div className="icon">
                      <Dumbbell size={32} strokeWidth="1.5" />
                    </div>
                    <div className="info">
                      <p className="title">{plan.name}</p>
                      <div className="detail">
                        <span>{plan.equipmentNum}개 운동</span>
                        <span>예상시간 {plan.duration}분</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {planError && (
              <div>
                {planError}
                <button onClick={clearError}>×</button>
              </div>
            )}
          </section>
        </div>
      </div>

      {!isWorkingOut && (
        <BottomButtonWrapper>
          <button
            onClick={() => handleWorkoutMode("direct")}
            className="btn btn-blue"
            id="no-routine"
          >
            바로운동
          </button>
          <button
            onClick={() => navigate("/add-plan")}
            className="btn btn-orange"
            id="routine-add"
          >
            루틴추가
          </button>
        </BottomButtonWrapper>
      )}

      <Footer />
    </div>
  );
}
