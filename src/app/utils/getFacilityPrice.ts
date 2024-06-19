import { AppError } from "../middlewares/ErrorHandlers";
import { Facility } from "../modules/Facility/facility.model";

export const getFacilityPrice = async (_id: string) => {
  const result = await Facility.findOne({ _id });
  if (result === null) {
    throw new AppError(400, "Facility not found");
  }
  return result?.pricePerHour;
};
