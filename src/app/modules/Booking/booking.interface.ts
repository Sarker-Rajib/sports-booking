import { Schema } from "mongoose";

type TBooking = {
  date: Date;
  startTime: Date;
  endTime: Date;
  user: Schema.Types.ObjectId;
  facility: Schema.Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
};
