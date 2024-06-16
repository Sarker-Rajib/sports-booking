"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const userAuth_validation_1 = require("./userAuth.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userAuth_controller_1 = require("./userAuth.controller");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.default)(userAuth_validation_1.userValidatorZod), userAuth_controller_1.userAuthController.createUser);
router.post("/login", (0, validateRequest_1.default)(userAuth_validation_1.loginValidatorZod), userAuth_controller_1.userAuthController.login);
exports.UserRouter = router;
