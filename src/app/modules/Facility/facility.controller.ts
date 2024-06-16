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

export const FacilityController = {
  createFacility,
};