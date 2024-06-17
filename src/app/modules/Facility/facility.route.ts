import { Router } from "express";
import { FacilityController } from "./facility.controller";
import inputDataValidator from "../../middlewares/validateRequest";
import { FacilityValidator } from "./facility.validation";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { verifyUser } from "../../middlewares/verifyUser";

const router = Router();

router.post(
  "/",
  verifyAdmin,
  inputDataValidator(FacilityValidator),
  FacilityController.createFacility
);

router.get("/", verifyUser, FacilityController.getAllFacility);

router.put(
  "/:id",
  verifyAdmin,
  inputDataValidator(FacilityValidator),
  FacilityController.updateFacility
);

router.delete("/:id", verifyAdmin, FacilityController.deleteFacility);

export const FacilityRouter = router;
