import prisma from "../../prisma";
import {
  CreateUserType,
  UpdateUserType,
  UserListType,
} from "../../utils/request/userRequest";

export class UserService {
  createUser = async (createUser: CreateUserType): Promise<any> => {
    return await prisma.users.create({
      data: createUser,
    });
  };

  updateUser = async (id: string, updateUser: UpdateUserType): Promise<any> => {
    return prisma.users.update({
      where: { id },
      data: updateUser,
    });
  };

  async deleteUser(id: string) {
    return prisma.users.delete({
      where: { id },
    });
  }

  async getUser(id: string) {
    return prisma.users.findUnique({
      where: { id },
      include: {
        Address: true,
      },
    });
  }

  async getUsersList(getUserReq: UserListType) {
    const { name, page = 1, limit = 10 } = getUserReq;

    const where: any = {};
    const skip = (page - 1) * limit;

    if (name) {
      where.name = { contains: name, mode: "insensitive" };
    }

    const [total, users] = await prisma.$transaction([
      prisma.users.count({ where }),
      prisma.users.findMany({
        where,
        skip,
        take: limit,
        include: {
          Address: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
