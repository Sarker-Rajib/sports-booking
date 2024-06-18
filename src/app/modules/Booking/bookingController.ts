import { jwtDataX } from "../../middlewares/verifyOnlyUser";
import myConfig from "../../myConfig";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { BookingServices } from "./booking.service";
import jwt from "jsonwebtoken";

const createBooking = catchAsync(async (req, res) => {
  // ---------------------------
  const authData = req.headers.authorization;
  const token = authData?.split(" ")[1];
  const tokenDecodedData = jwt.verify(
    token as string,
    myConfig.JWT_ACCESS_SECRET as string
  );
  const { email } = tokenDecodedData as jwtDataX;
  const userId = await BookingServices.findUserFromDb(email);
  // ---------------------------

  const data = req.body;
  const bookingData = { ...data, user: userId, payableAmount: 40 };

  const result = await BookingServices.createBookingIntoDb(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
