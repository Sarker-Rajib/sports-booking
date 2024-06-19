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
exports.userAuthServices = void 0;
const myConfig_1 = __importDefault(require("../../myConfig"));
const userAuth_model_1 = require("./userAuth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userAuth_model_1.User.create(userData);
    const { _id, name, email, phone, role, address } = result;
    const data = { _id, name, email, role, phone, address };
    return data;
});
const userLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userAuth_model_1.User.isUserExistsByEmail(loginData.email);
    if (!user) {
        throw new Error("User not found");
    }
    if (user && user.password !== undefined) {
        if (!(yield userAuth_model_1.User.isPasswordMatched(loginData.password, user.password))) {
            throw new Error("Password does not match");
        }
    }
    else {
        throw new Error("Unauthorized login");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, myConfig_1.default.JWT_ACCESS_SECRET, { expiresIn: "1d" });
    return {
        accessToken,
        user,
    };
});
exports.userAuthServices = {
    createUserIntoDb,
    userLogin,
};
