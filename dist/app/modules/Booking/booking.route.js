"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const verifyOnlyUser_1 = require("../../middlewares/verifyOnlyUser");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const verifyAdmin_1 = require("../../middlewares/verifyAdmin");
const router = (0, express_1.Router)();
router.post("/", verifyOnlyUser_1.verifyOnlyUser, (0, validateRequest_1.default)(booking_validation_1.bookingValidator), booking_controller_1.BookingController.createBooking);
router.get("/", verifyAdmin_1.verifyAdmin, booking_controller_1.BookingController.getAllBookings);
router.get("/user", verifyOnlyUser_1.verifyOnlyUser, booking_controller_1.BookingController.getBookingsByUser);
router.delete("/:id", verifyOnlyUser_1.verifyOnlyUser, booking_controller_1.BookingController.cancelBooking);
exports.BookingRouter = router;
