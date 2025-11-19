import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import Switch from "@mui/material/Switch";
import { useEquipmentStore } from "../../stores/equipmentStore";
import { useUIStore } from "../../stores/UIStore";
import Header from "../../components/layout/Header";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { useRoutineStore } from "../routine/store/routineStore";
import { useWorkoutStore } from "../workout/stores/workoutStore";

import motionIconSrc from "@img/motion-party.png";

export default function ReservationPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const {
    equipmentList,
    getEquipments,
    isRoutineCompelte,
    setIsRoutineCompelte,
    resetEquipmentState,
  } = useEquipmentStore();
  const {
    isEquipAutoSorting,
    workoutMode,
    isWorkingOut,
    routineId,
    setIsEquipAutoSorting,
    resetWorkoutMode,
  } = useUIStore();
  const { workingOutInfo, startWorkout, startRoutineWorkout } =
    useWorkoutStore();
  const {
    selectedEquipment,
    waitingInfo,
    setSelectedEquipment,
    deleteReservation,
    resetSelectedEquipmentState,
  } = useReservationStore();
  const {
    routineDetail,
    setSelectedEquipList,
    setRoutineName,
    resetRoutineState,
  } = useRoutineStore();

  // 새로고침 아이콘회전
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      getEquipments(filter);
      setIsRefreshing(false);
    }, 500);
  };

  // 페이지 진입시 루틴 완료 체크해서 콩그레츄
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (!equipmentList || !equipmentList.length) return;
    if (isRoutineCompelte) {
      setModalOpen(true);

      const timer = setTimeout(() => {
        setModalOpen(false);
        setIsRoutineCompelte(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isRoutineCompelte]);

  function handleBackBtnClick() {
    resetSelectedEquipmentState();
    resetWorkoutMode();
    if (routineDetail) resetRoutineState();
    navigate("/", { replace: true });
    resetEquipmentState();
  }

  function handleRotineUpdateBtnClick() {
    if (!routineDetail) return;
    setRoutineName(routineDetail.name);
    setSelectedEquipList(equipmentList);
    navigate("/add-routine/routine-setting");
  }

  function handleDeleteReservation() {
    deleteReservation().then(() => getEquipments(filter));
  }

  function handleNextBtn() {
    console.log("다음스텝", selectedEquipment);
    if (routineDetail) {
      // 운동중이 아니고 대기 없으면 운동 시작으로
      if (!isWorkingOut && selectedEquipment.status?.isAvailable) {
        console.log("루틴 운동 시작!");
        const workoutGoal = {
          totalSets: selectedEquipment.sets,
          restSeconds: selectedEquipment.restSeconds,
        };
        startRoutineWorkout(
          routineDetail.id,
          selectedEquipment.id,
          workoutGoal
        );
        navigate("/workout/exercising", { replace: true });
      } else {
        console.log("루틴 기구 대기!!");
        navigate("/reservation/wait-request");
      }
    } else {
      navigate("/reservation/goal-setting");
    }
  }

  function handleStartWorkout() {
    console.log("운동시작으로 GO!!", selectedEquipment, waitingInfo);
    const workoutGoal = {
      totalSets: waitingInfo?.sets,
      restSeconds: waitingInfo?.restSeconds,
    };
    startWorkout(selectedEquipment?.id, workoutGoal);
    navigate("/workout/exercising");
  }

  return (
    <>
      <motion.div
        className="equipmentList-page reservation-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
      >
        <div className="content-scroll">
          <Header
            className="header--equipment-detail"
            leftContent={
              <button className="btn btn-icon" onClick={handleBackBtnClick}>
                <ChevronLeft size={24} strokeWidth="2" />
              </button>
            }
            title={
              <h2>
                {routineId && workoutMode === "routine"
                  ? routineDetail?.name
                  : "바로운동"}
              </h2>
            }
            rightContent={
              routineId && (
                <button
                  type="button"
                  className="btn-delete"
                  onClick={handleRotineUpdateBtnClick}
                >
                  수정
                </button>
              )
            }
          />

          <section className="container">
            <div className="equipment-wrap">
              <div className="top">
                <div className="auto-suggest">
                  <span>자동제안</span>
                  <Switch
                    checked={isEquipAutoSorting}
                    size="small"
                    color="warning"
                    slotProps={{ input: { "aria-label": "자동제안" } }}
                    onChange={(e) => setIsEquipAutoSorting(e.target.checked)}
                  />
                </div>
                <button className="btn-refresh" onClick={handleRefreshClick}>
                  <RefreshCcw
                    size={18}
                    strokeWidth="2"
                    className={isRefreshing ? "rotating" : ""}
                  />
                  <span>새로고침</span>
                </button>
              </div>

              <EquipmentList
                filter={filter}
                selectMode="SINGLE"
                selectedList={Array(selectedEquipment)}
                handleSelectedEquipment={setSelectedEquipment}
              />
            </div>
          </section>
        </div>

        {/* 대기 건 기구를 선택하면 대기취소 버튼 */}
        {selectedEquipment?.status?.myQueueId && (
          <BottomButtonWrapper>
            <button
              onClick={handleDeleteReservation}
              className="btn btn-orange"
            >
              대기 취소
            </button>
          </BottomButtonWrapper>
        )}

        {/* 내 대기건이 없고 내가 이용중이 아닌 이용불가 기구 선택시 다음버튼(대기) */}
        {/* 운동중이 아니고 이용가능 기구일때 다음버튼(운동) */}
        {selectedEquipment?.id &&
        ((!waitingInfo &&
          workingOutInfo.equipmentId !== selectedEquipment?.id &&
          !selectedEquipment.status.isAvailable) ||
          (!isWorkingOut && selectedEquipment?.status.isAvailable)) ? (
          <BottomButtonWrapper>
            <button onClick={handleNextBtn} className="btn btn-orange">
              다음
            </button>
          </BottomButtonWrapper>
        ) : null}

        {/* 대기중인 기구가 이용가능이 되면 운동시작으로 */}
        {selectedEquipment?.status?.isAvailable &&
        selectedEquipment?.status?.myQueuePosition === 1 &&
        selectedEquipment?.status?.myQueueStatus === "NOTIFIED" ? (
          <BottomButtonWrapper>
            <button onClick={handleStartWorkout} className="btn btn-orange">
              운동 시작
            </button>
          </BottomButtonWrapper>
        ) : null}
      </motion.div>

      {modalOpen && (
        <div
          className="backdrop"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "99",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "220px",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <img src={motionIconSrc} alt="폭죽" style={{ width: "140px" }} />
            <p style={{ fontWeight: "bolder", marginTop: "10px" }}>
              루틴 완료 추카추!!!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
