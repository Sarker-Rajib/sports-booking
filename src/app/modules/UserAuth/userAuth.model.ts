import { Schema, model } from "mongoose";
import { TRole, TUser, UserModel } from "./userAuth.interface";
import bcrypt from "bcrypt";
import myConfig from "../../myConfig";

export const Roles: TRole[] = ["admin", "user"];

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "This is mandatory."],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Mobile number required."],
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: Roles,
        message: "{VALUE} is not a defined role.",
      },
    },
    address: {
      type: String,
      required: [true, "Please provide your valid address."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(myConfig.SALT_ROUND));

  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
