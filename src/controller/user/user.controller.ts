import { Request, Response } from "express";
import {
  createUserSchema,
  getAllUserSchema,
  updateUserSchema,
} from "../../validation/user/user.validation";
import { UserService } from "../../service/user/user.service";
import { userCacheKey } from "../../cache/key.helper";
import { deleteCache, getCache, setCache } from "../../cache/cache.service";
import { queueSendEmail } from "../../background/queue/email/email.queue";

const userService = new UserService();
export class UserController {
  createUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { value, error } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const newUser = await userService.createUser(value);
      console.log("newUser",newUser)
      await queueSendEmail(
      newUser.email,
      'Welcome to MyApp',
      `Hi ${newUser.name}, thank you for signing up!`
    );
      return res
        .status(201)
        .json({ message: "User created", data: newUser, success: true });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { value, error } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const userId = req.params.id;
      const cacheKey = userCacheKey(userId);
      const userData = await userService.getUser(userId);
      if (!userData) {
        return res
          .status(400)
          .json({ error: "User not fount", success: false });
      }
      let updatedDate = Object.assign(userData, value);
      const { Address, createdAt, updatedAt, id, ...cleanData } = updatedDate;
      const updateUser = await userService.updateUser(userId, cleanData);
      await deleteCache(cacheKey);
      return res.status(201).json({
        message: "User updated successfully",
        data: updateUser,
        success: true,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Internal server error",
        success: false,
      });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.id;
      const cacheKey = userCacheKey(userId);
      const userData = await userService.getUser(userId);
      if (!userData) {
        return res
          .status(400)
          .json({ error: "User not fount", success: false });
      }
      await userService.deleteUser(userId);
      await deleteCache(cacheKey);
      return res
        .status(200)
        .json({ message: "User data deleted successfully", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };

  getUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.id;
      const cacheKey = userCacheKey(userId);
      let cacheData = await getCache(cacheKey);
      if (cacheData) {
        console.log('--- CACHE USER DATA ---')
        return res.status(200).json({
          message: "User data retrived successfully",
          data: cacheData,
          success: true,
        });
      } else {
        console.log("--- Data getting from DB ---")
        const userData = await userService.getUser(userId);
        if (!userData) {
          return res
            .status(400)
            .json({ error: "User not fount", success: false });
        }
        await setCache(cacheKey,userData);
        return res.status(200).json({
          message: "User data retrived successfully",
          data: userData,
          success: true,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };

  getUsersList = async (req: Request, res: Response): Promise<any> => {
    try {
      const { value, error } = getAllUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const result = await userService.getUsersList({
        name: value.name as string,
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
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  };
}
