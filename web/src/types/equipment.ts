export type EquipmentType = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  muscleGroup: string;
  createdAt: Date;
  isFavorite: boolean;
  status: {
    averageWaitTime: number;
    canStart?: true;
    canQueue?: boolean;
    completedToday?: boolean;
    currentUsageInfo?: {
      totalSets?: number;
      currentSet?: number;
      setStatus?: "EXERCISING";
      restSeconds?: number;
      progress?: number;
      estimatedEndAt?: Date;
    };
    currentUser?: string;
    currentUserId: number;
    currentUserStartedAt?: Date;
    currentUserETA: number;
    estimatedWaitMinutes: boolean;
    isAvailable: boolean;
    isUsingOtherEquipment?: boolean;
    myQueueId?: number;
    myQueuePosition?: number;
    myQueueStatus?: "WAITING" | string;
    lastCompletedAt?: Date;
    lastCompletedSets?: number;
    lastCompletedDuration?: number;
    queueETAs?: number[];
    waitingCount?: number;
    wasFullyCompleted?: boolean;
  };
  routineExId?: number; // 루틴운동시 루틴운동 기본데이터에서 추출용 타입
};
