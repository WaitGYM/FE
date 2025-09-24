import { useEffect, useState } from "react";
import { Star, Equal } from "lucide-react";
import { useEquipmentStore } from "../stores/equipmentStore";
import type { EquipmentType } from "../types";
import { useFavoriteStore } from "../stores/favoriteStore";
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
  const { addFavorite, deleteFavorite } = useFavoriteStore();

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

  function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>,
    equipment: EquipmentType
  ) {
    e.stopPropagation();
    if (equipment.isFavorite) deleteFavorite(equipment.id);
    else addFavorite(equipment.id);
    // getEquipments();
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
                <button
                  className="favorite"
                  onClick={(e) => handleToggleFavorite(e, equipment)}
                >
                  <Star
                    size={18}
                    strokeWidth="1.5"
                    className={equipment.isFavorite ? "on" : ""}
                  />
                </button>
              </div>
              <div
                className={`status ${
                  !equipment.status.isAvailable && "waiting"
                }`}
              >
                {equipment.status.myQueueStatus === "WAITING" && (
                  <span className="badge waiting">대기중</span>
                )}
                {equipment.status.myQueueStatus === "COMPLETE" && (
                  <span className="badge complete">운동완</span>
                )}
                {equipment.status.isAvailable ? (
                  <span>이용가능</span>
                ) : (
                  <>
                    <span>대기 {equipment.waitingTime}분</span>
                    <span className="dot"></span>
                    <span>{equipment.status.waitingCount}명</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
