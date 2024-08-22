import { Joi, validate } from "express-validation";
import { TagsEnnum, TaskStatusEnnum } from "../interfaces/task.interface";

const createTaskSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    status: Joi.string()
      .valid(...Object.values(TaskStatusEnnum))
      .required(),
    userId: Joi.number().required(),
    tag: Joi.string()
      .valid(...Object.values(TagsEnnum))
      .required(),
  }),
};
const updateTaskStausSchema = {
  body: Joi.object({
    status: Joi.string()
      .valid(...Object.values(TaskStatusEnnum))
      .required(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
const reassignTaskSchema = {
  body: Joi.object({
    userId: Joi.number().required(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const createTaskValidation = () => {
  return validate(createTaskSchema, { context: true }, { abortEarly: false });
};
export const updateTaskStatusValidation = () => {
  return validate(
    updateTaskStausSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const reassignTaskValidation = () => {
  return validate(reassignTaskSchema, { context: true }, { abortEarly: false });
};
