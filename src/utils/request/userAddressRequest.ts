export type CreateUserAddressType = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  district: string;
  userId: string;
};

export type UpdateUserAddressType = {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  district?: string;
};