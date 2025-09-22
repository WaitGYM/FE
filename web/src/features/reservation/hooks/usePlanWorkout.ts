import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../../../stores/UIStore";
import { usePlanStore } from "../../../stores/planStore";
import { useEquipmentStore } from "../../../stores/equipmentStore";
import type { EquipmentType } from "../../equipment/types";

export function usePlanWorkout() {
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentType | null>(null);
  const { equipmentList, getEquipments } = useEquipmentStore();
  const { planId } = useUIStore();
  const { planDetail, getPlanDetail } = usePlanStore();

  useEffect(() => {
    getEquipments();
    if (planId) getPlanDetail(planId);
  }, [getEquipments, getPlanDetail, planId]);

  const handleEquipmentSelect = useCallback((equipment: EquipmentType) => {
    setSelectedEquipment(equipment);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedEquipment) return;

    if (selectedEquipment.waitingTime) {
      navigate("/workout/Booking");
    } else {
      navigate("/workout/exercising");
    }
  }, [selectedEquipment, navigate]);

  return {
    selectedEquipment,
    equipmentList,
    planDetail,
    handleEquipmentSelect,
    handleNext,
  };
}
