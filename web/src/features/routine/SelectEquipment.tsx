import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEquipmentStore } from "../../stores/equipmentStore";
import Header from "../../components/layout/Header";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useRoutineStore } from "./store/routineStore";

export default function RoutineSelectEquipPage() {
  const navigate = useNavigate();
  const { equipmentList, getEquipments } = useEquipmentStore();
  const { selectedEquipList, setSelectedEquipList, resetState } =
    useRoutineStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  function handleBackBtn() {
    navigate("/");
    resetState;
  }

  function handleNextBtnClick() {
    console.log(selectedEquipList);
    navigate("/add-routine/routine-setting");
  }

  return (
    <motion.div
      className="equipmentList-page add-routine-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          leftContent={
            <button className="btn btn-icon" onClick={handleBackBtn}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<h2>루틴추가</h2>}
        />

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              <div className="total-select">
                <span>선택한 운동</span>
                <span>{selectedEquipList.length}개</span>
              </div>
            </div>

            <EquipmentList
              selectMode="MULTI"
              selectedList={selectedEquipList}
              handleSelectedEquipment={setSelectedEquipList}
            />
          </div>
        </section>
      </div>

      {selectedEquipList.length ? (
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            다음
          </button>
        </BottomButtonWrapper>
      ) : null}
    </motion.div>
  );
}
