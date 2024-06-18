import { Router } from "express";
import { BookingController } from "./bookingController";
import { verifyOnlyUser } from "../../middlewares/verifyOnlyUser";
import inputDataValidator from "../../middlewares/validateRequest";
import { bookingValidator } from "./booking.validation";

const router = Router();

router.post(
  "/",
  verifyOnlyUser,
  inputDataValidator(bookingValidator),
  BookingController.createBooking
);

export const BookingRouter = router;
