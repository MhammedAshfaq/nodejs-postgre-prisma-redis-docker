import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().min(6).optional(),
});

export const getAllUserSchema = Joi.object({
  name: Joi.string().optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});