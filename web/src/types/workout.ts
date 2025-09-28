export type WorkingoutType = {
  id?: number;
  currentSet: number;
  equipmentId: number;
  equipmentName: string;
  estimatedEndAt: string;
  progress: number;
  restSeconds: number;
  setStatus?: "EXERCISING" | "COPLETE";
  startedAt: string;
  totalSets: number;
};

export type WorkoutProgressInfoType = {
  message: string;
  setStatus?: string;
  restSeconds?: number;
  completed?: boolean;
  summary?: {
    totalDurationSec: number;
    totalDuration: string;
    totalRestSec: number;
    totalRest: string;
    workTimeSec: number;
    workTime: string;
  };
};
