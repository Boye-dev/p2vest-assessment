import { Joi, validate } from "express-validation";
import { RolesEnum } from "../interfaces/user.interface";

const createUserSchema = {
  body: Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .valid(...[...Object.values(RolesEnum)])
      .required(),
  }),
};
const updateUserSchema = {
  body: Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
const getUserByIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
const loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const createUserValidation = () => {
  return validate(createUserSchema, { context: true }, { abortEarly: false });
};

export const updateUserValidation = () => {
  return validate(updateUserSchema, { context: true }, { abortEarly: false });
};
export const getUserByIdValidation = () => {
  return validate(getUserByIdSchema, { context: true }, { abortEarly: false });
};
export const loginUserValidation = () => {
  return validate(loginUserSchema, { context: true }, { abortEarly: false });
};
