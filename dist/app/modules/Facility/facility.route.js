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
const verifyAdmin_1 = require("../../middlewares/verifyAdmin");
const verifyUsers_1 = require("../../middlewares/verifyUsers");
const router = (0, express_1.Router)();
router.post("/", verifyAdmin_1.verifyAdmin, (0, validateRequest_1.default)(facility_validation_1.FacilityValidator), facility_controller_1.FacilityController.createFacility);
router.get("/", verifyUsers_1.verifyUser, facility_controller_1.FacilityController.getAllFacility);
router.put("/:id", verifyAdmin_1.verifyAdmin, (0, validateRequest_1.default)(facility_validation_1.FacilityValidator), facility_controller_1.FacilityController.updateFacility);
router.delete("/:id", verifyAdmin_1.verifyAdmin, facility_controller_1.FacilityController.deleteFacility);
exports.FacilityRouter = router;
