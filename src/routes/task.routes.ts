import {
  updateTaskStatusValidation,
  createTaskValidation,
  reassignTaskValidation,
} from "./../validations/task.validation";
import { Router } from "express";
import {
  isAuthenticated,
  validateRole,
} from "../middlewares/authenticatedMiddleWare";
import {
  createTask,
  getTaskById,
  getTasks,
  reassignTask,
  updateTaskStatus,
} from "../controllers/task.controller";
import { RolesEnum } from "../interfaces/user.interface";

const router = Router();

router
  .route("/")
  .post(validateRole([RolesEnum.USER]), createTaskValidation(), createTask)
  .get(isAuthenticated, getTasks);

router.get("/:id", isAuthenticated, getTaskById);

router.patch(
  "/reassign/:id",
  validateRole([RolesEnum.USER]),
  reassignTaskValidation(),
  reassignTask
);

router.patch(
  "/update-status/:id",
  isAuthenticated,
  updateTaskStatusValidation(),
  updateTaskStatus
);

export default router;
