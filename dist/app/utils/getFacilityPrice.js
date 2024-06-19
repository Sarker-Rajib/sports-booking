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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacilityPrice = void 0;
const ErrorHandlers_1 = require("../middlewares/ErrorHandlers");
const facility_model_1 = require("../modules/Facility/facility.model");
const getFacilityPrice = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOne({ _id });
    if (result === null) {
        throw new ErrorHandlers_1.AppError(400, "Facility not found");
    }
    return result === null || result === void 0 ? void 0 : result.pricePerHour;
});
exports.getFacilityPrice = getFacilityPrice;
