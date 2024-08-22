import { IParams } from "./helper.interface";
import { Document } from "mongoose";

export interface ITask {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  status: TaskStatusEnnum;
  tag: TagsEnnum;
  userId: number;
}

export enum TaskStatusEnnum {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
export enum TagsEnnum {
  URGENT = "URGENT",
  BUG = "BUG",
  FEATURE = "FEATURE",
}

export interface CreateTask {
  title: string;
  description: string;
  due_date: Date;
  status: TaskStatusEnnum;
  userId: any;
  tag: string[];
}

export interface ReassignTask {
  userId: any;
}
export interface ITaskParams extends IParams {
  status?: keyof typeof TaskStatusEnnum;
}
