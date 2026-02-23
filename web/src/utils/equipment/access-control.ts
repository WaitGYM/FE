import type { EquipmentType } from "../../types";

/**
 * 사용자의 대기 상태
 */
export interface UserWaitingState {
  waitingEquipmentId: number | null;
  isMyTurn: boolean;
  queueStatus: "WAITING" | "NOTIFIED" | null;
}

/**
 * 기구 접근 가능 여부 결과
 */
export interface AccessCheckResult {
  canAccess: boolean;
  reason?: string;
}

/**
 * 기구 접근 가능 여부를 판단
 *
 * @param equipment - 확인할 기구
 * @param userWaitingState - 사용자 대기 상태
 * @param isWorkingOut - 운동 중 여부
 * @returns 접근 가능 여부와 사유
 */
export function canAccessEquipment(
  equipment: EquipmentType,
  userWaitingState: UserWaitingState,
  isWorkingOut: boolean,
): AccessCheckResult {
  // 1. 운동 중이면 모든 기구 접근 불가
  // if (isWorkingOut) {
  //   return {
  //     canAccess: false,
  //     reason: "현재 운동 중입니다",
  //   };
  // }

  // 2. 내 차례가 도착한 경우
  if (userWaitingState.isMyTurn && userWaitingState.waitingEquipmentId) {
    // 대기 중인 기구만 접근 가능
    if (equipment.id === userWaitingState.waitingEquipmentId) {
      return { canAccess: true };
    }

    return {
      canAccess: false,
      reason: "대기 중인 기구를 먼저 이용해주세요",
    };
  }

  // 3. 대기 중인 상태 (차례 도착 전)
  if (
    userWaitingState.queueStatus === "WAITING" &&
    userWaitingState.waitingEquipmentId
  ) {
    // 대기 중인 기구는 대기 취소만 가능
    if (equipment.id === userWaitingState.waitingEquipmentId) {
      return { canAccess: true };
    }

    // 다른 기구도 접근 가능 (새로운 대기 추가 가능)
    return { canAccess: true };
  }

  // 4. 일반 상태 - 모든 기구 접근 가능
  return { canAccess: true };
}

/**
 * 기구 리스트에서 사용자의 대기 상태를 추출
 *
 * @param equipmentList - 기구 목록
 * @returns 사용자의 현재 대기 상태
 */
export function extractUserWaitingState(
  equipmentList: EquipmentType[],
): UserWaitingState {
  // 차례 도착한 기구 찾기 (우선순위 높음)
  const notifiedEquipment = equipmentList.find(
    (eq) =>
      eq.status.myQueuePosition === 1 && eq.status.myQueueStatus === "NOTIFIED",
  );

  if (notifiedEquipment) {
    return {
      waitingEquipmentId: notifiedEquipment.id,
      isMyTurn: true,
      queueStatus: "NOTIFIED",
    };
  }

  // 대기 중인 기구 찾기
  const waitingEquipment = equipmentList.find(
    (eq) => eq.status.myQueuePosition && eq.status.myQueueStatus === "WAITING",
  );

  if (waitingEquipment) {
    return {
      waitingEquipmentId: waitingEquipment.id,
      isMyTurn: false,
      queueStatus: "WAITING",
    };
  }

  // 대기 중이 아님
  return {
    waitingEquipmentId: null,
    isMyTurn: false,
    queueStatus: null,
  };
}

/**
 * 기구 클릭 시 표시할 메시지를 반환
 *
 * @param equipment - 확인할 기구
 * @param userWaitingState - 사용자 대기 상태
 * @param isWorkingOut - 운동 중 여부
 * @returns 표시할 메시지 (접근 가능하면 null)
 */
export function getEquipmentAccessMessage(
  equipment: EquipmentType,
  userWaitingState: UserWaitingState,
  isWorkingOut: boolean,
): string | null {
  const { canAccess, reason } = canAccessEquipment(
    equipment,
    userWaitingState,
    isWorkingOut,
  );

  if (canAccess) return null;
  return reason || "이 기구를 이용할 수 없습니다";
}

/**
 * 기구 버튼의 비활성화 여부를 결정
 *
 * @param equipment - 확인할 기구
 * @param userWaitingState - 사용자 대기 상태
 * @param isWorkingOut - 운동 중 여부
 * @returns 비활성화 여부
 */
export function shouldDisableEquipment(
  equipment: EquipmentType,
  userWaitingState: UserWaitingState,
  isWorkingOut: boolean,
): boolean {
  return !canAccessEquipment(equipment, userWaitingState, isWorkingOut)
    .canAccess;
}

/**
 * 내 차례가 도착한 기구인지 확인
 *
 * @param equipment - 확인할 기구
 * @param userWaitingState - 사용자 대기 상태
 * @returns 내 차례 여부
 */
export function isMyTurnEquipment(
  equipment: EquipmentType,
  userWaitingState: UserWaitingState,
): boolean {
  return (
    userWaitingState.isMyTurn &&
    equipment.id === userWaitingState.waitingEquipmentId
  );
}
