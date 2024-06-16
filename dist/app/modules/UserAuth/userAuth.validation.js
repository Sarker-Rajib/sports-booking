"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidatorZod = exports.userValidatorZod = void 0;
const zod_1 = require("zod");
const userAuth_model_1 = require("./userAuth.model");
exports.userValidatorZod = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email({ message: "Invalid email address." }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be string and 6 cahrecter." }),
    phone: zod_1.z.string(),
    role: zod_1.z.enum([...userAuth_model_1.Roles]),
    address: zod_1.z.string(),
});
exports.loginValidatorZod = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address." }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be string and 6 cahrecter." }),
});
