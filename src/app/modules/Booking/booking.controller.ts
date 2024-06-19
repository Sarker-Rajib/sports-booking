import { AppError } from "../../middlewares/ErrorHandlers";
import catchAsync from "../../utils/catchAsync";
import { getFacilityPrice } from "../../utils/getFacilityPrice";
import { findUserFromDb } from "../../utils/getUser";
import sendResponse from "../../utils/response";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  // ---------------------------
  const authData = req.headers.authorization;
  const reqUser = await findUserFromDb(authData as string);
  const data = req.body;
  const userId = reqUser._id;
  const pricePerHour = await getFacilityPrice(data?.facility);

  const startDateTime: any = new Date(`${data.date}T${data.startTime}:00`);
  const endDateTime: any = new Date(`${data.date}T${data.endTime}:00`);
  const differenceInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);

  const payableAmount = pricePerHour * differenceInHours;

  const bookingData = { ...data, user: userId, payableAmount };
  // --
  const result = await BookingServices.createBookingIntoDb(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.findBookingsFromDb();

  if (result.length === 0 || result === null) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
});

const getBookingsByUser = catchAsync(async (req, res) => {
  const authData = req.headers.authorization;
  const reqUser = await findUserFromDb(authData as string);
  const result = await BookingServices.findBookingsByUserFromDb(reqUser._id);

  if (result.length === 0 || result === null) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
});

const cancelBooking = catchAsync(async (req, res) => {
  const reqId = req.params.id;
  const result = await BookingServices.calcelBookingFromDb(reqId);

  if (result === null) {
    throw new AppError(
      400,
      "Cancelling Booking unsuccessful, please check provided Id"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
};
