import { AppError } from "../../middlewares/ErrorHandlers";
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

  if (result.length === 0 || result === null) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Facilities retrieved successfully",
      data: result,
    });
  }
});

const updateFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await facilityServices.updateFAcilityintoDB(id, data);

  if (result === null) {
    throw new AppError(
      400,
      "Updating facility unsuccessful, please check provided Id"
    );
  }

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

  if (result === null) {
    throw new AppError(
      400,
      "Deleting facility unsuccessful, please check provided Id"
    );
  }

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
