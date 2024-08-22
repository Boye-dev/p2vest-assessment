import { Types } from "mongoose";

export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  password: string;
  username: string;
  role: RolesEnum;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  username: string;
  role: RolesEnum;
}
export enum RolesEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}
