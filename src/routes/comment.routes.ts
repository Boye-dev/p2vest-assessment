import {
  createCommentValidation,
  editCommentValidation,
  deleteCommentValidation,
  getCommentByTaskValidation,
} from "./../validations/comment.validation";
import { Router } from "express";
import {
  isAuthenticated,
  validateRole,
} from "../middlewares/authenticatedMiddleWare";
import {
  createComment,
  editComment,
  deleteComment,
  getCommentByTaskId,
} from "../controllers/comment.controller";
import { RolesEnum } from "../interfaces/user.interface";

const router = Router();

router
  .route("/")
  .post(
    validateRole([RolesEnum.USER]),
    createCommentValidation(),
    createComment
  );

router.get(
  "/:id",
  isAuthenticated,
  getCommentByTaskValidation(),
  getCommentByTaskId
);

router
  .route("/:id")
  .patch(validateRole([RolesEnum.USER]), editCommentValidation(), editComment)
  .delete(isAuthenticated, deleteCommentValidation(), deleteComment);

export default router;
