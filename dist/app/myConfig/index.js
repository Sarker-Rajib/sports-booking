"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    port: process.env.PORT,
    DBURL: process.env.DBURL,
    NODE_ENV: process.env.NODE_ENV,
    SALT_ROUND: process.env.BC_SALT,
    JWT_ACCESS_SECRET: process.env.JWT_ACC_SECRET,
    JWT_ACCESS_DURATION: process.env.JWT_ACC_DURATION,
};
