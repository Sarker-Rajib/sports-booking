import myConfig from "../myConfig";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";

type jwtDataX = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export const verifyUser = catchAsync(async (req, res, next) => {
  const authData = req.headers.authorization;
  const token = authData?.split(" ")[1];

  if (token === undefined) {
    throw new Error("Invalid token");
  }

  const tokenDecodedData = jwt.verify(
    token,
    myConfig.JWT_ACCESS_SECRET as string
  );

  const { role } = tokenDecodedData as jwtDataX;

  if (!role) {
    res.status(400).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }

  next();
});
