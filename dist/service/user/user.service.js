"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UserService {
    constructor() {
        this.createUser = (createUser) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.users.create({
                data: createUser,
            });
        });
        this.updateUser = (id, updateUser) => __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.users.update({
                where: { id },
                data: updateUser,
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.users.delete({
                where: { id },
            });
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.users.findUnique({
                where: { id },
                include: {
                    Address: true,
                },
            });
        });
    }
    getUsersList(getUserReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, page = 1, limit = 10 } = getUserReq;
            const where = {};
            const skip = (page - 1) * limit;
            if (name) {
                where.name = { contains: name, mode: "insensitive" };
            }
            const [total, users] = yield prisma_1.default.$transaction([
                prisma_1.default.users.count({ where }),
                prisma_1.default.users.findMany({
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
        });
    }
}
exports.UserService = UserService;
