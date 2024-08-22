import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";
import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller";
import { readNotificationValidation } from "../validations/notification.validataion";

const router = Router();

router.get("/", isAuthenticated, getNotifications);

router.patch(
  "/:id/read",
  isAuthenticated,
  readNotificationValidation(),
  markNotificationAsRead
);

export default router;
