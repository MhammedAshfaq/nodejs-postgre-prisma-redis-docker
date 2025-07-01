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
exports.AddressController = void 0;
const address_validation_1 = require("../../validation/address/address.validation");
const address_service_1 = require("../../service/address/address.service");
const userAddressService = new address_service_1.UserAddressService();
class AddressController {
    constructor() {
        // Create
        this.createUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, error } = address_validation_1.createUserAddressSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const newUserAddress = yield userAddressService.createUserAddress(value);
                return res
                    .status(201)
                    .json({ message: "User created", data: newUserAddress, success: true });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
        //Update
        this.updateUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, error } = address_validation_1.updateUserAddressSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const addressId = req.params.id;
                const userAddressData = yield userAddressService.getUserAddress(addressId);
                if (!userAddressData) {
                    return res
                        .status(400)
                        .json({ error: "User address not fount", success: false });
                }
                let updatedDate = Object.assign(userAddressData, value);
                const { user, createdAt, updatedAt, id } = updatedDate, cleanData = __rest(updatedDate, ["user", "createdAt", "updatedAt", "id"]);
                const updateUserAddress = yield userAddressService.updateUserAddress(addressId, cleanData);
                return res.status(201).json({
                    message: "User address updated successfully",
                    data: updateUserAddress,
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
        //Delete
        this.deleteUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const addressId = req.params.id;
                const userAddressData = yield userAddressService.getAddressById(addressId);
                if (!userAddressData) {
                    return res
                        .status(400)
                        .json({ error: "User address not fount", success: false });
                }
                yield userAddressService.deleteUserAddress(addressId);
                return res
                    .status(200)
                    .json({ message: "User address deleted successfully", success: true });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "Internal server error", success: false });
            }
        });
        // Get User Address
        this.getUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const userAddressData = yield userAddressService.getUserAddress(userId);
                console.log("--userAddressData", userAddressData);
                if (!userAddressData || userAddressData.length === 0) {
                    return res
                        .status(400)
                        .json({ error: "User address not fount", success: false });
                }
                return res.status(200).json({
                    message: "User address retrived successfully",
                    data: userAddressData,
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
exports.AddressController = AddressController;
