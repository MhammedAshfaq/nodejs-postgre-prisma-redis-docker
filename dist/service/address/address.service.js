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
exports.UserAddressService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UserAddressService {
    constructor() {
        this.createUserAddress = (createUserAddress /* CreateUserAddressType */) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.address.create({
                data: createUserAddress,
            });
        });
        this.updateUserAddress = (id, updateUserAddress) => __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.address.update({
                where: { id },
                data: updateUserAddress,
            });
        });
    }
    deleteUserAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.address.delete({
                where: { id },
            });
        });
    }
    getUserAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.address.findUnique({
                where: { id },
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
        });
    }
}
exports.UserAddressService = UserAddressService;
