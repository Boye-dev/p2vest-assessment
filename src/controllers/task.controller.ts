import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  CreateTask,
  ITaskParams,
  ReassignTask,
} from "../interfaces/task.interface";
import {
  createTaskService,
  getTaskByIdService,
  getTasksService,
  reassignTaskService,
  updateTaskStatusService,
} from "../services/task.service";

export const createTask: ExpresFunction<CreateTask> = async (
  req,
  res,
  next
) => {
  try {
    const data = await createTaskService(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const reassignTask: ExpresFunction<Pick<CreateTask, "userId">> = async (
  req,
  res,
  next
) => {
  try {
    const data = await reassignTaskService(req.params as IdParam, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus: ExpresFunction<
  Pick<CreateTask, "status">
> = async (req, res, next) => {
  try {
    const data = await updateTaskStatusService(
      req.params as IdParam,
      req.body,
      req.user
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
export const getTasks: ExpresFunction<{}, ITaskParams> = async (
  req,
  res,
  next
) => {
  try {
    const data = await getTasksService(req.query);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTaskById: ExpresFunction<{}, ITaskParams> = async (
  req,
  res,
  next
) => {
  try {
    const data = await getTaskByIdService(req.params as IdParam);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
