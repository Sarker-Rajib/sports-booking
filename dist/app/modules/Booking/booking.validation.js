"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidator = void 0;
const zod_1 = require("zod");
exports.bookingValidator = zod_1.z.object({
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    facility: zod_1.z.string(),
});
