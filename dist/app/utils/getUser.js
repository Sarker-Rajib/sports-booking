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
exports.findUserFromDb = void 0;
const ErrorHandlers_1 = require("../middlewares/ErrorHandlers");
const userAuth_model_1 = require("../modules/UserAuth/userAuth.model");
const myConfig_1 = __importDefault(require("../myConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findUserFromDb = (authBearer) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authBearer === null || authBearer === void 0 ? void 0 : authBearer.split(" ")[1];
    const tokenDecodedData = jsonwebtoken_1.default.verify(token, myConfig_1.default.JWT_ACCESS_SECRET);
    const { email } = tokenDecodedData;
    const user = yield userAuth_model_1.User.findOne({ email });
    if (user === null) {
        throw new ErrorHandlers_1.AppError(400, "User not found");
    }
    return user;
});
exports.findUserFromDb = findUserFromDb;
