import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);
  const { _id, name, email, phone, role, address } = result;
  const data = { _id, name, email, role, phone, address };
  return data;
};

export const userServices = {
  createUserIntoDb,
};
