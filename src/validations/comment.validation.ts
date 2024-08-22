import { Joi, validate } from "express-validation";

const createCommentSchema = {
  body: Joi.object({
    content: Joi.string().required(),
    taskId: Joi.number().required(),
  }),
};

const editCommentSchema = {
  body: Joi.object({
    content: Joi.string().required(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const deleteCommentSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getCommentByTaskSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const createCommentValidation = () => {
  return validate(
    createCommentSchema,
    { context: true },
    { abortEarly: false }
  );
};

export const editCommentValidation = () => {
  return validate(editCommentSchema, { context: true }, { abortEarly: false });
};

export const deleteCommentValidation = () => {
  return validate(
    deleteCommentSchema,
    { context: true },
    { abortEarly: false }
  );
};
export const getCommentByTaskValidation = () => {
  return validate(
    getCommentByTaskSchema,
    { context: true },
    { abortEarly: false }
  );
};
