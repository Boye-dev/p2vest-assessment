import { IParams } from "./helper.interface";

export interface INotification {
  id: number;
  message: string;
  userId: number;
  isRead: boolean;
}

export interface INotificationParams extends IParams {}
