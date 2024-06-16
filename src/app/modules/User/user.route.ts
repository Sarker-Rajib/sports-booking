import { Router } from "express";
import { UserController } from "./user.controller";
import { userValidatorZod } from "./user.validation";
import inputDataValidator from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/signup",
  inputDataValidator(userValidatorZod),
  UserController.createUser
);

export const UserRouter = router;
