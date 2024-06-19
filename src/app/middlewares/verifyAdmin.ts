import myConfig from "../myConfig";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { AppError } from "./ErrorHandlers";
import { User } from "../modules/UserAuth/userAuth.model";

type jwtDataX = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export const verifyAdmin = catchAsync(async (req, res, next) => {
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

  if (role !== "admin") {
    throw new AppError(400, "You are not authorized to access this route");
  }

  next();
});
