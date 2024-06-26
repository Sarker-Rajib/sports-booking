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
exports.userAuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const response_1 = __importDefault(require("../../utils/response"));
const userAuth_service_1 = require("./userAuth.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userAuth_service_1.userAuthServices.createUserIntoDb(req.body);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userAuth_service_1.userAuthServices.userLogin(req.body);
    const { accessToken, user } = result;
    const userWithPass = user;
    const { _id, name, email, phone, role, address } = userWithPass;
    res.json({
        success: true,
        statusCode: 200,
        message: "User is logged in succesfully",
        token: accessToken,
        data: {
            _id,
            name,
            email,
            phone,
            role,
            address,
        },
    });
}));
exports.userAuthController = {
    createUser,
    login,
};
