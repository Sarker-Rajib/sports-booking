import { Router } from "express";
import { UserController } from "./user.controller";
import { userValidatorZod } from "./user.validation";
import inputDataValidator from "../../middlewares/validateRequest";
import { loginValidatorZod } from "../Auth/auth.validator";
import { authController } from "../Auth/auth.controller";

const router = Router();

router.post(
  "/signup",
  inputDataValidator(userValidatorZod),
  UserController.createUser
);

router.post(
  "/login",
  inputDataValidator(loginValidatorZod),
  authController.login
);

export const UserRouter = router;
