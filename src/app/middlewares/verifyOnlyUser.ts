import { User } from "../modules/UserAuth/userAuth.model";
import myConfig from "../myConfig";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { AppError } from "./ErrorHandlers";

export type jwtDataX = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export const verifyOnlyUser = catchAsync(async (req, res, next) => {
  const authData = req.headers.authorization;
  const token = authData?.split(" ")[1];

  if (token === undefined) {
    throw new Error("Invalid token");
  }

  const tokenDecodedData = jwt.verify(
    token,
    myConfig.JWT_ACCESS_SECRET as string
  );

  const { email, role } = tokenDecodedData as jwtDataX;

  const userFromDatabase = await User.findOne({ email });
  if (userFromDatabase === null) {
    throw new AppError(400, "You are not a valid user");
  }

  if (role !== "user") {
    res.status(400).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }

  next();
});
