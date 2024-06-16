import { RequestHandler } from "express";
import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student are retrieved succesfully",
    data: result,
  });
});
export const UserController = {
  createUser,
};
