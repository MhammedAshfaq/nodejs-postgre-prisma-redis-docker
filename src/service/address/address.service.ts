import prisma from "../../prisma";
import {
  CreateUserAddressType,
  UpdateUserAddressType,
} from "../../utils/request/userAddressRequest";

export class UserAddressService {
  createUserAddress = async (
    createUserAddress: any /* CreateUserAddressType */
  ): Promise<any> => {
    return await prisma.address.create({
      data: createUserAddress,
    });
  };

  updateUserAddress = async (
    id: string,
    updateUserAddress: UpdateUserAddressType
  ): Promise<any> => {
    return prisma.address.update({
      where: { id },
      data: updateUserAddress,
    });
  };

  async deleteUserAddress(id: string) {
    return prisma.address.delete({
      where: { id },
    });
  }

  async getAddressById(id: string) {
    return prisma.address.findUnique({
      where: { id },
    });
  }

  async getUserAddress(userId: string) {
    return prisma.address.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}
