import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Skeleton } from "@mui/material";
import { useEquipmentStore } from "../stores/equipmentStore";
import type { EquipmentType } from "../types";
import { useFavoriteStore } from "../stores/favoriteStore";
import { useUIStore } from "../stores/UIStore";
import { useUserStore } from "../stores/userStore";

export default function EquipmentListPage({
  filter = "all",
  selectMode = "SINGLE",
  selectedList,
  handleSelectedEquipment,
}: {
  filter?: string;
  selectMode?: "SINGLE" | "MULTI";
  selectedList: EquipmentType[];
  handleSelectedEquipment: (
    equipmentInfo: EquipmentType | EquipmentType[]
  ) => void;
}) {
  const { equipmentList, equipmentListLoading, getEquipments } =
    useEquipmentStore();
  const { addFavorite, deleteFavorite } = useFavoriteStore();
  const { userInfo } = useUserStore();
  const { isRestTimerModalOpen, isRestTimerMiniView } = useUIStore();
  const isEquipAutoSorting = useUIStore((s) => s.isEquipAutoSorting);

  // 1분마다 자동 새로고침
  useEffect(() => {
    if (!isRestTimerModalOpen || isRestTimerMiniView) {
      const interval = setInterval(() => getEquipments(filter), 60000);
      return () => clearInterval(interval);
    }
  }, [isRestTimerModalOpen, isRestTimerMiniView]);

  useEffect(() => {
    getEquipments(filter);
  }, []);

  useEffect(() => {
    if (isEquipAutoSorting) {
      getEquipments(filter);
    }
  }, [isEquipAutoSorting]);

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    handleSelectedEquipment(selectEquip);
  }

  async function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>,
    equipment: EquipmentType
  ) {
    e.stopPropagation();
    if (equipment.isFavorite) await deleteFavorite(equipment.id);
    else await addFavorite(equipment.id);
    getEquipments(filter);
  }

  if (equipmentListLoading) {
    return (
      <ul className="equipment-list" aria-hidden="true">
        {Array.from(new Array(6)).map((_, index) => (
          <li key={index}>
            <div className="equipment">
              <div>
                <Skeleton
                  variant="rounded"
                  width={48}
                  height={48}
                  animation="wave"
                />
              </div>
              <div className="info">
                <Skeleton
                  variant="text"
                  width="70%"
                  style={{ marginBottom: "0.5" }}
                  animation="wave"
                />
                <Skeleton variant="text" width="90%" animation="wave" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  } else {
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
              <div className="img">
                <img
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  loading="lazy"
                  onLoad={({ target }) => {
                    target.classList.add("visible");
                  }}
                />
              </div>
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
                  {/* 상태 뱃지 표현 */}
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

                  {/* 기구 현황 데이터 표현 */}
                  {equipment.status.currentUser === userInfo.name ? (
                    <span>이용중</span>
                  ) : !equipment.status.estimatedWaitMinutes &&
                    !equipment.status.waitingCount ? (
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
}
