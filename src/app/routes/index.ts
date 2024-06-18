import { Router } from "express";
import { UserRouter } from "../modules/UserAuth/userAuth.route";
import { FacilityRouter } from "../modules/Facility/facility.route";
import { BookingRouter } from "../modules/Booking/booking.route";

const router = Router();
const routes = [
  {
    path: "/auth",
    route: UserRouter,
  },
  {
    path: "/facility",
    route: FacilityRouter,
  },
  {
    path: "/bookings",
    route: BookingRouter,
  },
];

routes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route)
);

export default router;
