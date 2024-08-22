import { ITask, TagsEnnum } from "./../interfaces/task.interface";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";
import { CreateTask, TaskStatusEnnum } from "../interfaces/task.interface";

class Task extends Model<ITask, CreateTask> implements ITask {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: TaskStatusEnnum;
  public userId!: number;
  public due_date!: Date;
  public tag!: TagsEnnum;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatusEnnum)),
      allowNull: false,
    },
    tag: {
      type: DataTypes.ENUM(...Object.values(TagsEnnum)),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    sequelize,
    modelName: "Task",
    timestamps: true,
  }
);

Task.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Task;
