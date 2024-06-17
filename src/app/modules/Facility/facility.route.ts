import { Router } from "express";
import { FacilityController } from "./facility.controller";
import inputDataValidator from "../../middlewares/validateRequest";
import { FacilityValidator } from "./facility.validation";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

const router = Router();

router.post(
  "/",
  verifyAdmin,
  inputDataValidator(FacilityValidator),
  FacilityController.createFacility
);

router.get("/", FacilityController.getAllFacility);

export const FacilityRouter = router;
