import { Request, Response } from "express";
import {
  createUserAddressSchema,
  updateUserAddressSchema,
} from "../../validation/address/address.validation";
import { UserAddressService } from "../../service/address/address.service";

const userAddressService = new UserAddressService();
export class AddressController {
  // Create
  createUserAddress = async (req: Request, res: Response): Promise<any> => {
    try {
      const { value, error } = createUserAddressSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const newUserAddress = await userAddressService.createUserAddress(value);
      return res
        .status(201)
        .json({ message: "User created", data: newUserAddress, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };

  //Update
  updateUserAddress = async (req: Request, res: Response): Promise<any> => {
    try {
      const { value, error } = updateUserAddressSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const addressId = req.params.id;
      const userAddressData = await userAddressService.getUserAddress(
        addressId
      );
      if (!userAddressData) {
        return res
          .status(400)
          .json({ error: "User address not fount", success: false });
      }
      let updatedDate = Object.assign(userAddressData, value);
      const { user, createdAt, updatedAt, id, ...cleanData } = updatedDate;
      const updateUserAddress = await userAddressService.updateUserAddress(
        addressId,
        cleanData
      );
      return res.status(201).json({
        message: "User address updated successfully",
        data: updateUserAddress,
        success: true,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Internal server error",
        success: false,
      });
    }
  };

  //Delete
  deleteUserAddress = async (req: Request, res: Response): Promise<any> => {
    try {
      const addressId = req.params.id;
      const userAddressData = await userAddressService.getAddressById(
        addressId
      );
      if (!userAddressData) {
        return res
          .status(400)
          .json({ error: "User address not fount", success: false });
      }
      await userAddressService.deleteUserAddress(addressId);
      return res
        .status(200)
        .json({ message: "User address deleted successfully", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };

  // Get User Address
  getUserAddress = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.id;
      const userAddressData = await userAddressService.getUserAddress(userId);
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
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };
}
