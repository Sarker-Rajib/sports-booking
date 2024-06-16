import { Router } from "express";
import { FacilityController } from "./facility.controller";
import inputDataValidator from "../../middlewares/validateRequest";
import { FacilityValidator } from "./facility.validation";

const router = Router();

router.post(
  "/",
  inputDataValidator(FacilityValidator),
  FacilityController.createFacility
);

export const FacilityRouter = router;
