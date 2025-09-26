import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Switch from "@mui/material/Switch";
import { useEquipmentStore } from "../../stores/equipmentStore";
import type { EquipmentType } from "./types";
import Equipment from "../../components/layout/Equipment";
import { useUIStore } from "../../stores/UIStore";
// import { usePlanStore } from "../../stores/planStore";
import Header from "../../components/layout/Header";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { motion } from "framer-motion";

export default function ReservationPage() {
  const navigate = useNavigate();
  // const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { equipmentList, loading, error, getEquipments, clearError } =
    useEquipmentStore();
  const { workoutMode, planId } = useUIStore();
  // const { planDetail, planLoading, getPlanDetail } = usePlanStore();
  const { selectedEquipment, setSelectedEquipment, deleteReservation } =
    useReservationStore();
  const label = { inputProps: { "aria-label": "자동제안" } }; //자동제안 토글

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  // useEffect(() => {
  //   if (workoutMode === "plan" && planId) {
  //     getPlanDetail(planId);
  //   }
  // }, [getPlanDetail]);

  // function handleEquipmentToggle(selectEquip: EquipmentType) {
  //   setSelectedEquipment([selectEquip]);
  // }

  function handleNextBtnClick() {
    console.log(selectedEquipment);
    if (selectedEquipment?.status?.myQueueStatus === "WAITING") {
      // 대기 취소
      deleteReservation();
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
          title={<h2>바로운동</h2>}
        />

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              <div className="auto-suggest">
                <span>자동제안</span>
                <Switch
                  {...label}
                  defaultChecked
                  size="small"
                  color="warning"
                />
              </div>
            </div>

            <EquipmentList selectedEquipment={setSelectedEquipment} />
          </div>
        </section>
      </div>

      {selectedEquipment ? (
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            {selectedEquipment?.status?.myQueueStatus === "WAITING"
              ? "대기취소"
              : "다음"}
          </button>
        </BottomButtonWrapper>
      ) : null}
    </motion.div>
  );
}
