"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidator = void 0;
const zod_1 = require("zod");
exports.FacilityValidator = zod_1.z.object({
    name: zod_1.z.string().min(5, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    pricePerHour: zod_1.z.number().min(0, "Price per hour must be a positive number"),
    location: zod_1.z.string().min(1, "Location is required"),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
