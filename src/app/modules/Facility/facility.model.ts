import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const FacilitySchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Facility = model<TFacility>("Facility", FacilitySchema);
