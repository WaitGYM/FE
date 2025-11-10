type ExercisesType = {
  id: number;
  routineId: number;
  equipmentId: number;
  order: number;
  targetSets: number;
  targetReps?: number | string;
  restSeconds: number;
  notes?: string;
  equipment: {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    muscleGroup: string;
  };
};

export type RoutineType = {
  id: number;
  name: string;
  isActive: boolean;
  exerciseCount: number;
  createdAt: "string";
  updatedAt: "string";
  duration?: number;
  exercises: ExercisesType[];
};

export type RoutineDetailType = {
  id: number;
  name: string;
  isActive: boolean;
  currentlyUsing?: boolean;
  exercises: ExercisesType[];
};
