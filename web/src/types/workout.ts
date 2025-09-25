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
