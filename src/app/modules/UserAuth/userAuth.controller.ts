import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { userAuthServices } from "./userAuth.service";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userAuthServices.createUserIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});

const login: RequestHandler = catchAsync(async (req, res) => {
  const result = await userAuthServices.userLogin(req.body);
  const { accessToken, user } = result;

  const userWithPass: any = user;
  const { _id, name, email, phone, role, address } = userWithPass;

  res.json({
    success: true,
    statusCode: 200,
    message: "User is logged in succesfully",
    token: accessToken,
    data: {
      _id,
      name,
      email,
      phone,
      role,
      address,
    },
  });
});

export const userAuthController = {
  createUser,
  login,
};
