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
exports.availabilityController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const response_1 = __importDefault(require("../../utils/response"));
const availability_service_1 = require("./availability.service");
const checkBookingAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date().toISOString().split("T")[0];
    const reqDate = req.query.date;
    if (reqDate !== undefined) {
        date = reqDate;
    }
    const totalSlots = [
        { startTime: "10:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "14:00" },
        { startTime: "14:00", endTime: "16:00" },
        { startTime: "16:00", endTime: "18:00" },
        { startTime: "18:00", endTime: "20:00" },
    ];
    const bookingsbyDate = yield availability_service_1.availabilityServices.findBookingFromDb(date);
    const availableSlots = totalSlots.filter((slot) => {
        const isBooked = bookingsbyDate.find((booking) => {
            return (booking.startTime < slot.endTime && booking.endTime > slot.startTime);
        });
        return !isBooked;
    });
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Availability checked successfully",
        data: availableSlots,
    });
}));
exports.availabilityController = {
    checkBookingAvailability,
};
