import { AppError } from "../middlewares/ErrorHandlers";
import { jwtDataX } from "../middlewares/verifyOnlyUser";
import { User } from "../modules/UserAuth/userAuth.model";
import myConfig from "../myConfig";
import jwt from 'jsonwebtoken'

export const findUserFromDb = async (authBearer:string) => {
    const token = authBearer?.split(" ")[1];
    const tokenDecodedData = jwt.verify(
      token as string,
      myConfig.JWT_ACCESS_SECRET as string
    );
    const { email } = tokenDecodedData as jwtDataX;
    const user = await User.findOne({  email });
  
    if (user === null) {
      throw new AppError(400, "User not found");
    }
  
    return user;
};