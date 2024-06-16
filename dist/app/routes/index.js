"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: user_route_1.UserRouter,
    },
];
routes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
