import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { authServices } from "./auth.service";

const login: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.userLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User is logged in succesfully!",
    data: result,
  });
});

export const authController = {
  login,
};
