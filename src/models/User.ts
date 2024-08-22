import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import {
  CreateUserRequest,
  IUser,
  RolesEnum,
} from "../interfaces/user.interface";

class User extends Model<IUser, CreateUserRequest> implements IUser {
  public id!: number;
  public username!: string;
  public firstname!: string;
  public lastname!: string;
  public password!: string;
  public role!: RolesEnum;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(RolesEnum)),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  }
);

export default User;
