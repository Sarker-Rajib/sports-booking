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
exports.verifyAdmin = void 0;
const myConfig_1 = __importDefault(require("../myConfig"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandlers_1 = require("./ErrorHandlers");
const userAuth_model_1 = require("../modules/UserAuth/userAuth.model");
exports.verifyAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authData = req.headers.authorization;
    const token = authData === null || authData === void 0 ? void 0 : authData.split(" ")[1];
    if (token === undefined) {
        throw new Error("Invalid token");
    }
    const tokenDecodedData = jsonwebtoken_1.default.verify(token, myConfig_1.default.JWT_ACCESS_SECRET);
    const { email, role } = tokenDecodedData;
    const userFromDatabase = yield userAuth_model_1.User.findOne({ email });
    if (userFromDatabase === null) {
        throw new ErrorHandlers_1.AppError(400, "You are not a valid user");
    }
    if (role !== "admin") {
        throw new ErrorHandlers_1.AppError(400, "You are not authorized to access this route");
    }
    next();
}));
