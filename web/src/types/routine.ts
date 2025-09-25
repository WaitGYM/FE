import type { EquipmentType } from "./equipment";

export type RoutineType = {
  id: number;
  name: string;
  isActive: boolean;
  equipmentNum: number;
  duration: number;
};

export type RoutineDetailType = {
  id: number;
  name: string;
  equipmentList: EquipmentType[];
};
