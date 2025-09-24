import { useEffect, useState } from "react";
import { Star, Equal } from "lucide-react";
import { useEquipmentStore } from "../stores/equipmentStore";
import type { EquipmentType } from "../types";
import Equipment from "../components/layout/Equipment";
import { useUIStore } from "../stores/UIStore";
import { usePlanStore } from "../stores/planStore";

export default function EquipmentListPage({
  selectedEquipment,
}: {
  selectedEquipment: (equipmentInfo: EquipmentType) => void;
}) {
  const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { equipmentList, getEquipments } = useEquipmentStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    setSelectedList([selectEquip]);
    selectedEquipment(selectEquip);
    // if (workoutMode === "addPlan") {
    //   setSelectedList((prevSelected) =>
    //     prevSelected.includes(selectEquip)
    //       ? prevSelected.filter((v) => v !== selectEquip)
    //       : [...prevSelected, selectEquip]
    //   );
    // } else {
    //   setSelectedList([selectEquip]);
    // }
  }

  return (
    <ul className="equipment-list">
      {equipmentList.map((equipment: EquipmentType) => (
        <li
          key={equipment.id}
          onClick={() => handleEquipmentToggle(equipment)}
          className={selectedList.includes(equipment) ? "selected" : ""}
        >
          <div className="equipment">
            <div className="icon-drag">
              <Equal size={18} strokeWidth="1.5" />
            </div>
            <img src={equipment.imageUrl || "/equipment_01.png"} />
            <div className="info">
              <div className="title">
                <span className="name">{equipment.name}</span>
                <div className="favorite">
                  <Star size={18} strokeWidth="1.5" className="on" />
                  {/* 즐겨찾기해제는 .on를 빼주세요 */}
                </div>
              </div>
              {equipment.reservationCount ? (
                <div className="status waiting">
                  {/* <span className="badge waiting">대기중</span>
                <span className="badge complete">운동완</span> */}
                  <span>대기 {equipment.waitingTime}분</span>
                  <span className="dot"></span>
                  <span>{equipment.reservationCount}명</span>
                </div>
              ) : (
                <div className="status">
                  <span>이용가능</span>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
