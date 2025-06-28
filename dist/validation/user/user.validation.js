"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    password: joi_1.default.string().min(6).optional(),
});
exports.getAllUserSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    page: joi_1.default.number().optional(),
    limit: joi_1.default.number().optional(),
});
