"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorZod = void 0;
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
exports.userValidatorZod = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    role: zod_1.z.enum([...user_model_1.Roles]),
    address: zod_1.z.string(),
});
