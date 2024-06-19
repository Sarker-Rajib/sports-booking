"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_route_1 = require("../modules/UserAuth/userAuth.route");
const facility_route_1 = require("../modules/Facility/facility.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const avilability_route_1 = require("../modules/Availability/avilability.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: userAuth_route_1.UserRouter,
    },
    {
        path: "/facility",
        route: facility_route_1.FacilityRouter,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRouter,
    },
    {
        path: "/check-availability",
        route: avilability_route_1.AvailabilityRouter,
    },
];
routes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
