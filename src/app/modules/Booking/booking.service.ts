import { AppError } from "../../middlewares/ErrorHandlers";
import { User } from "../UserAuth/userAuth.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDb = async (bookingData: TBooking) => {
  const result = await Booking.create(bookingData);
  return result;
};

const findUserFromDb = async (email: string) => {
  const user = await User.findOne({ email: email });
  const result = user?._id;

  if (result === undefined) {
    throw new AppError(400, "User not found");
  }

  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  findUserFromDb,
};
