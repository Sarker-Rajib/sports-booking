import myConfig from "../../myConfig";
import { TLogin, TUser } from "./userAuth.interface";
import { User } from "./userAuth.model";
import jwt from "jsonwebtoken";

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);
  const { _id, name, email, phone, role, address } = result;
  const data = { _id, name, email, role, phone, address };
  return data;
};

const userLogin = async (loginData: TLogin) => {
  const user = await User.isUserExistsByEmail(loginData.email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user && user.password !== undefined) {
    if (!(await User.isPasswordMatched(loginData.password, user.password))) {
      throw new Error("Password does not match");
    }
  } else {
    throw new Error("Unauthorized login");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    myConfig.JWT_ACCESS_SECRET as string,
    { expiresIn: "1d" }
  );

  const userData: any = user;

  return {
    accessToken,
    userData: {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      address: userData.address,
    },
  };
};

export const userAuthServices = {
  createUserIntoDb,
  userLogin,
};
