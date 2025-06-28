import Joi from "joi";

export const createUserAddressSchema = Joi.object({
  address1: Joi.string().required(),
  address2: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  userId: Joi.string().required(),
});


export const updateUserAddressSchema = Joi.object({
  address1: Joi.string().optional(),
  address2: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  district: Joi.string().optional(),
});