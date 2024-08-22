import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";
import { INotification } from "../interfaces/notification.interface";

class Notification
  extends Model<INotification, Pick<INotification, "message" | "userId">>
  implements INotification
{
  public id!: number;
  public message!: string;
  public userId!: number;
  public isRead!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "notifications",
    modelName: "Notification",
    timestamps: true,
  }
);

Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Notification;
