import ApiError from "../errors/apiError";
import { ExpresFunction, IdParam } from "../interfaces/helper.interface";
import {
  getNotificationsService,
  markNotificationAsReadService,
} from "../services/notification.service";

export const getNotifications: ExpresFunction = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const data = await getNotificationsService(req.user, req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead: ExpresFunction<IdParam> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const data = await markNotificationAsReadService(
      req.params as IdParam,
      req.user
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
