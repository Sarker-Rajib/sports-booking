import jwt from "jsonwebtoken";
import myConfig from "../../myConfig";
import { TLogin } from "./auth.interface";
import { User } from "../User/user.model";

const userLogin = async (loginData: TLogin) => {
  const user = await User.isUserExistsByEmail(loginData.email);

  if (!user) {
    throw new Error("User not found");
  }

  if (!(await User.isPasswordMatched(loginData?.password, user?.password))) {
    throw new Error("Password do not matched");
  }

  const jwtPayload = {
    email: loginData.email,
    role: "role",
  };

  const accessToken = jwt.sign(
    jwtPayload,
    myConfig.JWT_ACCESS_SECRET as string,
    { expiresIn: "1d" }
  );

  return {
    accessToken,
  };
};

export const authServices = {
  userLogin,
};
