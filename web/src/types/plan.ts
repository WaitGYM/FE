import type { EquipmentType } from "./equipment";

export type PlanType = {
  id: number;
  name: string;
  isActive: boolean;
  equipmentNum: number;
  duration: number;
};

export type PlanDetailType = {
  id: number;
  name: string;
  equipmentList: EquipmentType[];
};
