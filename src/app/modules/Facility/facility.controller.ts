import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { facilityServices } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await facilityServices.createFacilityIntoDb(data);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const result = await facilityServices.getAllFAcilityFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await facilityServices.updateFAcilityintoDB(id, data);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facilityServices.deleteFAcilityfromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
};
