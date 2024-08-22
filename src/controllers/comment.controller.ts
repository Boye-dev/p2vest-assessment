import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  editCommentService,
  deleteCommentService,
  addCommentService,
  getCommentsByTaskIdService,
} from "../services/comment.service";
import {
  CreateCommentRequest,
  ICommentParams,
} from "../interfaces/comment.interface";
import ApiError from "../errors/apiError";

export const createComment: ExpresFunction<CreateCommentRequest> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const data = await addCommentService(req.body, req.user);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const editComment: ExpresFunction<
  Pick<CreateCommentRequest, "content">
> = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const data = await editCommentService(
      req.params as IdParam,
      req.user,
      req.body
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteComment: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const data = await deleteCommentService(req.params as IdParam, req.user);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const getCommentByTaskId: ExpresFunction<{}, ICommentParams> = async (
  req,
  res,
  next
) => {
  try {
    const data = await getCommentsByTaskIdService(
      req.params as IdParam,
      req.query
    );
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
