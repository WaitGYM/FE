import { motion } from "framer-motion";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useReservationStore } from "./stores/reservationStore";
import { useUIStore } from "../../stores/UIStore";
import { useWorkoutStore } from "../workout/stores/workoutStore";
import { useRoutineStore } from "../routine/store/routineStore";

export default function EquipmentDetail() {
  const navigate = useNavigate();
  const {
    selectedEquipment,
    updateSelectedEquipment,
    getEquipmentReservationStatus,
    resetSelectedEquipmentState,
    resetState,
  } = useReservationStore();
  const { startWorkout, startRoutineWorkout } = useWorkoutStore();
  const { isWorkingOut, setWorkingOut, resetWorkoutMode } = useUIStore();
  const { routineDetail, deleteRoutine, resetRoutineState } = useRoutineStore();

  function handleBackBtnClick() {
    navigate(-1);
    resetState();
  }

  // async function handleRoutineDelete() {
  //   await deleteRoutine();
  //   resetState();
  //   resetSelectedEquipmentState();
  //   resetWorkoutMode();
  //   resetRoutineState();
  //   navigate("/", { replace: true });
  // }

  function formatSecondsToTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const paddedHrs = String(min).padStart(2, "0");
    const paddedMins = String(sec).padStart(2, "0");
    return `${paddedHrs}:${paddedMins}`;
  }

  async function handleNextBtnClick() {
    // console.log("handleNextBtnClick selectedEquipment: ", electedEquipment);
    // 대기 현황 없는지 한번 더 확인 필요??
    await getEquipmentReservationStatus();

    // 운동중이 아니고 대기 없으면 운동 시작으로
    if (!isWorkingOut && selectedEquipment.status?.isAvailable) {
      const workoutGoal = {
        totalSets: selectedEquipment.sets,
        restSeconds: selectedEquipment.restSeconds,
      };
      if (routineDetail) {
        startRoutineWorkout(
          routineDetail.id,
          selectedEquipment.routineExId,
          workoutGoal
        );
      } else {
        startWorkout(selectedEquipment.id, workoutGoal);
      }
      setWorkingOut(true);
      navigate("/workout/exercising", { replace: true });
    } else {
      // 대기 있으면 예약으로
      navigate("/reservation/wait-request");
    }
  }

  return (
    <motion.div
      className="equipmentDetail-page goal-setter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--equipment-detail"
          title={<h2>세트설정</h2>}
          leftContent={
            <button className="btn btn-icon" onClick={handleBackBtnClick}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          // rightContent={
          //   <button className="btn-side" onClick={handleRoutineDelete}>
          //     삭제
          //   </button>
          // }
        />
        <div className="container">
          {routineDetail && (
            <section>
              <label htmlFor="routine-name">
                <p className="label-title">루틴 이름</p>
              </label>
              <input
                type="text"
                id="routine-name"
                value={routineDetail.name}
                readOnly
              />
            </section>
          )}
          <section>
            <p className="label-title">운동 상세 설정</p>
            <ul className="box-wrap">
              <li className="box">
                <div className="equipment">
                  <div className="img">
                    <img
                      src={selectedEquipment?.imageUrl || "/equipment_01.png"}
                    />
                  </div>
                  <div className="info">
                    <div className="title">
                      <span className="name">{selectedEquipment?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="count-wrap">
                  <div className="count set">
                    <span className="title">세트</span>
                    <div className="controller-wrap">
                      <button
                        className="btn btn-icon"
                        onClick={() => updateSelectedEquipment("sets", -1)}
                        disabled={selectedEquipment.sets < 2}
                      >
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">
                        {selectedEquipment.sets}
                      </span>
                      <button
                        className="btn btn-icon"
                        onClick={() => updateSelectedEquipment("sets", 1)}
                        disabled={selectedEquipment.sets > 7}
                      >
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                  <div className="count break">
                    <span className="title">휴식</span>
                    <div className="controller-wrap">
                      <button
                        className="btn btn-icon"
                        disabled={
                          selectedEquipment.restSeconds < 1 ||
                          (selectedEquipment.sets > 1 &&
                            selectedEquipment.restSeconds < 11)
                        }
                        onClick={() =>
                          updateSelectedEquipment("restSeconds", -10)
                        }
                      >
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">
                        {selectedEquipment.restSeconds === 0
                          ? "없음"
                          : formatSecondsToTime(selectedEquipment.restSeconds)}
                      </span>
                      <button
                        className="btn btn-icon"
                        disabled={
                          selectedEquipment.sets < 2 ||
                          selectedEquipment.restSeconds > 299
                        }
                        onClick={() =>
                          updateSelectedEquipment("restSeconds", 10)
                        }
                      >
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
      {selectedEquipment?.sets ? (
        <BottomButtonWrapper>
          <button className="btn btn-orange" onClick={handleNextBtnClick}>
            {!isWorkingOut && selectedEquipment.status?.isAvailable
              ? "이용하기"
              : "예약하기"}
          </button>
        </BottomButtonWrapper>
      ) : null}
    </motion.div>
  );
}
