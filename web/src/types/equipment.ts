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

export type EquipmentFavoriteType = {
  id: number;
  userId: number;
  equipmentId: number;
  createdAt: Date;
};
