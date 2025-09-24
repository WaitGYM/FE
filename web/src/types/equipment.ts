export type EquipmentType = {
  id: number;
  name: string;
  isFavorite: boolean;
  imageUrl: string;
  waitingTime?: number;
  reservationCount?: number;
  category: string;
  muscleGroup: string;
};
