import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDb = async (bookingData: TBooking) => {
  const result = await Booking.create(bookingData);
  return result;
};

const findBookingsFromDb = async () => {
  const result = await Booking.find().populate('facility').populate('user')
  return result;
};

const findBookingsByUserFromDb = async (userId: any) => {
  const result = await Booking.find({ user: userId }).populate('facility').populate('user')
  return result;
};

const calcelBookingFromDb = async (bookingId: string) => {
  const result = await Booking.findOneAndUpdate({ _id: bookingId }, { isBooked: "canceled" }, { new: true }).populate('facility')
  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  findBookingsFromDb,
  findBookingsByUserFromDb,
  calcelBookingFromDb
};
