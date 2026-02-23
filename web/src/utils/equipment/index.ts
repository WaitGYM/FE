// 접근 제어 관련
export {
  canAccessEquipment,
  extractUserWaitingState,
  getEquipmentAccessMessage,
  shouldDisableEquipment,
  isMyTurnEquipment,
} from "./access-control";

export type { UserWaitingState, AccessCheckResult } from "./access-control";

// 상태 확인 관련
export {
  isEquipmentAvailable,
  isCurrentlyUsing,
  isWaitingForEquipment,
  isTurnArrived,
  isCompletedToday,
  getWaitingInfo,
} from "./status-checker";
