import catchAsync from "../../utils/catchAsync";
import { findUserFromDb } from "../../utils/getUser";
import sendResponse from "../../utils/response";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  // ---------------------------  
  const authData = req.headers.authorization;
  const reqUser = await findUserFromDb(authData as string)
  const userId = reqUser._id
  const data = req.body;
  const bookingData = { ...data, user: userId, payableAmount: 40 };
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

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingsByUser = catchAsync(async (req, res) => {
  const authData = req.headers.authorization;
  const reqUser = await findUserFromDb(authData as string)
  const result = await BookingServices.findBookingsByUserFromDb(reqUser._id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const reqId = req.params.id
  const result = await BookingServices.calcelBookingFromDb(reqId)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  deleteBooking
};
