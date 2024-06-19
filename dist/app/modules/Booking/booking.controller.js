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
exports.BookingController = void 0;
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getFacilityPrice_1 = require("../../utils/getFacilityPrice");
const getUser_1 = require("../../utils/getUser");
const response_1 = __importDefault(require("../../utils/response"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ---------------------------
    const authData = req.headers.authorization;
    const reqUser = yield (0, getUser_1.findUserFromDb)(authData);
    const data = req.body;
    const userId = reqUser._id;
    const pricePerHour = yield (0, getFacilityPrice_1.getFacilityPrice)(data === null || data === void 0 ? void 0 : data.facility);
    const startDateTime = new Date(`${data.date}T${data.startTime}:00`);
    const endDateTime = new Date(`${data.date}T${data.endTime}:00`);
    const differenceInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    const payableAmount = pricePerHour * differenceInHours;
    const bookingData = Object.assign(Object.assign({}, data), { user: userId, payableAmount });
    // --
    const result = yield booking_service_1.BookingServices.createBookingIntoDb(bookingData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.findBookingsFromDb();
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
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
}));
const getBookingsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authData = req.headers.authorization;
    const reqUser = yield (0, getUser_1.findUserFromDb)(authData);
    const result = yield booking_service_1.BookingServices.findBookingsByUserFromDb(reqUser._id);
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
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req.params.id;
    const result = yield booking_service_1.BookingServices.calcelBookingFromDb(reqId);
    if (result === null) {
        throw new ErrorHandlers_1.AppError(400, "Cancelling Booking unsuccessful, please check provided Id");
    }
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking,
};
