import { Router } from "express";
import { availabilityController } from "./availability.controller";

const router = Router();

router.use("/", availabilityController.checkBookingAvailability);

export const AvailabilityRouter = router;
