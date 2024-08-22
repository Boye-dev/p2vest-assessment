import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import { CreateUserRequest, IUserLogin } from "../interfaces/user.interface";
import {
  createUserService,
  getUserByIdService,
  loginService,
  updateUserService,
} from "../services/user.service";

export const createUser: ExpresFunction<CreateUserRequest> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createUserService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateUser: ExpresFunction<
  Partial<Omit<CreateUserRequest, "password" | "username">>
> = async (req, res, next) => {
  try {
    const data = await updateUserService(req.params as IdParam, req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserById: ExpresFunction = async (req, res, next) => {
  try {
    const data = await getUserByIdService(req.params as IdParam);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const login: ExpresFunction<IUserLogin> = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
