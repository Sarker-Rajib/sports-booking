import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";

const router = Router();
const routes = [
  {
    path: "/auth",
    route: UserRouter,
  },
];

routes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route)
);

export default router;
