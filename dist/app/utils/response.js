"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    res.status(responseData === null || responseData === void 0 ? void 0 : responseData.statusCode).json({
        success: responseData.success,
        statusCode: responseData === null || responseData === void 0 ? void 0 : responseData.statusCode,
        message: responseData.message,
        data: responseData.data,
    });
};
exports.default = sendResponse;
