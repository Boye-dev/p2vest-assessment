import { Joi, validate } from "express-validation";

const readNotificationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const readNotificationValidation = () => {
  return validate(
    readNotificationSchema,
    { context: true },
    { abortEarly: false }
  );
};
