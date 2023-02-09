import { User } from '@prisma/client';

export type UserDto = {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  refreshToken?: string;
};

export const convertUserToUserDto = (user: User): UserDto => {
  const { id, name, password, email, role, refreshToken } = user;
  return {
    id,
    name,
    password,
    email,
    role,
    refreshToken,
  };
};
