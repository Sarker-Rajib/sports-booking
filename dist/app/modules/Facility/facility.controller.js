"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityController = void 0;
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const response_1 = __importDefault(require("../../utils/response"));
const facility_service_1 = require("./facility.service");
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield facility_service_1.facilityServices.createFacilityIntoDb(data);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Facility added successfully",
        data: result,
    });
}));
const getAllFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.facilityServices.getAllFAcilityFromDB();
    if (result.length === 0 || result === null) {
        (0, response_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: result,
        });
    }
    else {
        (0, response_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Facilities retrieved successfully",
            data: result,
        });
    }
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield facility_service_1.facilityServices.updateFAcilityintoDB(id, data);
    if (result === null) {
        throw new ErrorHandlers_1.AppError(400, "Updating facility unsuccessful, please check provided Id");
    }
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Facility updated successfully",
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield facility_service_1.facilityServices.deleteFAcilityfromDB(id);
    if (result === null) {
        throw new ErrorHandlers_1.AppError(400, "Deleting facility unsuccessful, please check provided Id");
    }
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Facility deleted successfully",
        data: result,
    });
}));
exports.FacilityController = {
    createFacility,
    getAllFacility,
    updateFacility,
    deleteFacility,
};
