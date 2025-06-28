"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAddressSchema = exports.createUserAddressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserAddressSchema = joi_1.default.object({
    address1: joi_1.default.string().required(),
    address2: joi_1.default.string().optional(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    district: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
});
exports.updateUserAddressSchema = joi_1.default.object({
    address1: joi_1.default.string().optional(),
    address2: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    district: joi_1.default.string().optional(),
});
