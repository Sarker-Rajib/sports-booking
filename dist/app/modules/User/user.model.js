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
exports.User = exports.Roles = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const myConfig_1 = __importDefault(require("../../myConfig"));
exports.Roles = ["admin", "user"];
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
    },
    email: {
        type: String,
        required: [true, "Email is mandatory."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "This is mandatory."],
        select: false,
    },
    phone: {
        type: String,
        required: [true, "Mobile number required."],
        unique: true,
    },
    role: {
        type: String,
        enum: {
            values: exports.Roles,
            message: "{VALUE} is not a defined role.",
        },
    },
    address: {
        type: String,
        required: [true, "Please provide your valid address."],
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(myConfig_1.default.SALT_ROUND));
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
