import Comment from "../models/Comment";
import ApiResponse from "../errors/apiResponse";
import {
  CreateCommentRequest,
  ICommentParams,
} from "../interfaces/comment.interface";
import ApiError from "../errors/apiError";
import { RolesEnum } from "../interfaces/user.interface";
import { IdParam } from "../interfaces/helper.interface";
import { IUserDecoded } from "../middlewares/authenticatedMiddleWare";
import Task from "../models/Task";
import { FindOptions, Order } from "sequelize";

export const addCommentService = async (
  data: CreateCommentRequest,
  user: IUserDecoded
) => {
  const task = await Task.findByPk(data.taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  const payload = { userId: user.id, ...data };
  const newComment = await Comment.create(payload);
  return new ApiResponse(201, "Comment added successfully", newComment);
};

export const editCommentService = async (
  param: IdParam,
  user: IUserDecoded,
  data: Pick<CreateCommentRequest, "content">
) => {
  const comment = await Comment.findOne({
    where: { id: param.id, userId: user.id },
  });

  if (!comment) {
    throw new ApiError(403, "You are not authorized to edit this comment");
  }

  comment.content = data.content;
  await comment.save();

  return new ApiResponse(200, "Comment updated successfully", comment);
};

export const deleteCommentService = async (
  param: IdParam,
  user: IUserDecoded
) => {
  const comment = await Comment.findByPk(param.id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (user.role !== RolesEnum.ADMIN && comment.userId !== user.id) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await comment.destroy();

  return new ApiResponse(200, "Comment deleted successfully");
};

export const getCommentsByTaskIdService = async (
  param: IdParam,
  query: ICommentParams
) => {
  const whereClause: any = { taskId: param.id };

  let page = 0;
  let pageSize = 10;
  let sort: string | undefined;

  if (query) {
    const {
      page: pageNumber = 0,
      pageSize: queryPageSize = 10,
      sort: querySort,
    } = query;
    page = Number(pageNumber);
    pageSize = Number(queryPageSize);
    sort = querySort;
  }

  const sortOrder: Order = sort
    ? [[sort.replace("-", ""), sort.startsWith("-") ? "DESC" : "ASC"]]
    : [];

  const options: FindOptions = {
    where: whereClause,
    order: sortOrder,
    offset: pageSize * page,
    limit: pageSize,
  };
  const { count: total, rows: results } = await Comment.findAndCountAll(
    options
  );
  return new ApiResponse(200, "Comments fetched successfully", {
    results,
    total,
    page,
    pageSize,
  });
};
