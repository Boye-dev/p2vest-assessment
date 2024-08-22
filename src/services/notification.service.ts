import { IUserDecoded } from "./../middlewares/authenticatedMiddleWare";
import { FindOptions, Order } from "sequelize";
import ApiError from "../errors/apiError";
import ApiResponse from "../errors/apiResponse";
import Notification from "../models/Notification";
import { INotificationParams } from "../interfaces/notification.interface";
import { IdParam } from "../interfaces/helper.interface";

export const getNotificationsService = async (
  user: IUserDecoded,
  query: INotificationParams
) => {
  const whereClause: any = { userId: user.id };

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

  const { count: total, rows: results } = await Notification.findAndCountAll(
    options
  );

  return new ApiResponse(200, "Notifications retrieved successfully", {
    results,
    total,
    page,
    pageSize,
  });
};

export const markNotificationAsReadService = async (
  param: IdParam,
  user: IUserDecoded
) => {
  const notification = await Notification.findOne({
    where: { id: param.id, userId: user.id },
  });
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }
  notification.isRead = true;
  await notification.save();

  return new ApiResponse(200, "Notification marked as read", notification);
};
