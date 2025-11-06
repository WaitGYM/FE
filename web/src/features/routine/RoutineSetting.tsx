import { motion } from "framer-motion";
import { ChevronLeft, Trash, Plus, Minus } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useRoutineStore } from "./store/routineStore";
import { useReservationStore } from "../reservation/stores/reservationStore";
import { useUIStore } from "../../stores/UIStore";

export default function RoutineSetting() {
  const navigate = useNavigate();
  const {
    selectedEquipList,
    newRoutineName,
    setNewRoutineName,
    setSelectedEquipList,
    updateSelectedEquipment,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    resetRoutineState,
  } = useRoutineStore();
  const { resetSelectedEquipmentState } = useReservationStore();
  const { routineId, resetWorkoutMode } = useUIStore();

  function formatSecondsToTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const paddedHrs = String(min).padStart(2, "0");
    const paddedMins = String(sec).padStart(2, "0");
    return `${paddedHrs}:${paddedMins}`;
  }

  function handleBackBtnClick() {
    // 수정모드에서 뒤로가기시 업데이트 유무 알럿 띄울건지?
    navigate(-1);
  }

  async function handleRoutineDelete() {
    await deleteRoutine();
    resetRoutineState();
    resetSelectedEquipmentState();
    resetWorkoutMode();
    navigate("/", { replace: true });
  }

  function handleNextBtnClick() {
    if (routineId) {
      // 수정모드
      // updateRoutine().then(() => navigate("/reservation/select-equipment", { replace: true }));
    } else {
      // 등록 모드
      createRoutine().then(() => navigate("/", { replace: true }));
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
          rightContent={
            routineId && (
              <button className="btn-side" onClick={handleRoutineDelete}>
                삭제
              </button>
            )
          }
        />
        <div className="container">
          <section>
            <label htmlFor="routine-name">
              <p className="label-title">루틴 이름</p>
            </label>
            <input
              type="text"
              id="routine-name"
              placeholder="루틴 이름을 입력해주세요"
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
            />
          </section>
          <section>
            <p className="label-title">운동 상세 설정</p>
            <ul className="box-wrap">
              {selectedEquipList.map((equip, idx) => (
                <li className="box" key={idx}>
                  <div className="equipment">
                    <div className="img">
                      <img src={equip?.imageUrl || "/equipment_01.png"} />
                    </div>
                    <div className="info">
                      <div className="title">
                        <span className="name">{equip?.name}</span>
                      </div>
                    </div>
                    {selectedEquipList.length > 1 && (
                      <button
                        className="btn-delete"
                        onClick={() => setSelectedEquipList(equip)}
                      >
                        <Trash size={16} strokeWidth="1.5" />
                        삭제
                      </button>
                    )}
                  </div>
                  <div className="count-wrap">
                    <div className="count set">
                      <span className="title">세트</span>
                      <div className="controller-wrap">
                        <button
                          className="btn btn-icon"
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "sets", -1)
                          }
                          disabled={equip.sets < 2}
                        >
                          <Minus size={20} strokeWidth="1.5" />
                        </button>
                        <span className="count-num">{equip.sets}</span>
                        <button
                          className="btn btn-icon"
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "sets", 1)
                          }
                          disabled={equip.sets > 7}
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
                            equip.restSeconds < 1 ||
                            (equip.sets > 1 && equip.restSeconds < 11)
                          }
                          onClick={() =>
                            updateSelectedEquipment(
                              equip.id,
                              "restSeconds",
                              -10
                            )
                          }
                        >
                          <Minus size={20} strokeWidth="1.5" />
                        </button>
                        <span className="count-num">
                          {equip.restSeconds === 0
                            ? "없음"
                            : formatSecondsToTime(equip.restSeconds)}
                        </span>
                        <button
                          className="btn btn-icon"
                          disabled={equip.sets < 2 || equip.restSeconds > 299}
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "restSeconds", 10)
                          }
                        >
                          <Plus size={20} strokeWidth="1.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <BottomButtonWrapper>
        <button className="btn btn-orange" onClick={handleNextBtnClick}>
          {routineId ? "루틴 수정" : "루틴 등록"}
        </button>
      </BottomButtonWrapper>
    </motion.div>
  );
}
