import { Router } from "express";
import { BookingController } from "./booking.controller";
import { verifyOnlyUser } from "../../middlewares/verifyOnlyUser";
import inputDataValidator from "../../middlewares/validateRequest";
import { bookingValidator } from "./booking.validation";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

const router = Router();

router.post(
  "/",
  verifyOnlyUser,
  inputDataValidator(bookingValidator),
  BookingController.createBooking
);

router.get("/", verifyAdmin, BookingController.getAllBookings);

router.get("/user", verifyOnlyUser, BookingController.getBookingsByUser);

router.delete("/:id", verifyOnlyUser, BookingController.cancelBooking);

export const BookingRouter = router;
