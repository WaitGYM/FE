import { useEffect, useState } from "react";
import { Star, Equal } from "lucide-react";
import { useEquipmentStore } from "../stores/equipmentStore";
import type { EquipmentType } from "../types";
import { useFavoriteStore } from "../stores/favoriteStore";
import Equipment from "../components/layout/Equipment";
import { useUIStore } from "../stores/UIStore";
import { useUserStore } from "../stores/userStore";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { li } from "framer-motion/client";

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
  const { isRestTimerModalOpen, isRestTimerMiniView } = useUIStore();
  // const { routineDetail, getRoutineDetail } = useRoutineStore();
  // let getList;
  // useEffect(() => {
  //   getEquipments();
  // }, [getEquipments]);

  // 1분마다 자동 새로고침
  useEffect(() => {
    if (!isRestTimerModalOpen || isRestTimerMiniView) {
      const interval = setInterval(() => getEquipments(), 60000);
      return () => clearInterval(interval);
    }
  }, [isRestTimerModalOpen, isRestTimerMiniView]);

  useEffect(() => {
    // if (workoutMode === "routine" && routineId) {
    //   getRoutineDetail(routineId);
    // } else {
    getEquipments();
    // }
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
        <li key={equipment.id}>
          <div
            onClick={() => handleEquipmentToggle(equipment)}
            className={`equipment ${
              !(
                selectedList.length &&
                selectedList.some((x) => x.id === equipment.id)
              )
                ? ""
                : "selected"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleEquipmentToggle(equipment);
              }
            }}
            aria-label={equipment.name}
          >
            {/* <div className="icon-drag">
              <Equal size={18} strokeWidth="1.5" />
            </div> */}
            <img
              src={equipment.imageUrl || "/thumb-default.jpg"}
              alt={equipment.name}
            />
            <div className="info">
              <div className="title">
                <span className="name">{equipment.name}</span>
                <button
                  className="favorite"
                  onClick={(e) => handleToggleFavorite(e, equipment)}
                  aria-label="즐겨찾기"
                  aria-pressed={equipment.isFavorite}
                  type="button"
                >
                  <Star
                    size={18}
                    strokeWidth="1.5"
                    className={equipment.isFavorite ? "on" : "off"}
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
                {equipment.status.myQueuePosition &&
                  equipment.status.myQueueStatus === "WAITING" && (
                    <span className="badge waiting">대기중</span>
                  )}
                {equipment.status.completedToday && (
                  <span className="badge complete">운동완</span>
                )}
                {equipment.status.myQueueStatus === "NOTIFIED" &&
                  equipment.status.myQueuePosition === 1 && (
                    <span className="badge myturn">내차례</span>
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
