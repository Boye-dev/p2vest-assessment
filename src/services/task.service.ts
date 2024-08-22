import { CreateTask, ITaskParams } from "./../interfaces/task.interface";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import { IdParam } from "../interfaces/helper.interface";
import Task from "../models/Task";
import User from "../models/User";
import { RolesEnum } from "../interfaces/user.interface";
import { FindOptions, Order } from "sequelize";
import Notification from "../models/Notification";
import { notifyUser } from "../config/socket";

export const createTaskService = async (data: CreateTask) => {
  const newTask = await Task.create(data);
  return new ApiResponse(201, "Task created successfully", newTask);
};

export const reassignTaskService = async (
  params: IdParam,
  data: Pick<CreateTask, "userId">
) => {
  const user = await User.findByPk(data.userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const task = await Task.findByPk(params.id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  task.userId = data.userId;
  await task?.save();
  await Notification.create({
    message: `You have been assigned to the task: ${task.title}`,
    userId: data.userId,
  });
  notifyUser(data.userId, `You have been assigned to the task: ${task.title}`);
  return new ApiResponse(201, "Task reassigned successfully", task);
};

export const updateTaskStatusService = async (
  params: IdParam,
  data: Pick<CreateTask, "status">,
  user: any
) => {
  const task = await Task.findByPk(params.id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  if (user.role !== RolesEnum.ADMIN && task.userId !== user.id) {
    throw new ApiError(403, "You are not authorized to update this task");
  }
  task.status = data.status;
  await task?.save();
  await Notification.create({
    message: `${task.title} has been moved to ${task.status}`,
    userId: user.id,
  });
  notifyUser(user.id, `${task.title} has been moved to ${task.status}`);

  return new ApiResponse(201, "Task status updated successfully", task);
};

export const getTasksService = async (query: ITaskParams) => {
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
    where: { status: query.status },
    order: sortOrder,
    offset: pageSize * page,
    limit: pageSize,
  };

  const { count: total, rows: results } = await Task.findAndCountAll(options);
  return new ApiResponse(200, "Tasks fetched successfully", {
    results,
    total,
    page,
    pageSize,
  });
};

export const getTaskByIdService = async (params: IdParam) => {
  const task = await Task.findByPk(params.id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return new ApiResponse(200, "Task retrieved successfully", task);
};
