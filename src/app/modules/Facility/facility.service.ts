import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDb = async (facilityData: TFacility) => {
  const result = await Facility.create(facilityData);
  const { _id, name, description, pricePerHour, location, isDeleted } = result;
  const userData = {
    _id,
    name,
    description,
    pricePerHour,
    location,
    isDeleted,
  };
  return userData;
};

const getAllFAcilityFromDB = async () => {
  const result = await Facility.find({}).select("-createdAt -updatedAt -__v");
  return result;
};

export const facilityServices = {
  createFacilityIntoDb,
  getAllFAcilityFromDB,
};
