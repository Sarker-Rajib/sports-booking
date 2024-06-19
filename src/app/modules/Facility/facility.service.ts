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
  const result = await Facility.find({ isDeleted: false }).select("-__v");
  return result;
};

const updateFAcilityintoDB = async (
  facilityId: string,
  data: Partial<TFacility>
) => {
  const result = await Facility.findOneAndUpdate({ _id: facilityId }, data, {
    new: true,
  }).select("-__v");
  return result;
};

const deleteFAcilityfromDB = async (facilityId: string) => {
  const result = await Facility.findOneAndUpdate(
    { _id: facilityId },
    { isDeleted: true },
    {
      new: true,
    }
  ).select("-__v");
  return result;
};

export const facilityServices = {
  createFacilityIntoDb,
  getAllFAcilityFromDB,
  updateFAcilityintoDB,
  deleteFAcilityfromDB,
};
