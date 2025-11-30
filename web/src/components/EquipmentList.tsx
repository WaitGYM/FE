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

  //aria 접근성관련 함수
  function createEquipmentAriaLabel(equipment: EquipmentType): string {
    let label = equipment.name;

    // 이용 상태
    if (equipment.status.currentUser === userInfo.name) {
      label += ", 현재 이용 중";
    } else if (
      !equipment.status.estimatedWaitMinutes &&
      !equipment.status.waitingCount
    ) {
      label += ", 이용 가능";
    } else {
      const waitMinutes =
        equipment.status.myQueueStatus === "WAITING"
          ? equipment.status.currentUserETA
          : equipment.status.estimatedWaitMinutes;
      const waitingCount =
        equipment.status.myQueueStatus === "WAITING"
          ? equipment.status.myQueuePosition
          : equipment.status.waitingCount;
      label += `, 예상 대기 시간 ${waitMinutes}분, ${waitingCount}명 대기 중`;
    }

    // 나의 대기 상태
    if (
      equipment.status.myQueuePosition &&
      equipment.status.myQueueStatus === "WAITING"
    ) {
      label += ", 내가 대기 중인 기구";
    } else if (
      equipment.status.myQueueStatus === "NOTIFIED" &&
      equipment.status.myQueuePosition === 1
    ) {
      label += ", 내 차례 알림 도착";
    }

    // 오늘 운동 완료 여부
    if (equipment.status.completedToday) {
      label += ", 오늘 운동 완료";
    }

    return label;
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
            <button
              onClick={() => handleEquipmentToggle(equipment)}
              aria-label={createEquipmentAriaLabel(equipment)}
              className={`equipment ${
                !(
                  selectedList.length &&
                  selectedList.some((x) => x.id === equipment.id)
                )
                  ? ""
                  : "selected"
              }`}
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
                    aria-label={
                      equipment.isFavorite ? "즐겨찾기 취소" : "즐겨찾기"
                    }
                    aria-pressed={equipment.isFavorite}
                    type="button"
                  >
                    <Star
                      size={20}
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
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
