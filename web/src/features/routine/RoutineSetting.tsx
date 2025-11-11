import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Plus,
  Minus,
  CirclePlus,
  GripVertical,
  CircleCheck,
} from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useRoutineStore } from "./store/routineStore";
import { useReservationStore } from "../reservation/stores/reservationStore";
import { useUIStore } from "../../stores/UIStore";
import CustomDialog from "../../components/ui/CustomDialog"; //수정,삭제 모달

function formatSecondsToTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const paddedHrs = String(min).padStart(2, "0");
  const paddedMins = String(sec).padStart(2, "0");
  return `${paddedHrs}:${paddedMins}`;
}

export default function RoutineSetting() {
  const [isOpenBackConfirmDialog, setIsOpenBackConfirmDialog] = useState(false);
  const [isOpenRoutineDeleteDialog, setIsOpenRoutineDeleteDialog] =
    useState(false);
  const [isOpenEquipDeleteDialog, setIsOpenEquipDeleteDialog] = useState(false);
  const [isOpenRoutineUpdateDialog, setIsOpenRoutineUpdateDialog] =
    useState(false);

  const navigate = useNavigate();
  const {
    selectedEquipList,
    newRoutineName,
    routineDetail,
    setRoutineName,
    setSelectedEquipList,
    updateSelectedEquipment,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    resetRoutineState,
  } = useRoutineStore();
  const { resetSelectedEquipmentState } = useReservationStore();
  const { routineId, resetWorkoutMode } = useUIStore();

  function handleNavigatingBack() {
    navigate(-1);
  }

  async function handleDeleteRoutine() {
    await deleteRoutine();
    resetRoutineState();
    resetSelectedEquipmentState();
    resetWorkoutMode();
    navigate("/", { replace: true });
  }

  function handleAddEquip() {
    navigate("/add-routine/select-equipment");
  }

  function handleEquipDelete() {}

  async function handleUpdateRoutine() {
    // await updateRoutine();
    // navigate("/reservation/select-equipment", { replace: true });
  }

  async function handleCreateRoutine() {
    await createRoutine();
    navigate("/", { replace: true });
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
          title={<h2>{routineId ? "루틴 설정" : "세트설정"}</h2>}
          leftContent={
            <button
              className="btn btn-icon"
              onClick={() =>
                routineId ? setIsOpenBackConfirmDialog(true) : navigate(-1)
              }
            >
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          rightContent={
            routineId && (
              <button
                className="btn-delete"
                onClick={() => setIsOpenRoutineDeleteDialog(true)}
              >
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
              value={
                routineId && routineDetail ? routineDetail.name : newRoutineName
              }
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </section>

          <section>
            <p className="label-title">운동 설정</p>

            {routineId && (
              <button
                type="button"
                className="btn-add"
                onClick={handleAddEquip}
              >
                <CirclePlus size={20} strokeWidth="2" />
                운동추가
              </button>
            )}

            <ul className="box-wrap">
              {selectedEquipList.map((equip, idx) => (
                <li className="box" key={idx}>
                  <div className="equipment">
                    <div className="info">
                      {routineId && (
                        <>
                          <input type="checkbox" id={`select-${equip?.name}`} />
                          <label htmlFor={`select-${equip?.name}`}>
                            <CircleCheck size={20} strokeWidth="2" />
                          </label>
                        </>
                      )}
                      <div className="img">
                        <img src={equip?.imageUrl || "/equipment_01.png"} />
                      </div>
                      <div className="title">
                        <span className="name">{equip?.name}</span>
                      </div>
                    </div>

                    {routineId ? (
                      <button type="button" className="btn-drag-drop">
                        <GripVertical size={20} strokeWidth="2" />
                      </button>
                    ) : selectedEquipList.length > 1 ? (
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => setSelectedEquipList(equip)}
                      >
                        삭제
                      </button>
                    ) : (
                      ""
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
        {routineId && (
          <button
            className="btn btn-blue"
            onClick={() => setIsOpenEquipDeleteDialog(true)}
          >
            운동 삭제
          </button>
        )}
        <button
          className="btn btn-orange"
          onClick={() =>
            routineId
              ? setIsOpenRoutineUpdateDialog(true)
              : handleCreateRoutine()
          }
        >
          {/* 비활성화일때 .disabled를 붙여주세요 */}
          {/* <button className="btn btn-blue disabled">운동 삭제</button> */}
          {/* <button className="btn btn-orange disabled" onClick={handleCreateRoutine}> */}
          {routineId ? "루틴 수정" : "루틴 등록"}
        </button>
      </BottomButtonWrapper>

      <CustomDialog
        open={isOpenBackConfirmDialog}
        onClose={() => setIsOpenBackConfirmDialog(false)}
        onConfirm={handleNavigatingBack}
      >
        <h6 className="title">
          변경사항을 <strong className="text-orange">저장</strong>하지 않고
          <br />
          페이지를 나가시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenRoutineDeleteDialog}
        onClose={() => setIsOpenRoutineDeleteDialog(false)}
        onConfirm={handleDeleteRoutine}
      >
        <h6 className="title">
          이 루틴을
          <br />
          <strong className="text-orange">삭제</strong>하시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenEquipDeleteDialog}
        onClose={() => setIsOpenEquipDeleteDialog(false)}
        onConfirm={handleEquipDelete}
      >
        <h6 className="title">
          정말 운동을
          <br />
          <strong className="text-orange">삭제</strong> 하시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenRoutineUpdateDialog}
        onClose={() => setIsOpenRoutineUpdateDialog(false)}
        onConfirm={handleUpdateRoutine}
      >
        <h6 className="title">
          이 루틴을
          <br />
          <strong className="text-orange">수정</strong>하시겠어요?
        </h6>
      </CustomDialog>
    </motion.div>
  );
}
