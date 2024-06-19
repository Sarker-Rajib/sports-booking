import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { availabilityServices } from "./availability.service";

const checkBookingAvailability = catchAsync(async (req, res) => {
  let date = new Date().toISOString().split("T")[0];
  const reqDate = req.query.date;
  if (reqDate !== undefined) {
    date = reqDate as string;
  }

  const totalSlots = [
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "20:00" },
  ];

  const bookingsbyDate = await availabilityServices.findBookingFromDb(date);

  const availableSlots = totalSlots.filter((slot) => {
    const isBooked = bookingsbyDate.find((booking) => {
      return (
        booking.startTime < slot.endTime && booking.endTime > slot.startTime
      );
    });

    return !isBooked;
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Availability checked successfully",
    data: availableSlots,
  });
});

export const availabilityController = {
  checkBookingAvailability,
};
