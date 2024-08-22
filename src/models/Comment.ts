import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

import {
  CreateCommentRequest,
  IComment,
} from "../interfaces/comment.interface";
import Task from "./Task";
import User from "./User";

class Comment
  extends Model<IComment, CreateCommentRequest>
  implements IComment
{
  public id!: number;
  public content!: string;
  public userId!: number;
  public taskId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    taskId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "comments",
    modelName: "Comment",
    timestamps: true,
  }
);

Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
Comment.belongsTo(Task, { foreignKey: "taskId", as: "task" });

export default Comment;
