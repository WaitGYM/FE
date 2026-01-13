export type UserType = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  createdAt?: Date;
  isGuest?: boolean;
};

export type GuestType = {
  token: string;
  user: {
    id: number;
    isGuest: boolean;
    name: string;
    email: string;
  };
};
