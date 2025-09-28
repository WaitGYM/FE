import { useEffect, useState } from "react";
import { Star, Equal } from "lucide-react";
import { useEquipmentStore } from "../stores/equipmentStore";
import type { EquipmentType } from "../types";
import { useFavoriteStore } from "../stores/favoriteStore";
import Equipment from "../components/layout/Equipment";
import { useUIStore } from "../stores/UIStore";
import { usePlanStore } from "../stores/planStore";
import { useUserStore } from "../stores/userStore";

export default function EquipmentListPage({
  selectMode = "SINGLE",
  selectedList,
  handleSelectedEquipment,
}: {
  selectMode?: "SINGLE" | "MULTI";
  selectedList: EquipmentType[];
  handleSelectedEquipment: (
    equipmentInfo: EquipmentType | EquipmentType[]
  ) => void;
}) {
  // const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { equipmentList, getEquipments } = useEquipmentStore();
  const { addFavorite, deleteFavorite } = useFavoriteStore();
  const { userInfo } = useUserStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    // setSelectedList([selectEquip]);
    // if (selectMode === "MULTI") {
    //   setSelectedList((prevSelected) =>
    //     prevSelected.includes(selectEquip)
    //       ? prevSelected.filter((v) => v !== selectEquip)
    //       : [...prevSelected, selectEquip]
    //   );
    // } else {
    //   setSelectedList([selectEquip]);
    // }
    handleSelectedEquipment(selectEquip);
  }

  async function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>,
    equipment: EquipmentType
  ) {
    e.stopPropagation();
    if (equipment.isFavorite) await deleteFavorite(equipment.id);
    else await addFavorite(equipment.id);
    getEquipments();
  }

  return (
    <ul className="equipment-list">
      {equipmentList.map((equipment: EquipmentType) => (
        <li
          key={equipment.id}
          onClick={() => handleEquipmentToggle(equipment)}
          className={
            selectedList.some((x) => x.id === equipment.id) ? "selected" : ""
          }
        >
          <div className="equipment">
            {/* <div className="icon-drag">
              <Equal size={18} strokeWidth="1.5" />
            </div> */}
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
                  !equipment.status.isAvailable &&
                  equipment.status.currentUser !== userInfo.name
                    ? "waiting"
                    : ""
                }`}
              >
                {equipment.status.myQueueStatus === "WAITING" && (
                  <span className="badge waiting">대기중</span>
                )}
                {equipment.status.completedToday && (
                  <span className="badge complete">운동완</span>
                )}
                {equipment.status.currentUser === userInfo.name ? (
                  <span>이용중</span>
                ) : equipment.status.isAvailable ? (
                  <span>이용가능</span>
                ) : (
                  <>
                    <span>
                      대기&nbsp;
                      {equipment.status.myQueueStatus === "WAITING"
                        ? equipment.status.currentUserETA
                        : equipment.status.estimatedWaitMinutes}
                      분
                    </span>
                    <span className="dot"></span>
                    <span>
                      {equipment.status.myQueueStatus === "WAITING"
                        ? equipment.status.myQueuePosition
                        : equipment.status.waitingCount}
                      명
                    </span>
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
