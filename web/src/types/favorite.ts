type FavoriteEquipmentType = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  muscleGroup: string;
  reservationCount: number;
  isFavorite: boolean;
};

export type FavoriteType = {
  id: number;
  createdAt?: Date;
  equipment: FavoriteEquipmentType;
};
