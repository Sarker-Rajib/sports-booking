"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRouter = void 0;
const express_1 = require("express");
const facility_controller_1 = require("./facility.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(facility_validation_1.FacilityValidator), facility_controller_1.FacilityController.createFacility);
router.get("/", facility_controller_1.FacilityController.getAllFacility);
exports.FacilityRouter = router;