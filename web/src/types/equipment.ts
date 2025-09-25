export type EquipmentType = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  muscleGroup: string;
  createdAt: Date;
  isFavorite: boolean;
  reservationCount?: number;
  status: {
    isAvailable?: boolean;
    currentUser?: string;
    currentUserStartedAt?: Date;
    currentUsageInfo?: {
      totalSets?: number;
      currentSet?: number;
      setStatus?: "EXERCISING";
      restSeconds?: number;
      progress?: number;
      estimatedEndAt?: Date;
    };
    waitingCount?: number;
    myQueuePosition?: number;
    myQueueStatus?: number;
    canStart?: true;
    canQueue?: boolean;
    completedToday?: boolean;
    lastCompletedAt?: Date;
    lastCompletedSets?: number;
    lastCompletedDuration?: number;
    wasFullyCompleted?: boolean;
  };
};
