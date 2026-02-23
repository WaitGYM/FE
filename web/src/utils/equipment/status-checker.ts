import type { EquipmentType } from "../../types";

/**
 * 기구가 이용 가능한 상태인지 확인
 *
 * @param equipment - 확인할 기구
 * @returns 이용 가능 여부
 */
export function isEquipmentAvailable(equipment: EquipmentType): boolean {
  return (
    equipment.status.isAvailable &&
    !equipment.status.currentUserId &&
    !equipment.status.waitingCount
  );
}

/**
 * 기구를 현재 사용 중인지 확인
 *
 * @param equipment - 확인할 기구
 * @param userId - 사용자 ID
 * @returns 사용 중 여부
 */
export function isCurrentlyUsing(
  equipment: EquipmentType,
  userId: number,
): boolean {
  return equipment.status.currentUserId === userId;
}

/**
 * 기구에 대기 중인지 확인
 *
 * @param equipment - 확인할 기구
 * @returns 대기 중 여부
 */
export function isWaitingForEquipment(equipment: EquipmentType): boolean {
  return (
    !!equipment.status.myQueuePosition &&
    equipment.status.myQueueStatus === "WAITING"
  );
}

/**
 * 차례가 도착했는지 확인
 *
 * @param equipment - 확인할 기구
 * @returns 차례 도착 여부
 */
export function isTurnArrived(equipment: EquipmentType): boolean {
  return (
    equipment.status.myQueuePosition === 1 &&
    equipment.status.myQueueStatus === "NOTIFIED"
  );
}

/**
 * 오늘 운동을 완료했는지 확인
 *
 * @param equipment - 확인할 기구
 * @returns 완료 여부
 */
export function isCompletedToday(equipment: EquipmentType): boolean {
  return !!equipment.status.completedToday;
}

/**
 * 기구 대기 시간 정보를 가져옴
 *
 * @param equipment - 확인할 기구
 * @returns 대기 시간(분)과 대기 인원
 */
export function getWaitingInfo(equipment: EquipmentType): {
  waitMinutes: number;
  waitingCount: number;
} {
  const waitMinutes =
    equipment.status.myQueueStatus === "WAITING"
      ? equipment.status.currentUserETA || 0
      : equipment.status.estimatedWaitMinutes || 0;

  const waitingCount =
    equipment.status.myQueueStatus === "WAITING"
      ? equipment.status.myQueuePosition || 0
      : equipment.status.waitingCount || 0;

  return { waitMinutes, waitingCount };
}
