import { Router } from "express";
import { loginValidatorZod, userValidatorZod } from "./userAuth.validation";
import inputDataValidator from "../../middlewares/validateRequest";
import { userAuthController } from "./userAuth.controller";

const router = Router();

router.post(
  "/signup",
  inputDataValidator(userValidatorZod),
  userAuthController.createUser
);

router.post(
  "/login",
  inputDataValidator(loginValidatorZod),
  userAuthController.login
);

export const UserRouter = router;
