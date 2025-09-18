export type EquipmentMode = "plan" | "direct" | "addPlan";

export interface EquipmentSelectionOptions {
  singleSelect: boolean;
  showAutoSuggest: boolean;
  showSelectedCount: boolean;
}

export interface EquipmentPageConfig {
  title: string;
  showSearch: boolean;
  showCategories: boolean;
  mode: EquipmentMode;
}

// 기존 EquipmentType은 전역 types에 있을 수도 있음
export type { EquipmentType } from "../../types/global";
