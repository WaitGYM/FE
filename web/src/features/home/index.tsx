import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import logo from "@img/logo.svg"; //이미지로고
import { Bell, Dumbbell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import { useRoutineStore } from "../routine/store/routineStore";
import type { RoutineType } from "../../types";
import { useUIStore } from "../../stores/UIStore";
import type { WorkoutModeType } from "../../types";
import Skeleton from "@mui/material/Skeleton";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { routineList, routineLoading, getRoutineList } = useRoutineStore();
  const { setWorkoutMode, setRoutineId, isWorkingOut } = useUIStore();

  useEffect(() => {
    getRoutineList();
  }, [getRoutineList]);

  function handleWorkoutMode(
    mode: WorkoutModeType,
    selectedRoutineId?: number
  ) {
    if (mode === "routine" && selectedRoutineId) {
      setRoutineId(selectedRoutineId);
    }
    setWorkoutMode(mode);
    navigate("/reservation/select-equipment");
  }

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--home"
          leftContent={
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          }
          rightContent={
            // 읽지않음표시는 옆에 .dot을 붙여주세요
            <button
              className="icon-bell dot"
              onClick={() => navigate("/home/pushlist")}
              aria-label="푸시알림 목록"
            >
              <Bell size={24} strokeWidth="1.5" />
            </button>
          }
        />

        <div className="greeting">
          {userInfo.name}님,
          <br />
          오늘도 루틴대로 운동해볼까요?
        </div>
        <div className="container">
          <section>
            {routineLoading ? (
              // 1. 로딩 중일 때 -> 스켈레톤 UI
              <ul className="routine-list" aria-hidden="true">
                {Array.from(new Array(2)).map((_, index) => (
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
            ) : !routineList || routineList.length < 1 ? (
              // 2. 데이터가 없을 때 -> "루틴 등록" UI
              <ul className="not-routine">
                <li>
                  <button
                    className="routine"
                    onClick={() => navigate("/add-routine/select-equipment")}
                  >
                    <div className="icon">
                      <Plus size={32} strokeWidth="1.5" />
                    </div>
                    <div className="info">
                      <p className="title">루틴을 등록해주세요</p>
                    </div>
                  </button>
                </li>
              </ul>
            ) : (
              // 3. 데이터가 있을 때 -> 실제 목록
              <ul className="routine-list">
                {routineList.map((routine: RoutineType) => (
                  <li key={routine.id}>
                    <button
                      className="routine"
                      onClick={() => handleWorkoutMode("routine", routine.id)}
                    >
                      <div className="icon">
                        <Dumbbell size={32} strokeWidth="1.5" />
                      </div>
                      <div className="info">
                        <p className="title">{routine.name}</p>
                        <div className="detail">
                          {routine.isActive && (
                            <div className="badge ing">운동중</div>
                          )}
                          <span>{routine.exerciseCount}개 운동</span>
                          {/* <span>예상시간 {routine.duration}분</span> */}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
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
            onClick={() => navigate("/add-routine/select-equipment")}
            className="btn btn-orange"
            id="routine-add"
          >
            루틴추가
          </button>
        </BottomButtonWrapper>
      )}

      <Footer />
    </motion.div>
  );
}
