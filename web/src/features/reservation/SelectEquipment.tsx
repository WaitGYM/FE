import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import Switch from "@mui/material/Switch";
import { useEquipmentStore } from "../../stores/equipmentStore";
import { useUIStore } from "../../stores/UIStore";
import Header from "../../components/layout/Header";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/userStore";
import { useRoutineStore } from "../routine/store/routineStore";

export default function ReservationPage() {
  const navigate = useNavigate();
  const { getEquipments } = useEquipmentStore();
  const { userInfo } = useUserStore();
  const { workoutMode, routineId } = useUIStore();
  const { routineDetail, getRoutineDetail } = useRoutineStore();
  const {
    selectedEquipment,
    waitingInfo,
    setSelectedEquipment,
    deleteReservation,
  } = useReservationStore();
  const label = { inputProps: { "aria-label": "자동제안" } }; //자동제안 토글

  // 새로고침 아이콘회전
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      getEquipments();
      setIsRefreshing(false);
    }, 1000);
  };

  // useEffect(() => {
  //   getEquipments();
  // }, [getEquipments]);

  // useEffect(() => {
  //   if (workoutMode === "routine" && routineId) {
  //     getRoutineDetail(routineId);
  //   } else {
  //     getEquipments();
  //   }
  // }, [getEquipments, getRoutineDetail]);

  // function handleEquipmentToggle(selectEquip: EquipmentType) {
  //   setSelectedEquipment([selectEquip]);
  // }

  function handleNextBtnClick() {
    console.log(selectedEquipment);
    if (selectedEquipment?.status?.myQueueId) {
      // 대기 취소
      deleteReservation().then(() => getEquipments());
    } else {
      navigate("/reservation/goal-setting");
    }
  }

  return (
    <motion.div
      className="equipmentList-page reservation-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          leftContent={
            <button className="btn btn-icon" onClick={() => navigate("/")}>
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
            <button className="btn btn-icon" onClick={handleRefreshClick}>
              <RefreshCcw
                size={18}
                strokeWidth="2"
                className={isRefreshing ? "rotating" : ""}
              />
            </button>
          }
        />

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              <div className="auto-suggest">
                <span>자동제안</span>
                <Switch {...label} size="small" color="warning" />
              </div>
            </div>

            <EquipmentList
              selectMode="SINGLE"
              selectedList={Array(selectedEquipment)}
              handleSelectedEquipment={setSelectedEquipment}
            />
          </div>
        </section>
      </div>

      {/* 대기 건 기구를 선택하면 대기취소 버튼 */}
      {selectedEquipment.status?.myQueueId && (
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            대기 취소
          </button>
        </BottomButtonWrapper>
      )}

      {/* 내 대기 건이 없고 기구 이용중일땐 다음버튼(대기) */}
      {/* 내 대기 건이 없고 이용불가 선택시 다음버튼(대기) */}
      {/* 이용중인 기구가 없고 이용가능 기구일때 다음버튼(운동) */}
      {(!waitingInfo && workoutMode) ||
      (!waitingInfo && !selectedEquipment.status?.isAvailable) ||
      (!workoutMode && selectedEquipment.status?.isAvailable) ? (
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            다음
          </button>
        </BottomButtonWrapper>
      ) : null}

      {/* 대기중인 기구가 이용가능이 되면 운동시작으로 */}
      {waitingInfo && selectedEquipment.status?.isAvailable && (
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            운동 시작
          </button>
        </BottomButtonWrapper>
      )}
    </motion.div>
  );
}
