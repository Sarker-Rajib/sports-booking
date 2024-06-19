import { Booking } from "../Booking/booking.model";

const findBookingFromDb = async (date: string) => {
  const result = await Booking.find({ date }).select("date startTime endTime");
  return result;
};

export const availabilityServices = {
  findBookingFromDb,
};
