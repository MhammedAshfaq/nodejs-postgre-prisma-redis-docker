export type CreateUserType = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  name?: string;
  email?: string;
  password?: string;
};

export type UserListType = {
  name?: string;
  page?: number;
  limit?: number;
};
