import { Model } from "mongoose";

export type TRole = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
}

export interface UserModel extends Model<TUser> {
  //find user
  isUserExistsByEmail(email: string): Promise<TUser>;

  // match password
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
