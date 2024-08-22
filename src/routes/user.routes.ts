import {
  createUserValidation,
  getUserByIdValidation,
  loginUserValidation,
  updateUserValidation,
} from "../validations/user.validation";
import { Router } from "express";
import {
  createUser,
  getUserById,
  login,
  updateUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";

const router = Router();

router.route("/").post(createUserValidation(), createUser);

router
  .route("/:id")
  .get(isAuthenticated, getUserByIdValidation(), getUserById)
  .patch(
    isAuthenticated,

    updateUserValidation(),
    updateUser
  );

router.post("/login", loginUserValidation(), login);

export default router;
