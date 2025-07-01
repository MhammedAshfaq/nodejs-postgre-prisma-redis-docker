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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_validation_1 = require("../../validation/user/user.validation");
const user_service_1 = require("../../service/user/user.service");
const key_helper_1 = require("../../cache/key.helper");
const cache_service_1 = require("../../cache/cache.service");
const email_queue_1 = require("../../background/queue/email/email.queue");
const userService = new user_service_1.UserService();
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, error } = user_validation_1.createUserSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const newUser = yield userService.createUser(value);
                console.log("newUser", newUser);
                yield (0, email_queue_1.queueSendEmail)(newUser.email, 'Welcome to MyApp 🎉', `Hi ${newUser.name}, thank you for signing up!`);
                return res
                    .status(201)
                    .json({ message: "User created", data: newUser, success: true });
            }
            catch (error) {
                console.log("-----", error.message);
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, error } = user_validation_1.updateUserSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const userId = req.params.id;
                const cacheKey = (0, key_helper_1.userCacheKey)(userId);
                const userData = yield userService.getUser(userId);
                if (!userData) {
                    return res
                        .status(400)
                        .json({ error: "User not fount", success: false });
                }
                let updatedDate = Object.assign(userData, value);
                const { Address, createdAt, updatedAt, id } = updatedDate, cleanData = __rest(updatedDate, ["Address", "createdAt", "updatedAt", "id"]);
                const updateUser = yield userService.updateUser(userId, cleanData);
                yield (0, cache_service_1.deleteCache)(cacheKey);
                return res.status(201).json({
                    message: "User updated successfully",
                    data: updateUser,
                    success: true,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error.message || "Internal server error",
                    success: false,
                });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const cacheKey = (0, key_helper_1.userCacheKey)(userId);
                const userData = yield userService.getUser(userId);
                if (!userData) {
                    return res
                        .status(400)
                        .json({ error: "User not fount", success: false });
                }
                yield userService.deleteUser(userId);
                yield (0, cache_service_1.deleteCache)(cacheKey);
                return res
                    .status(200)
                    .json({ message: "User data deleted successfully", success: true });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const cacheKey = (0, key_helper_1.userCacheKey)(userId);
                let cacheData = yield (0, cache_service_1.getCache)(cacheKey);
                if (cacheData) {
                    console.log('--- CACHE USER DATA ---');
                    return res.status(200).json({
                        message: "User data retrived successfully",
                        data: cacheData,
                        success: true,
                    });
                }
                else {
                    console.log("--- Data getting from DB ---");
                    const userData = yield userService.getUser(userId);
                    if (!userData) {
                        return res
                            .status(400)
                            .json({ error: "User not fount", success: false });
                    }
                    yield (0, cache_service_1.setCache)(cacheKey, userData);
                    return res.status(200).json({
                        message: "User data retrived successfully",
                        data: userData,
                        success: true,
                    });
                }
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
        this.getUsersList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, error } = user_validation_1.getAllUserSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const result = yield userService.getUsersList({
                    name: value.name,
                    page: Number(value.page),
                    limit: Number(value.limit),
                });
                if (result.data.length === 0) {
                    return res
                        .status(400)
                        .json({ error: "User not fount", success: false });
                }
                return res.status(200).json({
                    message: "User data retrived successfully",
                    data: result,
                    success: true,
                });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
    }
}
exports.UserController = UserController;
