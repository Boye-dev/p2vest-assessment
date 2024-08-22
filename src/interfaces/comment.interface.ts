import { IParams } from "./helper.interface";

export interface IComment {
  id: number;
  content: string;
  userId: number;
  taskId: number;
}
export interface CreateCommentRequest {
  content: string;
  taskId: number;
}
export interface ICommentParams extends IParams {}
