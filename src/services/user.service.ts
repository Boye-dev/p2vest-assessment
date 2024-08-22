import ApiError from "../errors/apiError";
import { CreateUserRequest, IUserLogin } from "../interfaces/user.interface";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../errors/apiResponse";
import { IdParam } from "../interfaces/helper.interface";

const saltRounds = 13;

export const createUserService = async (data: CreateUserRequest) => {
  const user = await User.findOne({ where: { username: data.username } });
  if (user) {
    throw new ApiError(400, `User with ${user.username} already exists`);
  }
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const newUser = await User.create(data);
  const { password, ...userWithoutPassword } = newUser.toJSON();
  return new ApiResponse(200, "User Created Successfully", userWithoutPassword);
};

export const loginService = async (data: IUserLogin) => {
  const user = await User.findOne({ where: { username: data.username } });

  if (!user) {
    throw new ApiError(400, `Invalid Username/Password`);
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new ApiError(400, `Invalid Username/Password`);
  }

  const payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    role: user.role,
  };
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "5h",
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "6d",
    });
    return new ApiResponse(200, "Login Successful", {
      accessToken,
      refreshToken,
    });
  }
};

export const updateUserService = async (
  params: IdParam,
  data: Partial<Omit<CreateUserRequest, "password" | "username">>
) => {
  const [rowsUpdated, [updatedUser]] = await User.update(data, {
    where: { id: params.id },
    returning: true,
  });

  if (!rowsUpdated) {
    throw new ApiError(400, "Error updating user");
  }

  const payload = {
    id: updatedUser.id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    username: updatedUser.username,
    role: updatedUser.role,
  };

  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "5h",
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "6d",
    });
    return new ApiResponse(200, "User Updated Successfully", {
      accessToken,
      refreshToken,
    });
  }
};

export const getUserByIdService = async (params: IdParam) => {
  const user = await User.findByPk(params.id);
  if (!user) {
    throw new ApiError(400, `User not found`);
  }
  return new ApiResponse(200, "User Found", user);
};
